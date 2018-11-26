import { Request, Response } from 'express';
import { GetCommentsForRepoResponseItem } from '@octokit/rest';
import { createDir, moveFiles, deleteDir } from '../deploy';
import { getComments, postCommentToPR, editComment } from '../bot';
import { generateOutput } from '../output';
import { Redis } from '../Redis';

export interface Item {
  dir: string;
  url: string;
  prNum: number | null;
  projectName: string;
  dateNum: number;
  totalSize: number;
}

const redis = new Redis();

redis.subscribeExpired(async (keyEvent, key) => {
  try {
    await deleteDir(key);
  } catch (e) {
    throw e;
  }
});

// TODO: use websocket
export async function getTimeSequence(req: Request, res: Response) {
  const keys = await redis.getKeys('*');
  const demos = [];

  for (const item of keys) {
    const demo = await redis.get(item);
    const [, owner, repo, hash] = item.split('/');

    demos.push({
      ...demo,
      owner,
      key: hash,
      repo,
      url: `${process.env.URL}/demos/${owner}/${repo}/${hash}`
    });
  }

  const schema = demos.sort((a, b) => b.dateNum - a.dateNum);

  return res.json(schema);
}

export async function getOwners(req: Request, res: Response) {
  const keys = await redis.getKeys('*');
  const schema = {};

  for (const item of keys) {
    const demo = await redis.get(item);
    const [, owner, ,] = item.split('/');

    if (!schema[owner]) {
      schema[owner] = {
        url: `${process.env.GITHUB_URL}/${owner}`,
        updatedAt: -1,
        demosNum: 0,
        totalSize: 0
      };
    }

    schema[owner]['demosNum']++;
    schema[owner]['totalSize'] += demo.totalSize;

    if (schema[owner]['updatedAt'] < demo.dateNum) schema[owner]['updatedAt'] = demo.dateNum;
  }

  return res.json(schema);
}

// repo url
export async function getRepos(req: Request, res: Response) {
  const { owner: name } = req.params;
  const keys = await redis.getKeys(`${process.env.OUTPUT_DIR}/${name}/*`);
  const schema = {
    owner: {
      url: `${process.env.GITHUB_URL}/${name}`,
      name,
      demosNum: keys.length,
      totalSize: 0,
      updatedAt: -1
    },
    repos: {}
  };

  for (const item of keys) {
    const demo = await redis.get(item);
    const [, owner, repo, hash] = item.split('/');

    if (!schema['repos'][repo]) schema['repos'][repo] = [];

    const prUrl = demo.prNum
      ? `${process.env.GITHUB_URL}/${owner}/${repo}/pull/${demo.prNum}`
      : null;

    schema['repos'][repo].push({
      ...demo,
      key: hash,
      prUrl
    });

    schema['owner']['totalSize'] += demo.totalSize;
    if (schema['owner']['updatedAt'] < demo.dateNum) schema['owner']['updatedAt'] = demo.dateNum;
  }

  Object.entries(schema['repos']).forEach(([key, value]) => {
    schema['repos'][key] = (value as Array<Item>).sort((a, b) => b.dateNum - a.dateNum);
  });

  return res.json(schema);
}

export async function getDemos(req: Request, res: Response) {}

export async function getAll(req: Request, res: Response) {
  const keys = await redis.getKeys('*');
  const schema = {};

  for (const item of keys) {
    const r = await redis.get(item);
    const [, owner, repo, hash] = item.split('/');

    if (!schema[owner]) schema[owner] = {};
    if (!schema[owner][repo]) schema[owner][repo] = [];

    schema[owner][repo].push({
      key: hash,
      ...r
    });
  }

  return res.json(schema);
}

interface PostDemos extends Request {
  body: {
    file_path: Array<{
      name: string;
    }>;
    name: string;
    pr_num: string;
  };
}

export async function post(req: PostDemos, res: Response) {
  try {
    const { owner, repo } = req.params;
    const dir = await createDir(req.params);

    let projectName,
      prNum,
      files,
      totalSize = 0;

    if (typeof req.body['file_path'] === 'string') {
      projectName = req.body['name'] || 'main';
      prNum = req.body['pr_num'] ? Number(req.body['pr_num']) : null;
      files = [
        {
          name: req.body['file_path'],
          buffer: req.files[0].buffer
        }
      ];

      totalSize = req.files[0].buffer.byteLength;
    } else {
      projectName =
        req.body['name'] && Array.isArray(req.body['name']) ? req.body['name'][0] : 'main';
      prNum =
        req.body['pr_num'] && Array.isArray(req.body['pr_num'])
          ? Number(req.body['pr_num'][0])
          : null;
      files = req.body['file_path'].map((name, i) => {
        const info = req.files[i];

        totalSize += info.buffer.byteLength;

        return {
          name: name,
          buffer: info.buffer
        };
      });
    }

    await moveFiles(files, dir);

    const url = `${process.env.URL}/${dir}`.replace(process.env.OUTPUT_DIR || '', 'demos');
    const item = {
      dir,
      url,
      prNum,
      projectName,
      dateNum: Date.now(),
      totalSize
    };

    await redis.set(item);

    if (prNum) {
      const comments = await getComments({ owner, repo, number: prNum });

      // if bot exists, overwrite the comment
      // const existedComment = comments.data.find((comment: GetCommentsForRepoResponseItem) => {
      const existedComment = comments.data.find((comment: any) => {
        if (comment.user.login === process.env.GITHUB_USER_NAME) return true;
        return false;
      });

      const body = generateOutput(item, existedComment ? existedComment.body : null);

      if (existedComment) {
        await editComment({ owner, repo, body, id: String(existedComment.id) });
      } else {
        await postCommentToPR({ owner, repo, number: prNum, body });
      }
    }

    return res.json({ url });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

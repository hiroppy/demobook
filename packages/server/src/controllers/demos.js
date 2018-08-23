'use strict';

const { createDir, moveFiles, deleteDir } = require('../deploy');
const { getComments, postCommentToPR, editComment } = require('../bot');
const generateOutput = require('../output');
const Redis = require('../Redis');

const redis = new Redis();

redis.subscribeExpired(async (keyEvent, key) => {
  console.log('deleted:', key);
  await deleteDir(key);
});

async function post(req, res) {
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

    const url = `${process.env.URL}/${dir}`.replace('dist', 'demos');

    const item = {
      projectName,
      dir,
      url,
      date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }),
      totalSize
    };

    await redis.set(item);

    if (prNum) {
      const comments = await getComments({ owner, repo, number: prNum });

      const existedComment = comments.data.find((comment) => {
        if (comment.user.login === process.env.GITHUB_USER_NAME) return true;
      });

      const body = generateOutput(item, existedComment ? existedComment.body : null);

      if (existedComment) {
        await editComment({ owner, repo, number: prNum, body, id: existedComment.id });
      } else {
        await postCommentToPR({ owner, repo, number: prNum, body });
      }
    }

    return res.json({ url });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
}

module.exports = {
  post
};

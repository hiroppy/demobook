'use strict';

const { createDir, moveFiles } = require('../deploy');
const { getComments, postCommentToPR, editComment } = require('../bot');

async function post(req, res) {
  try {
    const { owner, repo } = req.params;
    const dir = await createDir(req.params);

    let prNum, files;

    if (typeof req.body['file_path'] === 'string') {
      prNum = req.body['pr_num'] ? req.body['pr_num'] : null;
      files = [
        {
          name: req.body['file_path'],
          buffer: req.files[0].buffer
        }
      ];
    } else {
      prNum =
        req.body['pr_num'] && Array.isArray(req.body['pr_num'])
          ? Number(req.body['pr_num'][0])
          : null;
      files = req.body['file_path'].map((name, i) => {
        const info = req.files[i];

        return {
          name: name,
          buffer: info.buffer
        };
      });
    }

    await moveFiles(files, dir);

    const url = `${process.env.URL}/${dir}`.replace('dist', 'demos');

    if (prNum) {
      const comments = await getComments({ owner, repo, number: prNum });

      const existedComment = comments.data.find((comment) => {
        if (comment.user.login === process.env.GITHUB_USER_NAME) return true;
      });

      if (existedComment) {
        const body = `
Deployed to ${url}

## Logs
${existedComment.body}
      `;

        await editComment({ owner, repo, number: prNum, body, id: existedComment.id });
      } else {
        const body = `Deployed to ${url}`;

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

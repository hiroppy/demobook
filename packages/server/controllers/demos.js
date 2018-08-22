'use strict';

const { createDir, moveFiles } = require('../deploy');
const { postCommentToPR } = require('../bot');

async function post(req, res) {
  try {
    const { owner, repo } = req.params;
    const dir = await createDir(req.params);

    if (!Array.isArray(req.body['file_path'])) throw e;

    const prNum =
      req.body['pr_num'] && Array.isArray(req.body['pr_num'])
        ? Number(req.body['pr_num'][0])
        : null;
    const files = req.body['file_path'].map((name, i) => {
      const info = req.files[i];

      return {
        name: name,
        buffer: info.buffer
      };
    });

    await moveFiles(files, dir);

    const url = `${process.env.URL}/${dir}`.replace('dist', 'demos');

    if (prNum) {
      const body = `Deployed to ${url}`;

      await postCommentToPR({ owner, repo, number: prNum, body });
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

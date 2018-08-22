'use strict';

const { createDir, moveFiles } = require('../deploy');
const { postCommentToPR } = require('../bot');

async function post(req, res) {
  const { owner, repo } = req.params;
  const dir = await createDir(req.params);

  const files = req.body['file_path'].map((name, i) => {
    const info = req.files[i];

    return {
      name: name,
      buffer: info.buffer
    };
  });

  await moveFiles(files, dir);

  return res.json({
    url: `${process.env.URL}/${dir}`.replace('dist', 'demos')
  });
}

module.exports = {
  post
};

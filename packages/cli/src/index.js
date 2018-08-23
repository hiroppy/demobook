'use strict';

const { statSync, createReadStream } = require('fs');
const { join, relative } = require('path');
const ora = require('ora');
const glob = require('glob');
const FormData = require('form-data');
const fetch = require('node-fetch');

// for self signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function globAsync(p) {
  return new Promise((resolve, reject) => {
    glob(p, {}, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
}

async function postDirectory({ target, directory = 'dist', owner, repo, pr, name }) {
  if (target === undefined || owner === undefined || repo === undefined) throw new Error();

  const url = `${target}/api`;

  try {
    const spinner = ora(`🚗: Publishing to ${target}`).start();
    const dir = join(process.cwd(), directory, '**', '*');
    const items = await globAsync(dir);

    const form = new FormData();

    for (const item of items) {
      if (statSync(item).isDirectory()) continue;

      if (pr) form.append('pr_num', pr);
      if (name) form.append('name', name);
      form.append('file_path', relative(join(process.cwd(), directory), item));
      form.append('file', createReadStream(item));
    }

    const res = await fetch(`${url}/demos/${owner}/${repo}`, {
      method: 'POST',
      headers: form.getHeaders(),
      body: form
    }).then((res) => res.json());

    spinner.stop();
    console.log(`Deployed URL: ${res.url}`);
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  postDirectory
};

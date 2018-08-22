'use strict';

const { writeFile } = require('fs');
const { promisify } = require('util');
const { join, dirname } = require('path');
const { randomBytes } = require('crypto');
const mkdirp = require('mkdirp');

const writeFileAsync = promisify(writeFile);
const randomBytesAsync = promisify(randomBytes);

async function createDir({ owner, repo }) {
  try {
    const id = (await randomBytesAsync(16)).toString('hex');
    const dir = join(process.env.OUTPUT_DIR, owner, repo, id);

    mkdirp.sync(dir);

    return dir;
  } catch (e) {
    throw e;
  }
}

async function moveFiles(files, to) {
  try {
    for (const { name, buffer } of files) {
      const p = `${to}/${name}`;
      const dir = dirname(p);

      mkdirp(dir);

      await writeFileAsync(p, buffer);
    }
  } catch (e) {
    throw e;
  }
}

module.exports = {
  createDir,
  moveFiles
};

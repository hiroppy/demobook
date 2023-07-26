import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { randomBytes } from 'crypto';
import { rimraf } from 'rimraf';
import * as mkdirp from 'mkdirp';
import { Option } from './bot';

export async function createDir({ owner, repo }: Option) {
  try {
    const id = randomBytes(16).toString('hex');
    const dir = join(process.env.OUTPUT_DIR || '', owner, repo, id);

    mkdirp.sync(dir);

    return dir;
  } catch (e) {
    throw e;
  }
}

export async function deleteDir(p: string) {
  try {
    await rimraf(join(process.cwd(), p));
  } catch (e) {
    throw e;
  }
}

export async function moveFiles(files: any, to: string) {
  try {
    for (const { name, buffer } of files) {
      const p = `${to}/${name}`;
      const dir = dirname(p);

      mkdirp.sync(dir);

      await writeFile(p, buffer);
    }
  } catch (e) {
    throw e;
  }
}

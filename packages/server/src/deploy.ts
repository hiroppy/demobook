import { writeFile } from 'fs';
import { promisify } from 'util';
import { join, dirname } from 'path';
import { randomBytes } from 'crypto';
import * as rimraf from 'rimraf';
import * as mkdirp from 'mkdirp';
import { Option } from './bot';

const rimrafAsync = promisify(rimraf);
const writeFileAsync = promisify(writeFile);
const randomBytesAsync = promisify(randomBytes);

export async function createDir({ owner, repo }: Option) {
  try {
    const id = (await randomBytesAsync(16)).toString('hex');
    const dir = join(process.env.OUTPUT_DIR || '', owner, repo, id);

    mkdirp.sync(dir);

    return dir;
  } catch (e) {
    throw e;
  }
}

export async function deleteDir(p: string) {
  try {
    await rimrafAsync(join(process.cwd(), p));
  } catch (e) {
    throw e;
  }
}

export async function moveFiles(files: any, to: string) {
  try {
    for (const { name, buffer } of files) {
      const p = `${to}/${name}`;
      const dir = dirname(p);

      mkdirp(dir, () => {});

      await writeFileAsync(p, buffer);
    }
  } catch (e) {
    throw e;
  }
}

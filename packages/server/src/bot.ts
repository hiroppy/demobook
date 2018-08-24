import * as octokit from '@octokit/rest';

export type Option = {
  owner: string;
  repo: string;
  number: number;
  body: string;
  id: string;
};

let bot: null | octokit = null;

export function setup() {
  bot = new octokit({
    baseUrl: process.env.GITHUB_BASE_URL
  });

  if (process.env.GITHUB_USER_NAME && process.env.GITHUB_PASSWORD) {
    // TODO: make use of 2FA
    bot.authenticate({
      type: 'basic',
      username: process.env.GITHUB_USER_NAME,
      password: process.env.GITHUB_PASSWORD
    });
  }
}

export async function postCommentToPR({
  owner,
  repo,
  number,
  body
}: Pick<Option, 'owner' | 'repo' | 'number' | 'body'>) {
  if (!bot) throw new Error();

  return await bot.issues.createComment({
    owner,
    repo,
    number,
    body
  });
}

export async function getComments({
  owner,
  repo,
  number
}: Pick<Option, 'owner' | 'repo' | 'number'>) {
  if (!bot) throw new Error();

  return await bot.issues.getComments({
    owner,
    repo,
    number
  });
}

export async function editComment({
  owner,
  repo,
  body,
  id
}: Pick<Option, 'owner' | 'repo' | 'body' | 'id'>) {
  if (!bot) throw new Error();

  return await bot.issues.editComment({
    owner,
    repo,
    comment_id: id, // check
    body
  });
}

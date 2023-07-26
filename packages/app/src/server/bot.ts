import { Octokit } from '@octokit/rest';
import { createBasicAuth } from '@octokit/auth-basic';

export type Option = {
  owner: string;
  repo: string;
  number: number;
  body: string;
  id: string;
};

let bot: null | Octokit = null;

export function setup() {
  const option: ConstructorParameters<typeof Octokit>[0] = {
    baseUrl: process.env.GITHUB_API_URL,
  };
  if (process.env.GITHUB_USER_NAME && process.env.GITHUB_PASSWORD) {
    option.authStrategy = createBasicAuth;
    option.auth = {
      username: process.env.GITHUB_USER_NAME,
      password: process.env.GITHUB_PASSWORD,
      token: {
        scopes: ['public_repo'],
      },
      on2Fa: () => {
        // TODO: make use of 2FA
        throw new Error('2FA not supported');
      },
    };
  }

  bot = new Octokit(option);
}

export async function postCommentToPR({
  owner,
  repo,
  number,
  body,
}: Pick<Option, 'owner' | 'repo' | 'number' | 'body'>) {
  if (!bot) throw new Error();

  return await bot.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body,
  });
}

export async function getComments({
  owner,
  repo,
  number,
}: Pick<Option, 'owner' | 'repo' | 'number'>) {
  if (!bot) throw new Error();

  return await bot.issues.listComments({
    owner,
    repo,
    issue_number: number,
  });
}

export async function editComment({
  owner,
  repo,
  body,
  id,
}: Pick<Option, 'owner' | 'repo' | 'body' | 'id'>) {
  if (!bot) throw new Error();

  return await bot.issues.updateComment({
    owner,
    repo,
    comment_id: Number(id), // check
    body,
  });
}

'use strict';

const octokit = require('@octokit/rest');

const bot = octokit({
  pathPrefix: '/api/v3',
  protocol: process.env.GITHUB_PROTOCOL,
  host: process.env.GITHUB_HOST,
  version: '3.0.0'
});

if (process.env.GITHUB_USER_NAME && process.env.GITHUB_PASSWORD) {
  // TODO: make use of 2FA
  bot.authenticate({
    type: 'basic',
    username: process.env.GITHUB_USER_NAME,
    password: process.env.GITHUB_PASSWORD
  });
}

async function postCommentToPR({ owner, repo, number, body }) {
  return await bot.issues.createComment({
    owner,
    repo,
    number,
    body
  });
}

module.exports = {
  postCommentToPR
};

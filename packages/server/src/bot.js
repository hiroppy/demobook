'use strict';

const octokit = require('@octokit/rest');

let bot = null;

function setup() {
  bot = octokit({
    baseUrl: process.env.GITHUB_BASE_URL,
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
}

async function postCommentToPR({ owner, repo, number, body }) {
  return await bot.issues.createComment({
    owner,
    repo,
    number,
    body
  });
}

async function getComments({ owner, repo, number }) {
  return await bot.issues.getComments({
    owner,
    repo,
    number
  });
}

async function editComment({ owner, repo, number, body, id }) {
  return await bot.issues.editComment({
    owner,
    repo,
    number,
    body,
    id
  });
}

module.exports = {
  setup,
  getComments,
  editComment,
  postCommentToPR
};

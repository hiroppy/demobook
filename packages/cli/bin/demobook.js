#!/usr/bin/env node

'use strict';

const meow = require('meow');
const { version } = require('../package.json');
const { postDirectory } = require('../src');

const cli = meow(
  `
  Version
    ${version}

	 Usage
	   $ demobook -t http://localhost:3000 -d build

  Options
     --repo,      -r  the repository name
     --owner,     -o  the owner name(or the organization name)
     --target,    -t  Specify the destination URL
     --directory, -d  published directory(default: dist)
     --pr             Specify an issue number if you post a URL
                      as a comment on github's PR
`,
  {
    flags: {
      repo: {
        type: 'string',
        alias: 'r'
      },
      owner: {
        type: 'string',
        alias: 'o'
      },
      target: {
        type: 'string',
        alias: 't'
      },
      directory: {
        type: 'string',
        alias: 'd',
        default: 'dist'
      },
      pr: {
        type: 'number'
      }
    }
  }
);

if (cli.input.length === 0 && (!cli.flags.t || !cli.flags.r || !cli.flags.o)) {
  console.error('see: demobook --help');
  process.exit(1);
}

postDirectory(cli.flags);

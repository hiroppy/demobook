# DemoBook

DemoBook will automatically deploy static files to your hosted server and generate appropriate URLs.  
For example, it is possible to support a review of PR by making CI execute CLI.  
Also, the bot can also post the URL as a comment from a server.

## Packages

- cli
- server

## Sample

Currently, this repository is running demobook-cli when running CI of Travis.
see: https://travis-ci.org/hiroppy/demobook

```yml
# travis.yml
sudo: false
language: node_js
cache:
  directories:
    - node_modules
node_js:
  - 10
os:
  - linux
before_script:
  - npm i
  - npx @demobook/cli -o hiroppy -r demobook -t https://demobook-ci.herokuapp.com -d output
```

After that, it is uploading a static file to Heroku.

As you can see, CLI is output an URL of Heroku. This URL is random.

If you want Bot to comment on PR of GitHub which it is deployed, it is possible to enter username and password on the demobook/server.

see: [.env](/packages/server/.env.sample)

'use strict';

const { readFileSync } = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
const router = require('./router');
const { setup: setupBot } = require('./bot');

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);
setupBot();

const server =
  process.env.SSL_KEY && process.env.SSL_CERT
    ? require('https').createServer(
        {
          key: readFileSync(process.env.SSL_KEY),
          cert: readFileSync(process.env.SSL_CERT)
        },
        app
      )
    : require('http').createServer(app);

server.listen(port);

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`Listening on ${bind}`);
});

server.on('error', (err) => {
  if (err.syscall !== 'listen') throw err;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (err.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw err;
  }
});

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
});

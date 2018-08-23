'use strict';

const { parse } = require('url');
const { promisify } = require('util');
const { createClient } = require('redis');

const { hostname, port } = process.env.REDIS_URL
  ? parse(process.env.REDIS_URL)
  : {
      hostname: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    };

const option = {
  host: hostname,
  port,
  db: 0
};
const expiredSubKey = `__keyevent@${option.db}__:expired`;

class Redis {
  constructor() {
    this.subscriber = createClient(option);
    this.publisher = createClient(option);

    this.publisher.on('ready', () => {
      this.publisher.config('SET', 'notify-keyspace-events', 'Ex');
    });

    this.getAsync = promisify(this.publisher.get).bind(this.publisher);

    // delete all data
    // this.publisher.flushall('ASYNC', () => {});
  }

  subscribeExpired(cb) {
    this.subscriber.subscribe(expiredSubKey);
    this.subscriber.on('message', cb);
  }

  async get(key) {
    return JSON.parse(await this.getAsync(key));
  }

  async set(item) {
    const { dir, ...rest } = item;

    this.publisher.set(dir, JSON.stringify(rest), 'Ex', process.env.REDIS_EXPIRED_TIME);
  }
}

module.exports = Redis;

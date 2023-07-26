import { parse } from 'url';
import { createClient, RedisClientType } from '@redis/client';
import { Item } from './controllers/demos';

const { hostname, port } = process.env.REDIS_URL
  ? parse(process.env.REDIS_URL)
  : {
      hostname: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    };

const option = {
  host: hostname,
  port: Number(port),
  db: 0,
};
const url = `redis://${option.host}:${option.port}/${option.db}`;
const expiredSubKey = `__keyevent@${option.db}__:expired`;

export class Redis {
  subscriber: RedisClientType;
  publisher: RedisClientType;

  constructor() {
    this.subscriber = createClient({ url });
    this.publisher = createClient({ url });

    this.subscriber.once('ready', () => {
      this.subscriber.configSet('notify-keyspace-events', 'Ex');
    });

    // delete all data
    // this.publisher.flushall(() => {});

    this.subscriber.connect();
    this.publisher.connect();
  }

  subscribeExpired(cb: (keyEvent: string, key: string) => {}) {
    this.subscriber.once('ready', () => {
      this.subscriber.subscribe(expiredSubKey, (keyEvent, key) => {
        cb(keyEvent, key);
      });
    });
  }

  async get(key: string) {
    return JSON.parse((await this.publisher.get(key)) ?? '');
  }

  async getKeys(key: string) {
    return await this.publisher.keys(key);
  }

  async set(item: Item) {
    const { dir, ...rest } = item;

    this.publisher.set(dir, JSON.stringify(rest), { EX: Number(process.env.REDIS_EXPIRED_TIME) });
  }
}

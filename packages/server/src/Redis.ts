import { parse } from 'url';
import { promisify } from 'util';
import { createClient, RedisClient } from 'redis';
import { Item } from './controllers/demos';

const { hostname, port } = process.env.REDIS_URL
  ? parse(process.env.REDIS_URL)
  : {
      hostname: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    };

const option = {
  host: hostname,
  port: Number(port),
  db: 0
};
const expiredSubKey = `__keyevent@${option.db}__:expired`;

export class Redis {
  subscriber: RedisClient;
  publisher: RedisClient;
  getAsync: (key: string) => Promise<any>; // TODO: fix
  getKeysAsync: (condition: string) => Promise<any>;

  constructor() {
    this.subscriber = createClient(option);
    this.publisher = createClient(option);

    this.publisher.on('ready', () => {
      this.publisher.config('SET', 'notify-keyspace-events', 'Ex');
    });

    this.getAsync = promisify(this.publisher.get).bind(this.publisher);
    this.getKeysAsync = promisify(this.publisher.keys).bind(this.publisher);

    // delete all data
    // this.publisher.flushall('ASYNC', () => {});
  }

  subscribeExpired(cb: (keyEvent: string, key: string) => {}) {
    this.subscriber.subscribe(expiredSubKey);
    this.subscriber.on('message', cb);
  }

  async get(key: string) {
    return JSON.parse(await this.getAsync(key));
  }

  async getKeys(key: string) {
    return await this.getKeysAsync(key);
  }

  async set(item: Item) {
    const { dir, ...rest } = item;

    this.publisher.set(dir, JSON.stringify(rest), 'Ex', Number(process.env.REDIS_EXPIRED_TIME));
  }
}

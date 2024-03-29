import cluster from 'cluster';
import { cpus } from 'os';
import { config } from 'dotenv';
import { runServer } from './server';

config();

if (process.env.USE_CLUSTER === 'true') {
  const numCPUs = cpus().length;

  if (cluster.isPrimary) {
    [...new Array(numCPUs)].forEach(() => cluster.fork());

    // cluster manager
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Restarting ${worker.process.pid}. ${code || signal}`);
      cluster.fork();
    });
  } else {
    runServer();
  }
} else {
  runServer();
}

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
});

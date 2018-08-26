import * as express from 'express';
import * as multer from 'multer';
import * as demos from './controllers/demos';
import * as health from './controllers/health';
import * as renderer from './renderer/renderer'; //TODO: fix

const upload = multer({ storage: multer.memoryStorage() });

export function router(app: express.Application) {
  app.use('/public', express.static('dist'));
  app.get('/demos/:owner', renderer.get);
  app.use('/demos', express.static(process.env.OUTPUT_DIR || 'build'));
  app.get('/api/demos/sequence', demos.getTimeSequence);
  app.get('/api/demos', demos.getOwners);
  app.get('/api/demos/:owner', demos.getRepos);
  app.get('/api/demos/:owner/:repo', demos.getDemos);
  app.post('/api/demos/:owner/:repo', upload.array('file'), demos.post);
  app.get('/api/health', health.get);
  app.get('/', renderer.get);
}

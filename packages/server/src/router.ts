'use strict';

import * as express from 'express';
import * as multer from 'multer';
import * as demos from './controllers/demos';
import * as health from './controllers/health';

const upload = multer({ storage: multer.memoryStorage() });

export function router(app: express.Application) {
  app.use('/demos', express.static('dist'));
  app.get('/api/health', health.get);
  app.get('/api/demos', demos.getAll);
  app.post('/api/demos/:owner/:repo', upload.array('file'), demos.post);
}

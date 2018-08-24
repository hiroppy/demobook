'use strict';

const express = require('express');
const multer = require('multer');
const demos = require('./controllers/demos');
const health = require('./controllers/health');

const upload = multer({ storage: multer.memoryStorage() });

function router(app) {
  app.use('/demos', express.static('dist'));
  app.get('/api/health', health.get);
  app.get('/api/demos', demos.getAll);
  app.post('/api/demos/:owner/:repo', upload.array('file'), demos.post);
}

module.exports = router;

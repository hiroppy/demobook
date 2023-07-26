import { Request, Response } from 'express';
import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { renderFullPage } from './renderFullPage';
import { Router } from '../../client/Router';
import { configureStore } from '../../client/store/configureStore';
import { rootSaga } from '../../client/sagas';

const assets = (
  process.env.NODE_ENV === 'production'
    ? (() => {
        const manifest = require('../../../dist/manifest');

        return [manifest['vendor.js'], manifest['main.js']];
      })()
    : ['/public/main.bundle.js']
)
  .map((f) => `<script src="${f}"></script>`)
  .join('\n');

export function get(req: Request, res: Response) {
  const store = configureStore();
  const sheet = new ServerStyleSheet();
  const jsx = (
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <div id="root">
          <Router />
        </div>
      </StaticRouter>
    </Provider>
  );

  store
    .runSaga(rootSaga)
    .toPromise()
    .then(() => {
      const preloadedState = JSON.stringify(store.getState());
      const helmetContent = Helmet.renderStatic();
      const meta = `
        ${helmetContent.meta.toString()}
        ${helmetContent.title.toString()}
        ${helmetContent.link.toString()}
      `.trim();
      const style = sheet.getStyleTags();
      const body = renderToString(jsx);

      res.send(renderFullPage({ meta, assets, body, style, preloadedState }));
    })
    .catch((e: Error) => {
      res.status(500).send(e.message);
    });

  // kick redux-saga and styled-components
  renderToStaticMarkup(sheet.collectStyles(jsx));
}

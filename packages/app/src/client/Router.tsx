import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { App } from './components/App';
import { Top } from './containers/Top';
import { Owner } from './containers/Owner';

export const Router = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Top} />
      <Route exact path="/demos/:owner" component={Owner} />
    </Switch>
  </App>
);

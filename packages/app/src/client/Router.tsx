import * as React from 'react';
import { Route, Routes } from 'react-router';
import { App } from './components/App';
import { Top } from './containers/Top';
import { Owner } from './containers/Owner';

export const Router = () => (
  <App>
    <Routes>
      {/* @ts-expect-error */}
      <Route path="/" element={<Top />} />
      {/* @ts-expect-error */}
      <Route path="/demos/:owner" element={<Owner />} />
    </Routes>
  </App>
);

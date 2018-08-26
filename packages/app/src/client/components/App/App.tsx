import * as React from 'react';
import { injectGlobal } from 'styled-components';
import { Main } from '../templates/Main';

injectGlobal`
  body {
    font-family: 'Muli', sans-serif;
    margin: 0;
  }

  #root {
    height: 100vh;
  }
`;

export interface Props {
  children: React.ReactNode;
}

// like App-Shell of PWA
export const App = ({ children }: Props) => <Main>{children}</Main>;

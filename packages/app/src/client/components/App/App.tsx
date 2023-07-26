import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Main } from '../templates/Main';

const GlobalStyle = createGlobalStyle`
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
export const App = ({ children }: Props) => (
  <>
    <GlobalStyle />
    <Main>{children}</Main>
  </>
);

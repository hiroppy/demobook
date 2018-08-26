import * as React from 'react';
import styled from 'styled-components';
import { Header } from '../../../containers/Header';
import { Sidebar } from '../../../containers/Sidebar';

interface Props {
  children: React.ReactNode;
}

const Container = styled.div`
  background: #f5f5f5;
  display: flex;
  height: calc(100% - 48px);
`;

const Content = styled.div`
  overflow-y: auto;
  padding: 24px;
  width: 100%;
`;

export const Main = ({ children }: Props) => (
  <React.Fragment>
    <Header />
    <Container>
      <Sidebar />
      <Content>{children}</Content>
    </Container>
  </React.Fragment>
);

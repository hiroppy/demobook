import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  letter-spacing: 1;

  & > :first-child {
    font-size: 1rem;
    padding-right: 4px;
  }
`;

export interface Props {
  icon: React.ReactNode;
  text: string;
}

export const LabelWithIcon = ({ icon, text }: Props) => (
  <Container>
    {icon}
    {text}
  </Container>
);

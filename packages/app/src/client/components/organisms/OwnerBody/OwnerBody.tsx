import * as React from 'react';
import styled from 'styled-components';
import { RepoCard } from '../../molecules/RepoCard';
import { GetReposResponse } from '../../../../types/apis/demos';

export type Props = {
  className?: string;
  repos: GetReposResponse['repos'];
  baseUrl: string;
};

const Container = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
`;

export const OwnerBody = ({ className, repos, baseUrl }: Props) => (
  <Container className={className}>
    {Object.entries(repos).map(([name, value]) => (
      <RepoCard name={name} demos={value} key={name} baseUrl={baseUrl} />
    ))}
  </Container>
);

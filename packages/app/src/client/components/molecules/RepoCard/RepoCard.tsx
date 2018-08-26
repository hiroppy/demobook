import * as React from 'react';
import styled from 'styled-components';
import { IoLogoBuffer } from 'react-icons/io';
import { FaGithub } from 'react-icons/fa';
import { DemoCard } from '../../atoms/DemoCard';
import { LinkWithBlank } from '../../atoms/LinkWithBlank';
import { mainColor, black } from '../../../constants/colors';
import { GetReposResponse } from '../../../../types/apis/demos';

export type Props = {
  demos: GetReposResponse['repos']['repo'];
  name: string;
  baseUrl: string;
};

const Container = styled.section`
  background: white;
  border-top: 2px solid ${mainColor};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const TitleBox = styled.div`
  background: #f3f3f3;
  text-align: center;
  padding: 24px;
`;

const Title = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  & > h3 {
    font-size: 1.3rem;
    font-weight: 400;
    margin: 0;
  }

  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const TitleIcon = styled(IoLogoBuffer)`
  font-size: 1.8rem;
  margin: 4px 0;
`;

const Demos = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0;
  padding: 0;

  & > li {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    list-style-type: none;

    &:nth-child(odd) {
      border-right: 1px solid #ddd;
    }
  }
`;

const GithubLink = styled(LinkWithBlank)`
  color: ${black};
`;

export const RepoCard = ({ name, baseUrl, demos }: Props) => (
  <Container>
    <TitleBox>
      <TitleIcon />
      <Title>
        <h3>{name}</h3>
        <GithubLink url={`${baseUrl}/${name}`}>
          <FaGithub />
        </GithubLink>
      </Title>
    </TitleBox>
    <Demos>
      {demos.map((demo) => (
        <li key={demo.key}>
          <DemoCard {...demo} />
        </li>
      ))}
    </Demos>
  </Container>
);

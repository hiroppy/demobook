import * as React from 'react';
import styled from 'styled-components';
import * as prettyBytes from 'pretty-bytes';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { MdStorage } from 'react-icons/md';
import { MdTimer } from 'react-icons/md';
import { LabelWithIcon } from '../../atoms/Label';
import { LinkWithBlank } from '../../atoms/LinkWithBlank';
import { black } from '../../../constants/colors';
import { GetSequence } from '../../../../types/apis/demos';

const Container = styled(LinkWithBlank)`
  border-bottom: 1px solid #ddd;
  color: ${black};
  display: block;
  padding: 12px 24px;
  text-decoration: none;
`;

const Title = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  justify-content: space-between;
`;

const Label = styled.span`
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProjectName = styled(Label)`
  font-size: 1.1rem;
`;

const Repo = styled(Label)`
  font-size: 0.8rem;
`;

const Body = styled.div`
  color: #555;
  display: flex;
  font-size: 0.8rem;
  margin: 8px 0;
  justify-content: space-between;
`;

export const StreamDemoListItem = ({
  url,
  projectName,
  owner,
  repo,
  dateNum,
  totalSize,
}: GetSequence[0]) => (
  <Container url={url}>
    <Title>
      <ProjectName>{projectName}</ProjectName>
      <LabelWithIcon icon={<MdStorage />} text={prettyBytes(totalSize)} />
    </Title>
    <Body>
      <LabelWithIcon icon={<MdTimer />} text={`-${differenceInMinutes(Date.now(), dateNum)}min`} />
      <Repo>
        {owner}/{repo}
      </Repo>
    </Body>
  </Container>
);

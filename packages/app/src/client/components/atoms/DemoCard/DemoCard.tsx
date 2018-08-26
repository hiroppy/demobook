import * as React from 'react';
import styled from 'styled-components';
import * as prettyBytes from 'pretty-bytes';
import { FaGithub } from 'react-icons/fa';
import { MdStorage } from 'react-icons/md';
import { MdUpdate } from 'react-icons/md';
import { LabelWithIcon } from '../../atoms/Label';
import { LinkWithBlank } from '../../atoms/LinkWithBlank';
import { convertStringFromUnixTime } from '../../../../utils/format';
import { black } from '../../../constants/colors';
import { GetReposResponse } from '../../../../types/apis/demos';

const Container = styled(LinkWithBlank)`
  color: ${black};
  display: block;
  text-decoration: none;
`;

const TitleBox = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 1.1rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 120px;
`;

const Info = styled.div`
  color: #555;
  font-size: 0.8rem;
  margin: 8px 0;

  & > *:not(:first-child) {
    margin-top: 4px;
  }
`;

const PR = styled(LinkWithBlank)`
  align-items: center;
  color: #555;
  display: flex;
  font-size: 0.9rem;
  text-decoration: none;

  & > *:not(:first-child) {
    margin-left: 4px;
  }
`;

export const DemoCard = ({
  url,
  projectName,
  prNum,
  prUrl,
  dateNum,
  totalSize
}: GetReposResponse['repos']['repo'][0]) => (
  <Container url={url}>
    <TitleBox>
      <Title>{projectName}</Title>
      {prNum && prUrl ? (
        <PR url={prUrl}>
          <FaGithub /> <span>#{prNum}</span>
        </PR>
      ) : null}
    </TitleBox>
    <Info>
      <LabelWithIcon icon={<MdStorage />} text={prettyBytes(totalSize)} />
      <LabelWithIcon icon={<MdUpdate />} text={convertStringFromUnixTime(dateNum)} />
    </Info>
  </Container>
);

import * as React from 'react';
import styled from 'styled-components';
import * as prettyBytes from 'pretty-bytes';
import { FaGithub } from 'react-icons/fa';
import { MdStorage } from 'react-icons/md';
import { MdBookmarkBorder } from 'react-icons/md';
import { IoLogoBuffer } from 'react-icons/io';
import { MdUpdate } from 'react-icons/md';
import { LinkWithBlank } from '../../atoms/LinkWithBlank';
import { LabelWithIcon, ActiveLabel } from '../../atoms/Label';
import { convertStringFromUnixTime } from '../../../../utils/format';
import { mainColor } from '../../../constants/colors';
import { GetReposResponse } from '../../../../types/apis/demos';

export type Props = GetReposResponse['owner'] & {
  reposNum: number;
};

const Container = styled.div`
  align-items: center;
  border-top: 2px solid ${mainColor};
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  display: flex;
  justify-content: space-between;
  padding: 28px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0;
`;

const Info = styled.div`
  color: #555;
  display: flex;
  font-size: 0.9rem;
  margin-top: 12px;

  > :not(:first-child) {
    margin-left: 8px;
  }

  > :not(:last-child) {
    border-right: 1px solid #ccc;
    padding-right: 8px;
  }
`;

const Github = styled(FaGithub)`
  color: ${mainColor};
  font-size: 1.6rem;
`;

export const OwnerHeader = ({ url, name, totalSize, demosNum, updatedAt, reposNum }: Props) => (
  <Container>
    <ActiveLabel />
    <div>
      <Title>{name}</Title>
      <Info>
        <LabelWithIcon icon={<IoLogoBuffer />} text={String(reposNum)} />
        <LabelWithIcon icon={<MdBookmarkBorder />} text={String(demosNum)} />
        <LabelWithIcon icon={<MdStorage />} text={prettyBytes(totalSize)} />
        <LabelWithIcon icon={<MdUpdate />} text={convertStringFromUnixTime(updatedAt)} />
      </Info>
    </div>
    <div>
      <LinkWithBlank url={url}>
        <Github />
      </LinkWithBlank>
    </div>
  </Container>
);

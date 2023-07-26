import * as React from 'react';
import styled from 'styled-components';
import * as prettyBytes from 'pretty-bytes';
import { FaGithub } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import { MdStorage } from 'react-icons/md';
import { MdBookmarkBorder } from 'react-icons/md';
import { LinkWithBlank } from '../../atoms/LinkWithBlank';
import { LabelWithIcon } from '../../atoms/Label';
import { mainColor, black } from '../../../constants/colors';
import { convertStringFromUnixTime } from '../../../../utils/format';
import { GetOwnersResponse } from '../../../../types/apis/demos';

export type Props = GetOwnersResponse['owner'] & {
  name: string;
};

const Container = styled.section`
  background: #fff;
  border-top: 2px solid ${mainColor};
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  color: ${black};
  display: flex;
  padding: 28px;
`;

const RightBox = styled.div`
  margin-left: 24px;
  width: calc(100% - 100px - 24px);
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  & > h2 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 400;
    border-bottom: 1px solid #ddd;
    padding-bottom: 4px;
    width: 100%;
  }
`;

const GithubLink = styled(LinkWithBlank)`
  color: ${mainColor};
  font-size: 1.5rem;
`;

const Img = styled.img`
  border-radius: 4px;
  height: 100px;
  width: 100px;
`;

const Info = styled.div`
  color: #555;
  font-size: 0.8rem;
  margin-top: 8px;

  & > *:not(:first-child) {
    margin-top: 4px;
  }
`;

export const OwnerCard = ({ url, name, demosNum, updatedAt, totalSize }: Props) => (
  <Container>
    <div>
      <Img src={`${process.env.GITHUB_URL}/${name}.png?size=100`} />
    </div>
    <RightBox>
      <Title>
        <h2>{name}</h2>
        <GithubLink url={url}>
          <FaGithub />
        </GithubLink>
      </Title>
      <Info>
        <LabelWithIcon icon={<MdUpdate />} text={convertStringFromUnixTime(updatedAt)} />
        <LabelWithIcon icon={<MdStorage />} text={prettyBytes(totalSize)} />
        <LabelWithIcon icon={<MdBookmarkBorder />} text={String(demosNum)} />
      </Info>
    </RightBox>
  </Container>
);

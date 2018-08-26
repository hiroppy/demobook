import * as React from 'react';
import styled from 'styled-components';
import { MdUpdate } from 'react-icons/md';
import Loading from 'react-loading';
import { mainColor } from '../../../constants/colors';
import { StreamDemoListItem } from '../../molecules/SteamDemoListItem';
import { GetSequence } from '../../../../types/apis/demos';

export interface Props {
  load: () => void;
  refreshedTime: string;
  demos: GetSequence;
  isFetching: boolean;
}

const Container = styled.div`
  background: #f1f1f1;
  min-width: 260px;
`;

const UpdateTimeBox = styled.div`
  align-items: center;
  border-bottom: 1px solid #ddd;
  color: #333;
  font-size: 0.8rem;
  display: flex;
  height: 24px;
  margin: 8px 24px 0;
  text-align: left;

  & > *:not(:first-child) {
    margin-left: 8px;
  }

  & > svg {
    font-size: 1.1rem;
  }
`;

const DemosBox = styled.ul`
  height: calc(100% - 32px - 32px);
  overflow-y: auto;
  padding-left: 0;

  & > li {
    list-style-type: none;
  }
`;

const LoadingBox = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

export class Sidebar extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.load();
    }, 3000);
  }

  render() {
    const { refreshedTime, demos, isFetching } = this.props;

    return (
      <Container>
        {!isFetching ? (
          <React.Fragment>
            <UpdateTimeBox>
              <MdUpdate />
              <span>{refreshedTime}</span>
            </UpdateTimeBox>
            <DemosBox>
              {demos.map((demo) => (
                <li key={demo.key}>
                  <StreamDemoListItem {...demo} />
                </li>
              ))}
            </DemosBox>
          </React.Fragment>
        ) : (
          <LoadingBox>
            {process.env.BROWSER ? <Loading type="cubes" color={mainColor} /> : null}
          </LoadingBox>
        )}
      </Container>
    );
  }
}

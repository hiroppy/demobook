import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Head } from '../../Head';
import { OwnerCard } from '../../molecules/OwnerCard';
import { GetOwnersResponse } from '../../../../types/apis/demos';

export interface Props {
  children: React.ReactNode;
  load: () => void;
  owners: GetOwnersResponse;
}

const Container = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
`;

const Card = styled(Link)`
  text-decoration: none;
`;

export class Top extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    props.load();
  }

  render() {
    const { owners } = this.props;

    return (
      <React.Fragment>
        <Head title="top" />
        <Container>
          {Object.entries(owners).map(([owner, repos]) => (
            <Card to={`/demos/${owner}`} key={owner}>
              <OwnerCard name={owner} {...repos} />
            </Card>
          ))}
        </Container>
      </React.Fragment>
    );
  }
}

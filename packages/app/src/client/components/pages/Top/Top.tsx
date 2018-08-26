import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Head } from '../../Head';
import { OwnerCard } from '../../molecules/OwnerCard';
import { GetOwnersResponse } from '../../../../types/apis/demos';
import { mainColor } from '../../../constants/colors';

export interface Props {
  children: React.ReactNode;
  load: () => void;
  owners: GetOwnersResponse;
  isLoadCompletion: boolean;
  openCommandModal: () => void;
}

interface State {
  displayedRecommendationText: boolean;
}

const Container = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
`;

const Card = styled(Link)`
  text-decoration: none;
`;

const RecommendText = styled.div`
  & > a {
    color: ${mainColor};
    cursor: pointer;
  }
`;

export class Top extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { displayedRecommendationText: false };

    props.load();
  }

  componentDidUpdate() {
    if (this.props.isLoadCompletion && Object.keys(this.props.owners).length === 0) {
      this.setState({ displayedRecommendationText: true });
    } else if (this.state.displayedRecommendationText) {
      this.setState({ displayedRecommendationText: false });
    }
  }

  render() {
    const { owners, isLoadCompletion, openCommandModal } = this.props;

    return (
      <React.Fragment>
        <Head title="top" />
        <Container>
          {isLoadCompletion
            ? Object.entries(owners).map(([owner, repos]) => (
                <Card to={`/demos/${owner}`} key={owner}>
                  <OwnerCard name={owner} {...repos} />
                </Card>
              ))
            : null}
          {this.state.displayedRecommendationText ? (
            <RecommendText>
              <h1>Let's deploy static files!</h1>
              <br />
              <a onClick={openCommandModal}>Try to create a command</a>
            </RecommendText>
          ) : null}
        </Container>
      </React.Fragment>
    );
  }
}

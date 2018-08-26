import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Head } from '../../Head';
import { OwnerHeader } from '../../organisms/OwnerHeader';
import { OwnerBody } from '../../organisms/OwnerBody';
import { GetReposResponse } from '../../../../types/apis/demos';

export interface Props extends RouteComponentProps<{ owner: string }> {
  children: React.ReactNode;
  load: (owner: string) => void;
  owner: GetReposResponse['owner'];
  repos: GetReposResponse['repos'];
  isLoadCompletion: boolean;
}

const Body = styled(OwnerBody)`
  margin: 24px 0;
`;

export class Owner extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    const { owner } = props.match.params;

    if (props.owner.name !== owner) props.load(owner);
  }

  render() {
    const { owner, repos, isLoadCompletion } = this.props;

    console.log(isLoadCompletion);
    return (
      <React.Fragment>
        <Head title={owner.name} />
        {isLoadCompletion ? (
          <React.Fragment>
            <OwnerHeader {...owner} reposNum={Object.keys(repos).length} />
            <Body repos={repos} baseUrl={owner.url} />
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

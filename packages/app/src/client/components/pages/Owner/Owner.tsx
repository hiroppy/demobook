import * as React from 'react';
import styled from 'styled-components';
import { Head } from '../../Head';
import { OwnerHeader } from '../../organisms/OwnerHeader';
import { OwnerBody } from '../../organisms/OwnerBody';
import { GetReposResponse } from '../../../../types/apis/demos';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export interface Props {
  children: React.ReactNode;
  load: (owner: string) => void;
  owner: GetReposResponse['owner'];
  repos: GetReposResponse['repos'];
  isLoadCompletion: boolean;
}

const Body = styled(OwnerBody)`
  margin: 24px 0;
`;

export function Owner({ load, owner, repos, isLoadCompletion }: Props) {
  const params = useParams<{ owner: string }>();

  useEffect(() => {
    if (params.owner && owner.name !== params.owner) {
      load(params.owner);
    }
  }, [load, owner.name, params.owner]);

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

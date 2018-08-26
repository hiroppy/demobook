import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdHome } from 'react-icons/md';
import { MdKeyboard } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import { LinkWithBlank } from '../../atoms/LinkWithBlank';

// type CommandModal = typeof import('../../molecules/CommandModal');

interface State {
  isOpen: boolean;
  Modal: any;
  // Modal: CommandModal | null;
}

const Container = styled.div`
  align-items: center;
  background: #2f2f2f;
  display: flex;
  font-size: 1.5rem;
  height: 48px;
  justify-content: space-between;
  width: 100%;

  & * {
    cursor: pointer;
    color: #fff;
  }

  & > * {
    padding: 0 24px;
  }

  & > div > *:not(:first-child) {
    margin-left: 12px;
  }
`;

export class Header extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = { isOpen: false, Modal: null };
  }

  onRequestOpen = () => {
    this.setState({ isOpen: true });
  };

  onRequestClose = () => {
    this.setState({ isOpen: false });
  };

  async componentDidMount() {
    const {
      CommandModal
    } = await import(/* webpackPrefetch: true, webpackChunkName: "CommnadModal" */
    '../../molecules/CommandModal');

    this.setState({ Modal: CommandModal as any });
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <div>
            <Link to="/">
              <MdHome />
            </Link>
            <MdKeyboard onClick={this.onRequestOpen} />
          </div>
          <LinkWithBlank url="https://github.com/hiroppy/demobook">
            <FaGithub />
          </LinkWithBlank>
        </Container>
        {this.state.Modal ? (
          <this.state.Modal isOpen={this.state.isOpen} onRequestClose={this.onRequestClose} />
        ) : null}
      </React.Fragment>
    );
  }
}

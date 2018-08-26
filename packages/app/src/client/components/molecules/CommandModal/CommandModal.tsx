import * as React from 'react';
import * as Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { Input } from '../../atoms/Input';

export interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface State {
  target: string;
  owner: string;
  repo: string;
  dir: string;
  name: string;
  pr: string;
  copyed: boolean;
}

const Close = styled(MdClose)`
  color: #555;
  font-size: 1.4rem;
  position: absolute;
  right: 24px;
  top: 24px;
`;

const Description = styled.h2`
  text-align: center;
`;

const Form = styled.div`
  margin: auto;
  width: 480px;

  & > input {
    width: 100%;
    margin-bottom: 12px;
    padding: 4px 12px;
    height: 32px;
    font-size: 1rem;
    line-height: 1.5;
    color: #000;
    font-weight: 400;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;

    &:focus {
      border-color: #40a9ff;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      border-right-width: 1px !important;
    }

    &::placeholder {
      color: #bbb;
    }
  }
`;

const Result = styled.div`
  background: #333;
  overflow-x: auto;
  padding: 12px;
  white-space: nowrap;
  word-break: none;
  margin-top: 12px;

  & > input {
    border: none;
    background: transparent;
    color: #f5f5f5;
    font-size: 1.1rem;
    outline: none;
    width: 100%;
  }
`;

export class CommandModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      target: window.location.origin,
      owner: '',
      repo: '',
      dir: 'dist',
      name: 'main',
      pr: '',
      copyed: false
    };
  }

  onChange = (key: string, e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [key]: e.currentTarget.value });
  };

  copy = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.nativeEvent && e.nativeEvent.target) {
      (e.nativeEvent.target as any).setSelectionRange(0, e.currentTarget.value.length);

      document.execCommand('copy');
      this.setState({
        copyed: true,
        target: window.location.origin,
        owner: '',
        repo: '',
        dir: 'dist',
        name: 'main',
        pr: ''
      });

      setTimeout(() => {
        this.setState({ copyed: false });
      }, 1000);
    }
  };

  render() {
    const { isOpen, onRequestClose } = this.props;
    const { target, owner, repo, name, dir, pr, copyed } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        style={{
          overlay: {
            background: 'rgba(0, 0, 0, .7)'
          },
          content: {
            margin: 'auto',
            width: 640,
            height: 480,
            position: 'relative',
            textAlign: 'center',
            top: 48
          }
        }}
      >
        <Close onClick={onRequestClose} />
        <Description>Generate CLI command</Description>
        <Form>
          <Input
            placeholder="Target: --target, -t"
            value={target}
            onChange={(e) => this.onChange('target', e)}
          />
          <Input
            placeholder="Owner: --owner, -o"
            value={owner}
            onChange={(e) => this.onChange('owner', e)}
          />
          <Input
            placeholder="Repository: --repo, -r"
            value={repo}
            onChange={(e) => this.onChange('repo', e)}
          />
          <Input
            placeholder="Demo name to be displayed: --name, -n"
            value={name}
            onChange={(e) => this.onChange('name', e)}
          />
          <Input
            placeholder="Directory name to be deployed: --dir, -d"
            value={dir}
            onChange={(e) => this.onChange('dir', e)}
          />
          <Input
            placeholder="Number of Pull request you want to post: --pr"
            value={pr}
            onChange={(e) => this.onChange('pr', e)}
          />
        </Form>
        <Result>
          <input
            type="text"
            value={`npx @demobook/cli -t ${target} -o ${owner} -r ${repo} -n ${name} -d ${dir} ${
              pr ? `--pr ${pr}` : ''
            }`}
            onChange={() => {}}
            onClick={this.copy}
          />
        </Result>
        {copyed ? 'copyed!' : ''}
      </Modal>
    );
  }
}

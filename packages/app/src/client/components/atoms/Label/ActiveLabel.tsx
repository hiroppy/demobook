import * as React from 'react';
import styled from 'styled-components';
import { mainColor } from '../../../constants/colors';

const Label = styled.span`
  background: ${mainColor};
  border-radius: 0 0 4px 4px;
  color: #fff;
  font-size: 0.7rem;
  left: 0;
  letter-spacing: 1.2;
  top: 0;
  padding: 4px 8px;
  position: absolute;
`;

export const ActiveLabel = () => <Label>ACTIVE</Label>;

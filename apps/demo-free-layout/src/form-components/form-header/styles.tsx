/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import styled from 'styled-components';
interface HeaderProps {
  primaryColor?: string;
}
export const Header = styled.div<HeaderProps>`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  column-gap: 8px;
  border-radius: 8px 8px 0 0;
  cursor: move;

  background: ${(props) => {
    const color = props.primaryColor || '#f2f2ff';
    return `linear-gradient(${color} 0%, rgba(0, 0, 0, 0.02) 100%)`;
  }};
  overflow: hidden;

  padding: 8px;
`;

export const Title = styled.div`
  font-size: 20px;
  flex: 1;
  width: 0;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  scale: 0.8;
  border-radius: 4px;
`;

export const Operators = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

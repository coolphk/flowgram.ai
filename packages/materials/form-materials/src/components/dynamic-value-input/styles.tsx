/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */





import styled from 'styled-components';

export const UIContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--semi-color-border);

  overflow: hidden;

  background-color: var(--semi-color-fill-0);
`;

export const UIMain = styled.div`
  flex-grow: 1;
  overflow: hidden;
  min-width: 0;

  & .semi-tree-select,
  & .semi-input-number,
  & .semi-select {
    width: 100%;
    border: none;
    border-radius: 0;
  }

  & .semi-input-wrapper {
    border: none;
    border-radius: 0;
  }
`;

export const UIType = styled.div`
  border-right: 1px solid #e5e5e5;

  & .semi-button {
    border-radius: 0;
  }
`;

export const UITrigger = styled.div`
  border-left: 1px solid #e5e5e5;

  & .semi-button {
    border-radius: 0;
  }
`;

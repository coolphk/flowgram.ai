/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { VariableTree } from './extensions/variable-tree';
import { VariableTagInject } from './extensions/variable-tag';
import { PromptEditor, PromptEditorPropsType } from '../prompt-editor';

export function PromptEditorWithVariables(props: PromptEditorPropsType) {
  return (
    <PromptEditor {...props}>
      <VariableTree />
      <VariableTagInject />
    </PromptEditor>
  );
}

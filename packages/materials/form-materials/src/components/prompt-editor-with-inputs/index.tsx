/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { InputsTree } from './extensions/inputs-tree';
import { PromptEditor, PromptEditorPropsType } from '../prompt-editor';
import { IFlowValue } from '../../typings';

interface PropsType extends PromptEditorPropsType {
  inputsValues: Record<string, IFlowValue>;
}

export function PromptEditorWithInputs({ inputsValues, ...restProps }: PropsType) {
  return (
    <PromptEditor {...restProps}>
      <InputsTree inputsValues={inputsValues} />
    </PromptEditor>
  );
}

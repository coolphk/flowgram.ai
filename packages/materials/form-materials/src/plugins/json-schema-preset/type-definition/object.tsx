/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { CodeEditorMini } from '@/components/code-editor-mini';

import { type JsonSchemaTypeRegistry } from '../manager';

export const objectRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'object',
  ConstantRenderer: (props) => (
    <CodeEditorMini
      value={props.value}
      onChange={(v) => props.onChange?.(v)}
      languageId="json"
      placeholder="Please Input Object"
      readonly={props.readonly}
    />
  ),
};

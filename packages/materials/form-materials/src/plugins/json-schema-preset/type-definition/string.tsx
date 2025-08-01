/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { Input } from '@douyinfe/semi-ui';

import { type JsonSchemaTypeRegistry } from '../manager';

export const stringRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'string',
  ConstantRenderer: (props) => (
    <Input placeholder="Please Input String" size="small" disabled={props.readonly} {...props} />
  ),
};

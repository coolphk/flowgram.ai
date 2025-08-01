/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { InputNumber } from '@douyinfe/semi-ui';

import { type JsonSchemaTypeRegistry } from '../manager';

export const integerRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'integer',
  ConstantRenderer: (props) => (
    <InputNumber
      placeholder="Please Input Integer"
      size="small"
      disabled={props.readonly}
      precision={0}
      {...props}
    />
  ),
};

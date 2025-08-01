/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { InputNumber } from '@douyinfe/semi-ui';

import { type JsonSchemaTypeRegistry } from '../manager';

export const numberRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'number',
  ConstantRenderer: (props) => (
    <InputNumber
      placeholder="Please Input Number"
      size="small"
      disabled={props.readonly}
      hideButtons
      {...props}
    />
  ),
};

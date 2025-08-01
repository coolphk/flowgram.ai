/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { Select } from '@douyinfe/semi-ui';

import { type JsonSchemaTypeRegistry } from '../manager';

export const booleanRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'boolean',
  ConstantRenderer: (props) => {
    const { value, onChange, ...rest } = props;
    return (
      <Select
        placeholder="Please Select Boolean"
        size="small"
        disabled={props.readonly}
        optionList={[
          { label: 'True', value: 1 },
          { label: 'False', value: 0 },
        ]}
        value={value ? 1 : 0}
        onChange={(value) => onChange?.(!!value)}
        {...rest}
      />
    );
  },
};

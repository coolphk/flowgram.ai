/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { JsonSchemaTypeManager, JsonSchemaUtils } from '@flowgram.ai/json-schema';
import { useScopeAvailable } from '@flowgram.ai/editor';

import { DisplaySchemaTag } from '../display-schema-tag';
import { IFlowValue } from '../../typings';

interface PropsType {
  value?: IFlowValue;
  title?: JSX.Element | string;
  showIconInTree?: boolean;
  typeManager?: JsonSchemaTypeManager;
}

export function DisplayFlowValue({ value, title, showIconInTree }: PropsType) {
  const available = useScopeAvailable();

  const variable = value?.type === 'ref' ? available.getByKeyPath(value?.content) : undefined;

  const schema = useMemo(() => {
    if (value?.type === 'ref') {
      return JsonSchemaUtils.astToSchema(variable?.type);
    }
    if (value?.type === 'template') {
      return { type: 'string' };
    }
    if (value?.type === 'constant') {
      if (value?.schema) {
        return value?.schema;
      }
      if (typeof value?.content === 'string') {
        return { type: 'string' };
      }
      if (typeof value?.content === 'number') {
        return { type: 'number' };
      }
      if (typeof value?.content === 'boolean') {
        return { type: 'boolean' };
      }
    }

    return { type: 'unknown' };
  }, [value, variable?.hash]);

  return (
    <DisplaySchemaTag
      title={title}
      value={schema}
      showIconInTree={showIconInTree}
      warning={value?.type === 'ref' && !variable}
    />
  );
}

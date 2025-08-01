/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo, useState } from 'react';

import { IJsonSchema } from '@flowgram.ai/json-schema';
import { useScopeAvailable } from '@flowgram.ai/editor';

import { IFlowConstantRefValue } from '../../typings/flow-value';

export function useRefVariable(value?: IFlowConstantRefValue) {
  const available = useScopeAvailable();
  const refVariable = useMemo(() => {
    if (value?.type === 'ref') {
      return available.getByKeyPath(value.content);
    }
  }, [value, available]);

  return refVariable;
}

export function useSelectSchema(
  schemaFromProps?: IJsonSchema,
  constantProps?: {
    schema?: IJsonSchema;
  },
  value?: IFlowConstantRefValue
) {
  let defaultSelectSchema = schemaFromProps || constantProps?.schema || { type: 'string' };
  if (value?.type === 'constant') {
    defaultSelectSchema = value?.schema || defaultSelectSchema;
  }

  const [selectSchema, setSelectSchema] = useState(defaultSelectSchema);

  return [selectSchema, setSelectSchema] as const;
}

export function useIncludeSchema(schemaFromProps?: IJsonSchema) {
  const includeSchema = useMemo(() => {
    if (!schemaFromProps) {
      return;
    }
    if (schemaFromProps?.type === 'number') {
      return [schemaFromProps, { type: 'integer' }];
    }
    return { ...schemaFromProps, extra: { ...schemaFromProps?.extra, weak: true } };
  }, [schemaFromProps]);

  return includeSchema;
}

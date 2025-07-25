/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IJsonSchema } from '../json-schema';

export interface IFlowConstantValue {
  type: 'constant';
  content?: string | number | boolean;
  schema?: IJsonSchema;
}

export interface IFlowRefValue {
  type: 'ref';
  content?: string[];
}

export interface IFlowExpressionValue {
  type: 'expression';
  content?: string;
}

export interface IFlowTemplateValue {
  type: 'template';
  content?: string;
}

export type IFlowValue =
  | IFlowConstantValue
  | IFlowRefValue
  | IFlowExpressionValue
  | IFlowTemplateValue;

export type IFlowConstantRefValue = IFlowConstantValue | IFlowRefValue;

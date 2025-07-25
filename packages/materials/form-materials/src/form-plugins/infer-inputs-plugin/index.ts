/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { get, set } from 'lodash';
import {
  defineFormPluginCreator,
  getNodePrivateScope,
  getNodeScope,
  Scope,
} from '@flowgram.ai/editor';

import { JsonSchemaUtils } from '../../utils';
import { IFlowConstantValue, IFlowRefValue, IFlowTemplateValue, IJsonSchema } from '../../typings';

interface InputConfig {
  sourceKey: string;
  targetKey: string;
  scope?: 'private' | 'public';
}

export const createInferInputsPlugin = defineFormPluginCreator<InputConfig>({
  onSetupFormMeta({ addFormatOnSubmit }, { sourceKey, targetKey, scope }) {
    if (!sourceKey || !targetKey) {
      return;
    }

    addFormatOnSubmit((formData, ctx) => {
      set(
        formData,
        targetKey,
        infer(
          get(formData, sourceKey),
          scope === 'private' ? getNodePrivateScope(ctx.node) : getNodeScope(ctx.node)
        )
      );

      return formData;
    });
  },
});

function isRef(value: any): value is IFlowRefValue {
  return (
    value?.type === 'ref' && Array.isArray(value?.content) && typeof value?.content[0] === 'string'
  );
}

function isTemplate(value: any): value is IFlowTemplateValue {
  return value?.type === 'template' && typeof value?.content === 'string';
}

function isConstant(value: any): value is IFlowConstantValue {
  return value?.type === 'constant' && typeof value?.content !== 'undefined';
}

const infer = (values: any, scope: Scope): IJsonSchema | undefined => {
  if (typeof values === 'object') {
    if (isConstant(values)) {
      if (values?.schema) {
        return values.schema;
      }

      if (typeof values.content === 'string') {
        return {
          type: 'string',
        };
      }

      if (typeof values.content === 'number') {
        return {
          type: 'number',
        };
      }

      if (typeof values.content === 'boolean') {
        return {
          type: 'boolean',
        };
      }
    }

    if (isRef(values)) {
      const variable = scope.available.getByKeyPath(values?.content);
      const schema = variable?.type ? JsonSchemaUtils.astToSchema(variable?.type) : undefined;

      return schema;
    }

    if (isTemplate(values)) {
      return {
        type: 'string',
      };
    }

    return {
      type: 'object',
      properties: Object.keys(values).reduce((acc, key) => {
        const schema = infer(values[key], scope);
        if (schema) {
          acc[key] = schema;
        }
        return acc;
      }, {} as Record<string, IJsonSchema>),
    };
  }
};

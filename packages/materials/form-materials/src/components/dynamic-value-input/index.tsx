/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */





import React, { useMemo, useState } from 'react';

import { useScopeAvailable } from '@flowgram.ai/editor';
import { IconButton } from '@douyinfe/semi-ui';
import { IconSetting } from '@douyinfe/semi-icons';

import { Strategy } from '../constant-input/types';
import { ConstantInput } from '../constant-input';
import { JsonSchemaUtils } from '../../utils';
import { IFlowConstantRefValue } from '../../typings/flow-value';
import { UIContainer, UIMain, UITrigger, UIType } from './styles';
import { VariableSelector } from '../variable-selector';
import { TypeSelector } from '../type-selector';
import { IJsonSchema } from '../../typings';

interface PropsType {
  value?: IFlowConstantRefValue;
  onChange: (value?: IFlowConstantRefValue) => void;
  readonly?: boolean;
  hasError?: boolean;
  style?: React.CSSProperties;
  schema?: IJsonSchema;
  constantProps?: {
    strategies?: Strategy[];
    schema?: IJsonSchema; // set schema of constant input only
    [key: string]: any;
  };
}

export function DynamicValueInput({
  value,
  onChange,
  readonly,
  style,
  schema: schemaFromProps,
  constantProps,
}: PropsType) {
  const available = useScopeAvailable();
  const refVariable = useMemo(() => {
    if (value?.type === 'ref') {
      return available.getByKeyPath(value.content);
    }
  }, [value, available]);

  const [selectSchema, setSelectSchema] = useState(
    schemaFromProps || constantProps?.schema || { type: 'string' }
  );

  const renderTypeSelector = () => {
    if (schemaFromProps) {
      return <TypeSelector value={schemaFromProps} readonly={true} />;
    }

    if (value?.type === 'ref') {
      const schema = refVariable?.type ? JsonSchemaUtils.astToSchema(refVariable?.type) : undefined;

      return <TypeSelector value={schema} readonly={true} />;
    }

    return (
      <TypeSelector
        value={selectSchema}
        onChange={(_v) => setSelectSchema(_v || { type: 'string' })}
        readonly={readonly}
      />
    );
  };

  // When is number type, include integer as well
  const includeSchema = useMemo(() => {
    if (!schemaFromProps) {
      return;
    }
    if (schemaFromProps?.type === 'number') {
      return [schemaFromProps, { type: 'integer' }];
    }
    return { ...schemaFromProps, extra: { ...schemaFromProps?.extra, weak: true } };
  }, [schemaFromProps]);

  const renderMain = () => {
    if (value?.type === 'ref') {
      // Display Variable Or Delete
      return (
        <VariableSelector
          style={{ width: '100%' }}
          value={value?.content}
          onChange={(_v) => onChange(_v ? { type: 'ref', content: _v } : undefined)}
          includeSchema={includeSchema}
          readonly={readonly}
        />
      );
    }

    const constantSchema = schemaFromProps || selectSchema || { type: 'string' };

    return (
      <ConstantInput
        value={value?.content}
        onChange={(_v) => onChange({ type: 'constant', content: _v, schema: constantSchema })}
        schema={constantSchema || { type: 'string' }}
        readonly={readonly}
        strategies={[...(constantProps?.strategies || [])]}
        fallbackRenderer={() => (
          <VariableSelector
            style={{ width: '100%' }}
            onChange={(_v) => onChange(_v ? { type: 'ref', content: _v } : undefined)}
            includeSchema={includeSchema}
            readonly={readonly}
          />
        )}
        {...constantProps}
      />
    );
  };

  const renderTrigger = () => (
    <VariableSelector
      style={{ width: '100%' }}
      value={value?.type === 'ref' ? value?.content : undefined}
      onChange={(_v) => onChange({ type: 'ref', content: _v })}
      includeSchema={includeSchema}
      readonly={readonly}
      triggerRender={() => (
        <IconButton disabled={readonly} size="small" icon={<IconSetting size="small" />} />
      )}
    />
  );

  return (
    <UIContainer style={style}>
      <UIType>{renderTypeSelector()}</UIType>
      <UIMain>{renderMain()}</UIMain>
      <UITrigger>{renderTrigger()}</UITrigger>
    </UIContainer>
  );
}

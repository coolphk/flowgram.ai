/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */





import React from 'react';

import { Button, IconButton } from '@douyinfe/semi-ui';
import { IconDelete, IconPlus } from '@douyinfe/semi-icons';

import { PropsType } from './types';
import { DynamicValueInput } from '../dynamic-value-input';
import { IFlowConstantRefValue, IFlowValue } from '../../typings';
import { useObjectList } from '../../hooks';
import { UIRow, UIRows } from './styles';
import { BlurInput } from './components/blur-input';

export function InputsValues({
  value,
  onChange,
  style,
  readonly,
  constantProps,
  schema,
  hasError,
}: PropsType) {
  const { list, updateKey, updateValue, remove, add } = useObjectList<IFlowValue | undefined>({
    value,
    onChange,
    sortIndexKey: 'extra.index',
  });

  return (
    <div>
      <UIRows style={style}>
        {list.map((item) => (
          <UIRow key={item.id}>
            <BlurInput
              style={{ width: 100, minWidth: 100, maxWidth: 100 }}
              disabled={readonly}
              size="small"
              value={item.key}
              onChange={(v) => updateKey(item.id, v)}
              placeholder="Input Key"
            />
            <DynamicValueInput
              style={{ flexGrow: 1 }}
              readonly={readonly}
              value={item.value as IFlowConstantRefValue}
              onChange={(v) => updateValue(item.id, v)}
              schema={schema}
              hasError={hasError}
              constantProps={{
                ...constantProps,
                strategies: [...(constantProps?.strategies || [])],
              }}
            />
            <IconButton
              disabled={readonly}
              theme="borderless"
              icon={<IconDelete size="small" />}
              size="small"
              onClick={() => remove(item.id)}
            />
          </UIRow>
        ))}
      </UIRows>
      <Button disabled={readonly} icon={<IconPlus />} size="small" onClick={add}>
        Add
      </Button>
    </div>
  );
}

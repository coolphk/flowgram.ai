/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */



import {Button, IconButton, Radio} from '@douyinfe/semi-ui';
import {IconDelete, IconPlus} from '@douyinfe/semi-icons';

import {PropsType} from './types';

import {UIRow, UIRows} from './styles';
import {BlurInput} from './components/blur-input';
import {useObjectList} from "./hooks";
import { DynamicValueInput, IFlowConstantRefValue, IFlowValue } from '@flowgram.ai/form-materials';

export function RadioInputsValues({
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
            <Radio value={item.id} name='aa'></Radio>
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

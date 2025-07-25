/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { Cascader, IconButton } from '@douyinfe/semi-ui';

import { IJsonSchema } from '../../typings';
import { ArrayIcons, VariableTypeIcons, getSchemaIcon, options } from './constants';

interface PropTypes {
  value?: Partial<IJsonSchema>;
  onChange?: (value?: Partial<IJsonSchema>) => void;
  readonly?: boolean;
  /**
   * @deprecated use readonly instead
   */
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const getTypeSelectValue = (value?: Partial<IJsonSchema>): string[] | undefined => {
  if (value?.type === 'array' && value?.items) {
    return [value.type, ...(getTypeSelectValue(value.items) || [])];
  }

  return value?.type ? [value.type] : undefined;
};

export const parseTypeSelectValue = (value?: string[]): Partial<IJsonSchema> | undefined => {
  const [type, ...subTypes] = value || [];

  if (type === 'array') {
    return { type: 'array', items: parseTypeSelectValue(subTypes) };
  }

  return { type };
};

export function TypeSelector(props: PropTypes) {
  const { value, onChange, readonly, disabled, style } = props;

  const selectValue = useMemo(() => getTypeSelectValue(value), [value]);

  return (
    <Cascader
      disabled={readonly || disabled}
      size="small"
      triggerRender={() => (
        <IconButton
          size="small"
          style={style}
          disabled={readonly || disabled}
          icon={getSchemaIcon(value)}
        />
      )}
      treeData={options}
      value={selectValue}
      leafOnly={true}
      onChange={(value) => {
        onChange?.(parseTypeSelectValue(value as string[]));
      }}
    />
  );
}

export { VariableTypeIcons, ArrayIcons, getSchemaIcon };

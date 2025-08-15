/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, {useEffect, useState} from 'react';

import {IJsonSchema} from '@flowgram.ai/json-schema';
import {Popover} from '@douyinfe/semi-ui';

import {DisplaySchemaTree} from '../display-schema-tree';
import {useTypeManager} from '../../plugins';
import {PopoverContent, StyledTag, TitleSpan} from './styles';

import {useNodeRender, useWatchFormValueIn} from "@flowgram.ai/free-layout-editor";
import {TagColor} from "@douyinfe/semi-ui/lib/es/tag";

interface PropsType {
  title?: JSX.Element | string;
  value?: IJsonSchema;
  showIconInTree?: boolean;
  warning?: boolean;
}

export function DisplaySchemaTag({value = {}, showIconInTree, title, warning}: PropsType) {
  const typeManager = useTypeManager();
  const icon =
    typeManager?.getDisplayIcon(value) || typeManager.getDisplayIcon({type: 'unknown'});
  console.log('title', title)
  const {node} = useNodeRender()
  const values = useWatchFormValueIn(node, `outputUploadResponse`)
  console.log('values', values)
  const [color, setColor] = useState('white')
  useEffect(() => {
    setColor(values?.color || 'white')
  }, [values]);
  return (
    <Popover
      content={
        <PopoverContent>
          <DisplaySchemaTree value={value} typeManager={typeManager} showIcon={showIconInTree}/>
        </PopoverContent>
      }
    >
      <StyledTag color={warning ? 'amber' : color as TagColor}>
        {icon &&
          React.cloneElement(icon, {
            className: 'tag-icon',
          })}
        {title && <TitleSpan>{title}</TitleSpan>}
      </StyledTag>
    </Popover>
  );
}

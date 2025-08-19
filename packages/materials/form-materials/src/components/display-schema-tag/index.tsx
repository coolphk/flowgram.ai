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

/*interface Asset {
  "asset_id": string,
  "dataslot_id": string,
  "status": WSAssetStatus,
  "task_id": string,
  "object_path": string,
  "filename": string,
  "dt_id": string,
}*/
export function DisplaySchemaTag({value = {}, showIconInTree, title, warning}: PropsType) {
  const typeManager = useTypeManager();
  const icon =
    typeManager?.getDisplayIcon(value) || typeManager.getDisplayIcon({type: 'unknown'});
  console.log('DisplaySchemaTag title', title)
  const {node} = useNodeRender()
  const outputSlot = useWatchFormValueIn(node, `outputSlot`)
  const inputSlot = useWatchFormValueIn(node, `inputSlot`)

  console.log('DisplaySchemaTag outputSlot', outputSlot)
  console.log('DisplaySchemaTag inputSlot', inputSlot)
  const [color, setColor] = useState('white')
  useEffect(() => {
    setColor(inputSlot?.color || 'white')
  }, [outputSlot, inputSlot]);
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

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useState } from 'react';

import { IJsonSchema } from '@flowgram.ai/json-schema';
import { Popover } from '@douyinfe/semi-ui';

import { DisplaySchemaTree } from '../display-schema-tree';
import { useTypeManager } from '../../plugins';
import { PopoverContent, StyledTag, TitleSpan } from './styles';

import { useNodeRender, useWatchFormValueIn } from "@flowgram.ai/free-layout-editor";
import { TagColor } from "@douyinfe/semi-ui/lib/es/tag";

interface PropsType {
  title?: JSX.Element | string;
  value?: IJsonSchema;
  showIconInTree?: boolean;
  warning?: boolean;
}

export function DisplaySchemaTag({ value = {}, showIconInTree, title, warning }: PropsType) {
  const typeManager = useTypeManager();
  const icon =
    typeManager?.getDisplayIcon(value) || typeManager.getDisplayIcon({ type: 'unknown' });
  // console.log('DisplaySchemaTag title', title)
  const { node } = useNodeRender()

  const inputSlot = useWatchFormValueIn(node, `inputSlot`)
  const outputSlot = useWatchFormValueIn(node, `outputSlot`)

  // 使用 useState 生成 inputSlotStatus 和 outputSlotStatus
  const [inputSlotStatus, setInputSlotStatus] = useState<string>('')
  const [outputSlotStatus, setOutputSlotStatus] = useState<string>('')
  const [outlineColor, setOutlineColor] = useState<string>('')
  const watchInputSlotStatus = useWatchFormValueIn(node, `inputSlot.${title as string}.status`)
  const watchOutputSlotStatus = useWatchFormValueIn(node, `outputSlot.${title as string}.status`)
  const watchOutlineColor = useWatchFormValueIn(node, `outputSlot.${title as string}.outlineColor`)

  useEffect(() => {
  }, [watchInputSlotStatus, watchOutputSlotStatus])
  console.log('outlineColor', outlineColor)
  // 当inputSlot改变时
  useEffect(() => {
    const status = inputSlot?.[title as string]?.status || ''
    setInputSlotStatus(status)
  }, [inputSlot, title])

  // 当outputSlot改变时
  useEffect(() => {
    const status = outputSlot?.[title as string]?.status || ''
    const outlineColor = watchOutlineColor
    setOutputSlotStatus(status)
    setOutlineColor(outlineColor)
  }, [outputSlot, title])

  //当inputSlot[key].status改变时
  useEffect(() => {
    const status = watchInputSlotStatus || ''
    setInputSlotStatus(status)
  }, [watchInputSlotStatus])

  //当outputSlot[key].status改变时
  useEffect(() => {
    const status = watchOutputSlotStatus || ''
    setOutputSlotStatus(status)
  }, [watchOutputSlotStatus])
  // console.log('DisplaySchemaTag outputSlotStatus', outputSlotStatus)
  // console.log('DisplaySchemaTag inputSlotStatus', inputSlotStatus)

  const [color, setColor] = useState('white')
  const setColorByStatus = (status: string) => {
    if (status === 'success') {
      setColor('green')
    } else if (status === 'failed') {
      setColor('red')
    } else if (status === 'notyet') {
      setColor('grey')
    } else {
      setColor('white')
    }
  }

  useEffect(() => {
    setColorByStatus(inputSlotStatus)
  }, [inputSlotStatus]);

  useEffect(() => {
    setColorByStatus(outputSlotStatus)
  }, [outputSlotStatus]);
  useEffect(() => {

  }, [outlineColor]);
  return (
    <Popover
      content={
        <PopoverContent>
          <DisplaySchemaTree value={value} typeManager={typeManager} showIcon={showIconInTree} />
        </PopoverContent>
      }
    >
      <StyledTag color={warning ? 'amber' : color as TagColor} outlineColor={outlineColor}>
        {icon &&
          React.cloneElement(icon, {
            className: 'tag-icon',
          })}
        {title && <TitleSpan>{title}</TitleSpan>}
      </StyledTag>
    </Popover>
  );
}

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useCallback } from "react";
import { DisplayInputsValues, DisplayOutputs, IFlowValue } from "@flowgram.ai/form-materials";

import { FormContent } from "../../../form-components";
import { Field, getNodeForm, useClientContext, useForm } from "@flowgram.ai/free-layout-editor";
import { IODataSlot } from "../../../typings";
import { getLineage } from "../../../api/common";
import { Toast } from "@douyinfe/semi-ui";
// import { Tag } from "@douyinfe/semi-ui";

// console.log('currentNodeForm', currentNodeForm)
export const NodeRender: React.FC = () => {
  const currentNodeForm = useForm()
  const ctx = useClientContext()
  // console.log('currentNodeForm', currentNodeForm)
  const onTagClick = useCallback((event: React.MouseEvent, title: string | JSX.Element | undefined, value: IFlowValue | undefined) => {
    event.stopPropagation()
    const outputSlot: IODataSlot = currentNodeForm.getValueIn('outputSlot')
    const asset_id = outputSlot?.[title as string]?.asset_id
    if (!asset_id) {
      Toast.warning("请先运行工作流，生成数据资产!")
      return
    }

    getLineage(asset_id).then((res) => {
      res.assets.map((asset) => {
        const targetNode = ctx.document.getNode(asset.nodeId)
        if (targetNode) {
          const targetForm = getNodeForm(targetNode)
          if (targetForm) {
            const currentOutputSlot = targetForm.getValueIn('outputSlot') || {}
            const currentAssetData = currentOutputSlot[asset.type] || {}

            // 判断outlineColor是否存在，如果存在则清空，否则添加颜色
            const newOutlineColor = currentAssetData.outlineColor ? '' : '#ff6b35'

            const updatedOutputSlot = {
              ...currentOutputSlot,
              [asset.type]: {
                ...currentAssetData,
                outlineColor: newOutlineColor
              }
            }
            targetForm.setValueIn('outputSlot', updatedOutputSlot)
          }
        }
      })
    })

  }, [currentNodeForm, ctx])
  return (
    <FormContent>
      {currentNodeForm.getValueIn('from') === 'outputs' &&
        <div style={{ display: "flex", gap: "8px" }}>
          {/* <Tag>输入：</Tag>  */}
          <Field<
            Record<string, IFlowValue | undefined> | undefined
          > name="inputsValues">
            {({ field: { value } }) => (

              // <div style={{ cursor: 'pointer' }} onClick={(event) => {
              //   event.stopPropagation()
              //   console.log('data-slot-input', value)
              //   // getLineage(value?.id).then(res => {
              //   //   console.log('getLineage', res)
              //   //   setLineage(res)
              //   // })
              //
              // }}>
                <DisplayInputsValues value={value} onTagClick={onTagClick} />
              // </div>
            )}
          </Field>
        </div>
      }
      {
        currentNodeForm.getValueIn('from') === 'inputs' &&
        <div style={{ display: "flex", gap: "8px" }}>
          {/* <Tag>
          输出：
        </Tag> */}
          <DisplayOutputs displayFromScope />
        </div>
      }
    </FormContent>
  );
};

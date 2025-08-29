/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useCallback } from "react";
import { DisplayInputsValues, DisplayOutputs, IFlowValue } from "@flowgram.ai/form-materials";

import { FormContent } from "../../../form-components";
import { Field, getNodeForm, useClientContext, useForm, useService } from "@flowgram.ai/free-layout-editor";
import { IODataSlot } from "../../../typings";
import { getLineage } from "../../../api/common";
import { Toast } from "@douyinfe/semi-ui";
import { AnimationBorderService } from "../../../services";
import { WorkflowStatus } from "../../../typings/workflow";
// import { Tag } from "@douyinfe/semi-ui";

// console.log('currentNodeForm', currentNodeForm)
export const NodeRender: React.FC = () => {
  const currentNodeForm = useForm()
  const ctx = useClientContext()
  const animationService = useService(AnimationBorderService)

  // 辅助方法：判断是否应该为某个状态启动动画
  const shouldAnimateForStatus = (status: WorkflowStatus): boolean => {
    return status === WorkflowStatus.Running || status === WorkflowStatus.Pending || status === WorkflowStatus.Completed
  }

  // 辅助方法：根据工作流状态获取对应的颜色
  const getColorForStatus = (status: WorkflowStatus): string => {
    switch (status) {
      case WorkflowStatus.Pending:
        return '#FFA500' // 橙色
      case WorkflowStatus.Running:
        return '#00BFFF' // 深天蓝
      case WorkflowStatus.Completed:
        return '#32CD32' // 酸橙绿
      case WorkflowStatus.Failed:
        return '#FF4500' // 橙红色
      case WorkflowStatus.Canceled:
        return '#808080' // 灰色
      default:
        return '#ff6b35' // 默认颜色
    }
  }
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
      // 处理assets的边框效果（原有逻辑完全保持不变）
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

      // 新增：处理tasks的节点动画效果（基于WorkflowStatus）
      res.tasks.forEach(task => {
        const targetNode = ctx.document.getNode(task.nodeId)
        if (targetNode) {
          const shouldAnimate = shouldAnimateForStatus(task.status)
          const animationColor = getColorForStatus(task.status)

          if (shouldAnimate) {
            // 根据task状态启动动画
            animationService.startAnimation(targetNode.id, {
              color: animationColor,
              duration: 1000
            })
            // 更新服务中的状态颜色
            animationService.updateStatusColor(targetNode.id, task.status)
          } else {
            // 对于非活跃状态，可以选择停止动画或使用静态颜色
            // 这里保持动画但使用状态对应的静态颜色
            animationService.startAnimation(targetNode.id, {
              color: animationColor,
              duration: 0 // 静态显示，无动画
            })
            animationService.updateStatusColor(targetNode.id, task.status)
          }
        }
      })
    })

  }, [currentNodeForm, ctx, animationService, shouldAnimateForStatus, getColorForStatus])
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

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, {useCallback, useRef} from "react";
import {Button} from "@douyinfe/semi-ui";
import {useEnv} from "../../providers";
import {ENV} from "../../constants";
import {runDt, save} from "../../api/common";
import {getNodeForm, useClientContext, usePlayground, useService} from "@flowgram.ai/free-layout-editor";
import {WebSocketService} from "../../services";
import {WorkflowNodeType} from "../../nodes";

export const EnvButton: React.FC = () => {
  const { setCurrentEnv, isDev, dtTemplateId, setDtInstanceId, saveContent } = useEnv();
  const wsService = useService(WebSocketService);
  const playground = usePlayground();
  const ctx = useClientContext();
  
  // 用于保存设计模式下的表单状态
  const savedFormStatesRef = useRef<Record<string, any>>({});

  /**
   * 保存所有节点的表单状态
   */
  const saveAllFormStates = useCallback(() => {
    const allNodes = ctx.document.getAllNodes()
    const formStates: Record<string, any> = {}

    allNodes.forEach((node: any) => {
      const nodeForm = getNodeForm(node)
      if (nodeForm) {
        // 保存整个节点的表单数据
        formStates[node.id] = {
          formData: nodeForm.values, // 使用 values 属性获取表单数据
          nodeType: node.flowNodeType
        }
      }
    })

    savedFormStatesRef.current = formStates
    console.log('保存的表单状态:', formStates)
  }, [ctx])

  /**
   * 还原所有节点的表单状态
   */
  const restoreAllFormStates = useCallback(() => {
    const allNodes = ctx.document.getAllNodes()
    const savedStates = savedFormStatesRef.current

    allNodes.forEach((node: any) => {
      const nodeForm = getNodeForm(node)
      const savedState = savedStates[node.id]
      
      if (nodeForm && savedState) {
        // 还原节点的表单数据
        try {
          nodeForm.updateFormValues(savedState.formData) // 使用 updateFormValues 方法
        } catch (error) {
          console.warn(`还原节点 ${node.id} 的表单状态失败:`, error)
        }
      }
    })
    
    console.log('表单状态已还原')
  }, [ctx])

  /**
   * 重置所有 data-slot 节点中的 inputSlot 和 outputSlot 状态
   */
  const resetAllDataSlotStates = useCallback(() => {
    const allNodes = ctx.document.getAllNodes()

    allNodes.forEach((node: any) => {
      // 只处理 data-slot 类型的节点
      if (node.flowNodeType === WorkflowNodeType.DataSlot) {
        const nodeForm = getNodeForm(node)
        if (nodeForm) {
          // 重置 inputSlot 状态
          const inputSlot = nodeForm.getValueIn('inputSlot')
          if (inputSlot) {
            for (const key in inputSlot) {
              if (inputSlot[key]) {
                inputSlot[key].status = ''
                inputSlot[key].outlineColor = ''
              }
            }
            nodeForm.setValueIn('inputSlot', inputSlot)
          }

          // 重置 outputSlot 状态
          const outputSlot = nodeForm.getValueIn('outputSlot')
          if (outputSlot) {
            for (const key in outputSlot) {
              if (outputSlot[key]) {
                outputSlot[key].status = ''
                outputSlot[key].outlineColor = ''
              }
            }
            nodeForm.setValueIn('outputSlot', outputSlot)
          }
        }
      }
    })
  }, [ctx])
  const handleToggleEnv = useCallback(() => {
    // dtTemplateId 暂定为切换到运行模式时调用run接口，进行运行
    console.log('handleToggleEnv', dtTemplateId)

    if (isDev) {
      // 从设计模式切换到运行模式时，保存表单状态
      saveAllFormStates()
      
      playground.config.readonly = true
      if (!saveContent) {
        return;
      }
      save(saveContent).then(res => {
        // console.log('save res', res)
        runDt(dtTemplateId).then(res => {
          console.log('dtInstanceId', res)
          setDtInstanceId(res)
          wsService.setDtInstanceId(res)
          wsService.connect()
          // wsService.onConnectionStateChange((state) => {
          //   console.log('wsService connection state change', state)
          // })
          // wsService.onNodeMessage((msg) => {
          //   console.log('wsService onNodeMessage', msg)
          // })
        })
      })
      setCurrentEnv(ENV.PROD);
    } else {
      // 从运行模式切换回设计模式时，还原表单状态
      wsService.disconnect()
      setCurrentEnv(ENV.DEV);
      playground.config.readonly = false

      // 重置所有 data-slot 节点的状态
      resetAllDataSlotStates()
      
      // 还原保存的表单状态
      restoreAllFormStates()
    }
  }, [isDev, saveContent, dtTemplateId, setDtInstanceId, wsService, setCurrentEnv, playground, saveAllFormStates, resetAllDataSlotStates, restoreAllFormStates])

  return (
    <Button
      onClick={handleToggleEnv}
      style={{
        backgroundColor: isDev ? 'rgba(0, 178, 60, 1)' : 'rgba(255, 77, 79, 1)',
        borderRadius: '8px',
        color: '#fff',
        border: 'none'
      }}
    >
      {isDev ? "设计模式" : "运行模式"}
    </Button>
  );
};

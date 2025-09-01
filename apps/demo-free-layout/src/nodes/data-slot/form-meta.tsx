/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  DataEvent,
  EffectFuncProps,
  FormMeta,
  FormRenderProps,
  getNodeForm,
  useClientContext,
  useNodeRender,
  useService,
  ValidateTrigger,
} from "@flowgram.ai/free-layout-editor";
import {
  createInferInputsPlugin,
  IJsonSchema,
  provideJsonSchemaOutputs,
  syncVariableTitle,
} from "@flowgram.ai/form-materials";

import { FlowNodeJSON, IODataSlot, WSMessageType } from "../../typings";
import { FormHeader } from "../../form-components";
import { useIsSidebar } from "../../hooks";
import { SidebarRender } from "./side-render";
import { NodeRender } from "./node-render";
import { useEffect } from "react";
import { WebSocketService } from "../../services";
import { getNotifyKey } from "../../utils";
import { useEnv } from "../../providers";
import { Notification } from "@douyinfe/semi-ui";

export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON>) => {
  const isSidebar = useIsSidebar();
  const websocketService = useService(WebSocketService)
  const ctx = useClientContext()
  const { node } = useNodeRender()
  const { notifyMap } = useEnv()
  // const nodeData = data as DataSlotNodeData
  useEffect(() => {
    if (isSidebar) {
      return
    }
    let notifyId: null | string = null
    console.log('🟡 [初始化] data-slot WebSocket监听器:', {
      nodeId: node.id,
      websocketConnected: websocketService.isConnected(),
      notifyMapSize: notifyMap.size
    })
    // console.log('data-slot formMeta')
    websocketService.onNodeMessage((message) => {

      if (message.nodeId != node.id) {
        return
      }
      console.log(`📬 [收到消息] DataSlot=${node.id} 收到WSMessage:`, {
        messageType: message.type,
        messageNodeId: message.nodeId,
        currentNodeId: node.id,
        isForCurrentNode: message.nodeId === node.id,
        payload: message.payload
      })
      if (message.type === WSMessageType.AssetMessage) {
        // message
        const assetNode = ctx.document.getNode(message.nodeId)
        if (!assetNode) {
          return
        }
        const assetForm = getNodeForm(assetNode)
        const inputSlot = assetForm?.getValueIn('inputSlot')
        // console.log('on DataSlot recive WSMessage', message)
        for (const key in inputSlot) {
          if (inputSlot[key].id == message.payload.assetsId) {
            inputSlot[key].status = message.payload.status
            assetForm?.setValueIn('inputSlot', inputSlot)
          }
        }
      }
      if (message.type === WSMessageType.RunToolMessage) {
        console.log('🔴 [处理WebSocket回执] 收到RunToolMessage:', {
          nodeId: message.nodeId,
          currentNodeId: node.id,
          payload: message.payload,
          assetsIdArray: message.payload.assetsId,
          firstAssetId: message.payload.assetsId[0],
          toolId: message.payload.toolId,
          status: message.payload.status
        })

        // console.log('RunToolMessage', message.payload)
        const notifyKey = getNotifyKey(message.payload.assetsId[0], message.payload.toolId, node.id)
        console.log('🔴 [处理WebSocket回执] 生成notifyKey:', {
          assetId: message.payload.assetsId[0],
          toolId: message.payload.toolId,
          nodeId: node.id,
          notifyKey,
          notifyMapHasKey: notifyMap.has(notifyKey),
          notifyMapSize: notifyMap.size
        })

        if (notifyMap.has(notifyKey)) {
          notifyId = notifyMap.get(notifyKey) as string
          console.log('🔴 [处理WebSocket回执] 找到对应notification:', {
            notifyId,
            status: message.payload.status,
            url: message.payload.url
          })
          if (message.payload.status === 'success') {
            console.log('🟢 [更新Notification] 成功状态')
            Notification.success({
              content: (
                <div>
                  <div>
                    启动完成！<a href={void 0} style={{ cursor: "pointer" }} onClick={() => {
                      window.open(message.payload.url, '_blank', 'noopener,noreferrer')
                    }}>点击运行</a>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    节点ID: {node.id} | 服务ID: {form?.getValueIn('serverId') || 'N/A'} | 资产ID: {message.payload.assetsId[0]} | 工具ID: {message.payload.toolId}
                  </div>
                </div>
              ),
              id: notifyId,
              duration: 0
            })
          } else {
            console.log('🔴 [更新Notification] 失败状态')
            Notification.error({
              content: (
                <div>
                  <div>运行失败</div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    节点ID: {node.id} | 服务ID: {form?.getValueIn('serverId') || 'N/A'} | 资产ID: {message.payload.assetsId[0]} | 工具ID: {message.payload.toolId}
                  </div>
                </div>
              ),
              id: notifyId,
            })
          }
          // 处理成功后从notifyMap中移除，避免其他节点重复处理
          notifyMap.delete(notifyKey)
          console.log('🗑️ [清理] 从notifyMap中移除已处理的key:', notifyKey)
        } else {
          // 只有当notifyMap为空或者明确不包含相关key时才显示警告
          const hasAnyRelatedKey = Array.from(notifyMap.keys()).some(key => {
            // 新的key格式: nodeId-assetId-toolId
            // 检查是否有相同节点的相关key
            const keyParts = key.split('-')
            if (keyParts.length >= 3) {
              const [keyNodeId, keyAssetId, keyToolId] = keyParts
              return keyNodeId === node.id &&
                (keyAssetId === message.payload.assetsId[0] || keyToolId === message.payload.toolId)
            }
            // 兼容旧的key格式: assetId-toolId
            return key.includes(message.payload.assetsId[0]) || key.includes(message.payload.toolId)
          })

          if (!hasAnyRelatedKey && notifyMap.size > 0) {
            console.warn('⚠️ [处理WebSocket回执] 未找到对应的notification:', {
              notifyKey,
              availableKeys: Array.from(notifyMap.keys()),
              message: message.payload
            })

            // 弹出ID不匹配的警告notification
            Notification.warning({
              content: (
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🚨 工具ID不匹配警告</div>
                  <div style={{ marginBottom: '4px' }}>无法找到对应的notification进行更新</div>
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '8px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                    <div><strong>期望的notifyKey:</strong> {notifyKey}</div>
                    <div><strong>节点ID:</strong> {node.id}</div>
                    <div><strong>WebSocket回执:</strong></div>
                    <div style={{ marginLeft: '16px' }}>• 资产ID: {message.payload.assetsId[0]}</div>
                    <div style={{ marginLeft: '16px' }}>• 工具ID: {message.payload.toolId}</div>
                    <div style={{ marginTop: '4px' }}><strong>当前可用的keys:</strong></div>
                    <div style={{ marginLeft: '16px' }}>{Array.from(notifyMap.keys()).join(', ') || '无'}</div>
                  </div>
                </div>
              ),
              position: 'bottomLeft',
              duration: 0, // 不自动关闭，需要手动关闭
              theme: 'light'
            })
          } else {
            console.log('ℹ️ [处理WebSocket回执] notification已被其他节点处理或无相关notification')
          }
        }
      }
    })
    return () => {
      // websocketServiceDispose.dispose()
      // websocketService.disconnect()
      if (notifyId) {
        Notification.close(notifyId)
        notifyId = null
      }
    }
  }, []);
  if (isSidebar) {
    return (
      <>
        <FormHeader primaryColor='#ECFBE5' />
        <SidebarRender />
      </>
    );
  }
  return (
    <>
      <FormHeader primaryColor='#ECFBE5' />
      <NodeRender />
    </>
  );
};

export const formMeta: FormMeta<FlowNodeJSON> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) =>
      value ? undefined : "Title is required",
  },
  effect: {
    title: syncVariableTitle,
    outputs: provideJsonSchemaOutputs,
    inputs: [{
      event: DataEvent.onValueInitOrChange,
      effect: ({ value, form }: EffectFuncProps<IJsonSchema, FormData>) => {
        // console.log('a.b value onValueInitOrChange:', value);
        form.setValueIn('outputs', { ...value })
      },
    }],
    inputSlot: [{
      event: DataEvent.onValueInitOrChange,
      effect: ({ value, form }: EffectFuncProps<IODataSlot, FormData>) => {
        // console.log('a.b value onValueInitOrChange:', value);
        form.setValueIn('outputSlot', { ...value })
      },
    }]
  },
  plugins: [
    createInferInputsPlugin({
      sourceKey: "inputsValues",
      targetKey: "inputs",
    }),
  ],
};

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

import {FlowNodeJSON, IODataSlot, WSMessageType} from "../../typings";
import {FormHeader} from "../../form-components";
import {useIsSidebar} from "../../hooks";
import {SidebarRender} from "./side-render";
import {NodeRender} from "./node-render";
import {useEffect} from "react";
import {WebSocketService} from "../../services";
import {getNotifyKey} from "../../utils";
import {useEnv} from "../../providers";
import {Notification} from "@douyinfe/semi-ui";

export const renderForm = ({form}: FormRenderProps<FlowNodeJSON>) => {
  const isSidebar = useIsSidebar();
  const websocketService = useService(WebSocketService)
  const ctx = useClientContext()
  const {node} = useNodeRender()
  const {notifyMap} = useEnv()
  // const nodeData = data as DataSlotNodeData
  useEffect(() => {
    let notifyId: null | string = null
    // console.log('data-slot formMeta')
    const websocketServiceDispose = websocketService.onNodeMessage((message) => {
      if (message.nodeId != node.id) {
        return
      }
      if (message.type === WSMessageType.AssetMessage) {
        // message
        const assetNode = ctx.document.getNode(message.nodeId)
        if (!assetNode) {
          return
        }
        const assetForm = getNodeForm(assetNode)
        const inputSlot = assetForm?.getValueIn('inputSlot')
        console.log('inputSlot', inputSlot)
        for (const key in inputSlot) {
          if (inputSlot[key].id == message.payload.assetsId) {
            inputSlot[key].status = message.payload.status
            assetForm?.setValueIn('inputSlot', inputSlot)
          }
        }
      }
      if (message.type === WSMessageType.RunToolMessage) {
        console.log('RunToolMessage', message.payload)
        const notifyKey = getNotifyKey(message.payload.assetsId[0], message.payload.toolId)
        if (notifyMap.has(notifyKey)) {
          notifyId = notifyMap.get(notifyKey) as string
          if (message.payload.status === 'success') {
            Notification.success({
              content: (
                <span>
                  启动完成！<a onClick={() => {
                  window.open(message.payload.url, '_blank', 'noopener,noreferrer')
                }}>点击运行</a>
                </span>
              ),
              id: notifyId,
              duration: 0
            })
          } else {
            Notification.error({
              content: '运行失败',
              id: notifyId,
            })
          }
        }
      }
    })
    return () => {
      websocketServiceDispose.dispose()
      if (notifyId) {
        Notification.close(notifyId)
        notifyId = null
      }
    }
  }, []);
  if (isSidebar) {
    return (
      <>
        <FormHeader primaryColor='#ECFBE5'/>
        <SidebarRender/>
      </>
    );
  }
  return (
    <>
      <FormHeader primaryColor='#ECFBE5'/>
      <NodeRender/>
    </>
  );
};

export const formMeta: FormMeta<FlowNodeJSON> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({value}: { value: string }) =>
      value ? undefined : "Title is required",
  },
  effect: {
    title: syncVariableTitle,
    outputs: provideJsonSchemaOutputs,
    inputs: [{
      event: DataEvent.onValueInitOrChange,
      effect: ({value, form}: EffectFuncProps<IJsonSchema, FormData>) => {
        // console.log('a.b value onValueInitOrChange:', value);
        form.setValueIn('outputs', {...value})
      },
    }],
    inputSlot: [{
      event: DataEvent.onValueInitOrChange,
      effect: ({value, form}: EffectFuncProps<IODataSlot, FormData>) => {
        // console.log('a.b value onValueInitOrChange:', value);
        form.setValueIn('outputSlot', {...value})
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

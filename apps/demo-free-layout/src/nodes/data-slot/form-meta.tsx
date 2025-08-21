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
import { createInferInputsPlugin, IJsonSchema, provideJsonSchemaOutputs, syncVariableTitle, } from "@flowgram.ai/form-materials";

import { FlowNodeJSON, WSMessageType } from "../../typings";
import { FormHeader } from "../../form-components";
import { useIsSidebar } from "../../hooks";
import { SidebarRender } from "./side-render";
import { NodeRender } from "./node-render";
import { useEffect } from "react";
import { WebSocketService } from "../../services";


export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON>) => {
  const isSidebar = useIsSidebar();
  const websocketService = useService(WebSocketService)
  const ctx = useClientContext()
  const { node } = useNodeRender()
  // const nodeData = data as DataSlotNodeData
  useEffect(() => {
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
        for (const key in inputSlot) {
          if (inputSlot[key].id == message.payload.assetsId) {

          }
        }
      }
    })
    return () => {
      websocketServiceDispose.dispose()
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
  },
  plugins: [
    createInferInputsPlugin({
      sourceKey: "inputsValues",
      targetKey: "inputs",
    }),
  ],
};

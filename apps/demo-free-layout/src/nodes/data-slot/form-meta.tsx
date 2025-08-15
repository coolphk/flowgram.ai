/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  FormMeta,
  FormRenderProps,
  useNodeRender,
  useService,
  ValidateTrigger,
} from "@flowgram.ai/free-layout-editor";
import {createInferInputsPlugin, provideJsonSchemaOutputs, syncVariableTitle,} from "@flowgram.ai/form-materials";

import {FlowNodeJSON} from "../../typings";
import {FormHeader} from "../../form-components";
import {useIsSidebar} from "../../hooks";
import {SidebarRender} from "./side-render";
import {NodeRender} from "./node-render";
import {useEffect} from "react";
import {WebSocketService} from "../../services";


export const renderForm = ({form}: FormRenderProps<FlowNodeJSON>) => {
  const isSidebar = useIsSidebar();
  const websocketService = useService(WebSocketService)
  const {node} = useNodeRender()
  useEffect(() => {
    // console.log('data-slot formMeta')
    const websocketServiceDispose = websocketService.onNodeMessage((message) => {
      if (message.nodeId != node.id) {
        return
      }

    })
    return () => {
      websocketServiceDispose.dispose()
    }
  }, []);
  if (isSidebar) {
    return (
      <>
        <FormHeader/>
        <SidebarRender/>
      </>
    );
  }
  return (
    <>
      <FormHeader/>
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
  },
  plugins: [
    createInferInputsPlugin({
      sourceKey: "inputsValues",
      targetKey: "inputs",
    }),
  ],
};

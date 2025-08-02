/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  FormMeta,
  FormRenderProps,
  ValidateTrigger,
} from "@flowgram.ai/free-layout-editor";
import {
  provideJsonSchemaOutputs,
  syncVariableTitle,
} from "@flowgram.ai/form-materials";

import { FlowNodeJSON } from "../../typings";
import { useIsSidebar } from "../../hooks";
import { FormContent, FormHeader } from "../../form-components";
import { SidebarRender } from "./sidebar-render";
import { WorkflowHeader } from "./node-render/header";
// import {WFTemplateRender} from './node-render/template';

export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON>) => {
  const isSidebar = useIsSidebar();

  if (isSidebar) {
    return (
      <>
        <SidebarRender />
      </>
    );
  }
  return (
    <>
      <FormHeader primaryColor="var(--coz-mg-color-blue)">
        <WorkflowHeader />
      </FormHeader>
      <FormContent>
        {/*<FormOutputs name="inputs" label="输入"/>*/}
        {/*<FormOutputs label="输出"/>*/}
        {/*<WFTemplateRender/>*/}
      </FormContent>
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
  },
};

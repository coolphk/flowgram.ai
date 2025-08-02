/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */



import { FormMeta, FormRenderProps, ValidateTrigger } from '@flowgram.ai/free-layout-editor';
import { provideJsonSchemaOutputs, syncVariableTitle } from '@flowgram.ai/form-materials';

import { FlowNodeJSON } from '../../typings';
import { FormHeader } from '../../form-components';
import { useIsSidebar } from "../../hooks";
import { SidebarRender } from './side-render';
import { NodeRender } from './node-render';

export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON>) => {
  const isSidebar = useIsSidebar();

  if (isSidebar) {
    return (
      <>
        <FormHeader />
        <SidebarRender />
      </>
    );
  }
  return (
    <>
      <FormHeader />
      <NodeRender />
    </>
  );
};

export const formMeta: FormMeta<FlowNodeJSON> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) => (value ? undefined : 'Title is required'),
  },
  effect: {
    title: syncVariableTitle,
    outputs: provideJsonSchemaOutputs,
  },
};

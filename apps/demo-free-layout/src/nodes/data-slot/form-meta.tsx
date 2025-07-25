/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FormMeta, FormRenderProps, ValidateTrigger } from '@flowgram.ai/free-layout-editor';
import { provideJsonSchemaOutputs, syncVariableTitle } from '@flowgram.ai/form-materials';

import { FlowNodeJSON } from '../../typings';
import { FormContent, FormHeader, FormOutputs, FormSources } from '../../form-components';

export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON>) => (
  <>
    <FormHeader primaryColor="var(--coz-mg-hglt-secondary-green)" />
    <FormContent>
      <FormSources />
      <FormOutputs />
    </FormContent>
  </>
);
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

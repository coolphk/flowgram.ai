/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FC } from 'react';

import { Field, useNodeRender } from '@flowgram.ai/free-layout-editor';
import { TagGroup } from '@douyinfe/semi-ui';

import { TypeTag } from '../type-tag';
import { FormOutputsContainer } from '../form-outputs/styles';
import { JsonSchema } from '../../typings';
import { useIsSidebar, useTagLength } from '../../hooks';
import { FormSourcesContainer, LabelContainer } from './styles';

interface FormSourcesProps {
  name?: string;
}

export const FormSources: FC<FormSourcesProps> = ({ name = 'inputs' }) => {
  const { data: nodeData } = useNodeRender();
  const emptyContent: string[] = [];
  if (nodeData?.inputsValues) {
    Object.keys(nodeData.inputsValues).forEach((key) => {
      if (!nodeData.inputsValues[key]?.content) {
        emptyContent.push(key);
      }
    });
  }

  const isSidebar = useIsSidebar();
  if (isSidebar) {
    return null;
  }
  return (
    <Field<JsonSchema> name={name}>
      {({ field }) => {
        const properties = field.value?.properties;
        if (properties) {
          const content = Object.keys(properties).map((key) => {
            const property = properties[key];
            return <TypeTag key={key} name={key} type={property.type as string} />;
          });
          return (
            <FormOutputsContainer>
              <LabelContainer>{name === 'outputs' ? '输出:' : '输入:'}</LabelContainer>
              {content}
            </FormOutputsContainer>
          );
        }
        return <></>;
      }}
    </Field>
  );
};

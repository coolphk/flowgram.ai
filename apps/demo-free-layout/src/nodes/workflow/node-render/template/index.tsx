/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable prettier/prettier */
import React from 'react';

import {Field, FieldRenderProps} from '@flowgram.ai/free-layout-editor';
import {TagGroup} from '@douyinfe/semi-ui';

import {
  FormOutputsContainer,
  LabelContainer,
} from '../../../../form-components/form-outputs/styles';
import {TypeTag} from '../../../../form-components';

export const WFTemplateRender: React.FC = () => (
  <div>
    <FormOutputsContainer>
      <LabelContainer>模版:</LabelContainer>
      <Field
        name="rawData.name"
        render={({field: {value, onChange}}: FieldRenderProps<string>) => (
          <>
            {value && <TypeTag key={1} name={value} type={'string'}/>}
          </>
        )}
      />
    </FormOutputsContainer>
  </div>
);

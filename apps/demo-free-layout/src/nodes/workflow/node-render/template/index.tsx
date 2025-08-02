/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable prettier/prettier */
import React from "react";

import {Field, FieldRenderProps} from "@flowgram.ai/free-layout-editor";
import {Tag} from "@douyinfe/semi-ui";

export const WFTemplateRender: React.FC = () => (
  <div style={{display:"flex", alignItems:"baseline"}}>
      <Tag>模版:</Tag>
      <Field
        name="rawData.name"
        render={({ field: { value } }: FieldRenderProps<string>) => (
          <span style={{marginLeft:8}}>{value}</span>
        )}
      />
  </div>
);

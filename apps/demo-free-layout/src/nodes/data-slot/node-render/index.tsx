/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from "react";
import {DisplayInputsValues, DisplayOutputs, IFlowValue} from "@flowgram.ai/form-materials";

import {FormContent} from "../../../form-components";
import {Field, useForm} from "@flowgram.ai/free-layout-editor";
// import { Tag } from "@douyinfe/semi-ui";

// console.log('currentNodeForm', currentNodeForm)
export const NodeRender: React.FC = () => {
  const currentNodeForm = useForm()
  console.log('currentNodeForm', currentNodeForm)
  return (
    <FormContent>
      {currentNodeForm.getValueIn('from') === 'outputs' &&
        <div style={{ display: "flex", gap: "8px" }}>
          {/* <Tag>输入：</Tag>  */}
          <Field<
            Record<string, IFlowValue | undefined> | undefined
          > name="inputsValues">
            {({ field: { value } }) => (
              <div style={{ cursor: 'pointer' }} onClick={(event) => {
                event.stopPropagation()
                console.log(value)

              }}>
                <DisplayInputsValues value={value} />
              </div>
            )}
          </Field>
        </div>
      }
      {
        currentNodeForm.getValueIn('from') === 'inputs' &&
        <div style={{ display: "flex", gap: "8px" }}>
          {/* <Tag>
          输出：
        </Tag> */}
          <DisplayOutputs displayFromScope />
        </div>
      }
    </FormContent>
  );
};

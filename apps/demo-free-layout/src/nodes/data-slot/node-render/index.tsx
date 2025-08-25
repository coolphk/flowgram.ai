/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useContext } from "react";
import { DisplayInputsValues, DisplayOutputs, IFlowValue } from "@flowgram.ai/form-materials";

import { FormContent } from "../../../form-components";
import { Field, useClientContext, useForm } from "@flowgram.ai/free-layout-editor";
import { LineageResponse, Workflow } from "../../../typings";
import { getLineage } from "../../../api/common";
// import { Tag } from "@douyinfe/semi-ui";

// console.log('currentNodeForm', currentNodeForm)
export const NodeRender: React.FC = () => {
  const currentNodeForm = useForm()
  const ctx = useClientContext()
  console.log('currentNodeForm', currentNodeForm)
  const onTagClick = (event: React.MouseEvent, title: string | JSX.Element | undefined, value: IFlowValue | undefined) => {
    event.stopPropagation()
    console.log('onTagClick', title, value)
    const from = currentNodeForm.getValueIn('from')
    const rawData = currentNodeForm.getValueIn('rawData')
    console.log('rawData', rawData[from].find((item: Workflow) => item.name === title))
    const asset_id = rawData[from].find((item: Workflow) => item.name === title)?.id
    getLineage(asset_id).then((res) => {
      res.assets.map((item) => {

      })
      console.log('getLineage', res)
    })

  }
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
                console.log('data-slot-input', value)
                // getLineage(value?.id).then(res => {
                //   console.log('getLineage', res)
                //   setLineage(res)
                // })

              }}>
                <DisplayInputsValues value={value} onTagClick={onTagClick} />
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

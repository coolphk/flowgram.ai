/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from "react";
import { useRequest } from "alova/client";
import {
  Field,
  FieldRenderProps,
  getNodeForm,
  useNodeRender,
  WorkflowNodeLinesData,
} from "@flowgram.ai/free-layout-editor";
import { Collapse, Divider, Select } from "@douyinfe/semi-ui";

import { FlowNodeJSON, JsonSchema, ValidationsDataSlot, Workflow } from "../../../typings";
import { JsonSchemaEditor } from "@flowgram.ai/form-materials";
import { FormHeader, FormInputs } from "../../../form-components";
import { getWorkflows } from "../../../api/workflow";
import { WorkflowNodeType } from "../../constants";

export const SidebarRender: React.FC = () => {
  const { data: nodeData, form, node } = useNodeRender();
  const preNode = node?.getData(WorkflowNodeLinesData).inputNodes[0]
  const preNodeForm = getNodeForm?.(preNode)
  const preNodeRawDataOutputs: ValidationsDataSlot[] = preNodeForm?.getValueIn("rawData")?.outputs || []
  const preDataSlotId = form?.getValueIn("preDataSlotId") || ""
  //如果前一个节点是数据插槽，并且是outputs
  const preNodeIsDataSlotOutputs = useMemo(() => {
    if (preNode) {
      const isDataSlot = preNode.flowNodeType === WorkflowNodeType.DataSlot
      const nodeForm = getNodeForm?.(preNode)
      const isOutputs = nodeForm?.getValueIn("from") === 'outputs'
      return isDataSlot && isOutputs
    }
    return false
  }, [preNode])

  const [wfId, setWfId] = useState<string>(nodeData?.rawData?.id || "");
  // const [dataSlotId, setDataSlotId] = useState<string>(preNodeRawDataOutputs?.[0].id || "")

  const {
    data,
    error,
    send
  } = useRequest(preDataSlotId ? getWorkflows<Workflow[]>(preDataSlotId) : getWorkflows<Workflow[]>, {
    initialData: [],
    immediate: true,
  });

  // 当 dataSlotId 变化时，使用 refresh 方法重新请求
  useEffect(() => {
    if (preNodeIsDataSlotOutputs && preDataSlotId) {
      // 使用新的 dataSlotId 重新请求
      send(preDataSlotId);
    }
  }, [preDataSlotId]);

  const validationSlots = useMemo<ValidationsDataSlot[]>(() => {
    if (preNodeIsDataSlotOutputs && preNodeRawDataOutputs) {
      return preNodeRawDataOutputs.map((item: ValidationsDataSlot) => item)
    }
    return []
  }, [preNodeIsDataSlotOutputs, preNodeRawDataOutputs])
  // console.log(111, nodeData.rawData.id)
  const workflow = useMemo(() => {
    return data.find((item: Workflow) => item.id === wfId);
  }, [wfId, data]);
  // console.log('wfId1', wfId);
  // 使用 useMemo 优化 flowNodeJSON 计算
  const flowNodeJSON = useMemo(() => {
    const base: FlowNodeJSON = {
      id: nodeData?.id,
      data: {
        title: "Workflow",
        inputs: {
          type: "object",
          properties: {},
        },
        outputs: {
          type: "object",
          properties: {},
        },
        inputsValues: {},
        outputsValues: {},
        rawData: workflow,
      },
      type: nodeData.type,
    };

    if (workflow) {
      workflow.inputs.forEach((item, index) => {
        base.data.inputsValues![item.name] = nodeData?.inputsValues?.[
          item.name
        ] || {
          type: "constant",
          content: "",
        };
        base.data.inputs!.properties![item.name] = {
          type: "file",
          extra: {
            index
          }
        };
      });
      /*{
          "type": "object",
          "properties": {
              "POSCAR": {
                  "type": "array",
                  "extra": {
                      "index": 1
                  },
                  "items": {
                      "type": "file"
                  }
              }
          },
          "required": []
      }*/
      workflow.outputs.forEach((item) => {
        /*base.data.outputsValues![item.name] = nodeData?.outputsValues?.[
          item.name
        ] || {
          type: "constant",
          content: "",
        };*/
        base.data.outputs!.properties![item.name] = {
          type: "file",
        };
      });
    }

    return base;
  }, [wfId]);

  // 当 flowNodeJSON 变化时更新节点数据
  useEffect(() => {
    if (workflow) {
      const data = {
        ...nodeData,
        ...flowNodeJSON.data,
      };

      Object.keys(data!).forEach((key) => {
        form?.setValueIn(key, data[key]);
      });
    }
  }, [flowNodeJSON]);

  if (error) {
    return <div>加载工作流失败</div>;
  }

  return (
    <>
      <FormHeader />
      <Divider />
      <Collapse defaultActiveKey={["1", "2", "3"]}>
        <Collapse.Panel header="工作流" itemKey="1">
          <>
            {preNodeIsDataSlotOutputs && (
              <Field<string> name="preDataSlotId">
                {({ field: { value, onChange } }: FieldRenderProps<string>) => (
                  <Select
                    style={{ width: "100%", marginBottom: '8px' }}
                    placeholder="请选择数据插槽"
                    value={value} // 绑定 value 到 preDataSlotId 状态
                    onChange={(value) => {
                      console.log(222, value)
                      // setDataSlotId(value as string);
                      onChange(value as string)
                    }}
                  >
                    {validationSlots.map((vs) => (
                      <Select.Option key={vs.id} value={vs.id}>
                        {vs.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}

              </Field>
            )}
            <Select
              style={{ width: "100%" }}
              placeholder="请选择工作流"
              value={wfId} // 绑定 value 到 wfId 状态
              onChange={(value) => {
                setWfId(value as string);
              }}
            >
              {data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </>
        </Collapse.Panel>
        <Collapse.Panel header="输入参数" itemKey="2">
          <FormInputs />
        </Collapse.Panel>
        <Collapse.Panel header="输出参数" itemKey="3">
          <Field
            name="outputs"
            render={({
              field: { value, onChange },
            }: FieldRenderProps<JsonSchema>) => (
              <>
                <JsonSchemaEditor
                  value={value}
                  onChange={(value) => onChange(value as JsonSchema)}
                />
              </>
            )}
          />
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

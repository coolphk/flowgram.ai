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
  useNodeRender,
} from "@flowgram.ai/free-layout-editor";
import { Collapse, Divider, Select } from "@douyinfe/semi-ui";

import { FlowNodeJSON, JsonSchema, Workflow } from "../../../typings";
import { JsonSchemaEditor } from "@flowgram.ai/form-materials";
import { FormHeader, FormInputs } from "../../../form-components";
import { getWorkflows } from "../../../api/workflow";

export const SidebarRender: React.FC = () => {
  const { data, error } = useRequest(getWorkflows<Workflow[]>, {
    initialData: [],
    immediate: true,
  });
  const { data: nodeData, form } = useNodeRender();

  const [wfId, setWfId] = useState<string>(nodeData?.rawData?.id || "");
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
      workflow.inputs.forEach((item) => {
        base.data.inputsValues![item.name] = nodeData?.inputsValues?.[
          item.name
        ] || {
          type: "constant",
          content: "",
        };
        base.data.inputs!.properties![item.name] = {
          type: "file",
        };
      });

      workflow.outputs.forEach((item) => {
        base.data.outputsValues![item.name] = nodeData?.outputsValues?.[
          item.name
        ] || {
          type: "constant",
          content: "",
        };
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
          <Field
            name="workflow"
            render={({ field: { onChange } }: FieldRenderProps<string>) => (
              <>
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
            )}
          />
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

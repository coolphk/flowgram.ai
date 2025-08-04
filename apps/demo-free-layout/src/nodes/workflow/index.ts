/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {nanoid} from "nanoid";

import {formMeta} from "./form-meta";
import {WorkflowNodeType} from "../constants";
import {FlowNodeRegistry} from "../../typings";
import IconWorkflow from "../../assets/icon-workflow.svg";
import {alovaInstance} from "../../api";
import {getNodeForm} from "@flowgram.ai/free-layout-editor";
import {getUniqueId} from "../../api/common";

export const WorkflowNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Workflow,
  info: {
    icon: IconWorkflow,
    description: "工作流",
  },
  meta: {
    nodePanelVisible: true,
    defaultPorts: [{type: "input"}, {type: "output"}],
    expandable: true,
    runnable: true,
  },
  formMeta,
  onAdd() {
    return {
      id: `workflow-${nanoid(5)}`,
      type: "workflow",
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
      },
    };
  },
  onCreate(node, json) {
    console.log("onCreate workflow node", node, json);
    // 节点创建后异步获取真正的ID并更新
    getUniqueId<string>()
      .send(true)
      .then((response) => {
        const uniqueId = response;
        // 更新节点的扩展信息，添加服务器ID
        const form = getNodeForm(node);
        if (form) {
          form.updateFormValues({
            ...form.values,
            serverId: uniqueId,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to get unique ID for workflow node:", error);
      });
  },
};

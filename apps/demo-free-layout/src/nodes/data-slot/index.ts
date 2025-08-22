/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {FlowNodeRegistry} from "../../typings";
import iconDataSlot from "../../assets/icon-data-slot.svg";
import {formMeta} from "./form-meta";
import {WorkflowNodeType} from "../constants";
import {nanoid} from "nanoid";
import {getNodeForm} from "@flowgram.ai/free-layout-editor";
import {Toast} from "@douyinfe/semi-ui";
import {getUniqueId} from "../../api/common";

export const DataSlotNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.DataSlot,
  meta: {
    defaultPorts: [
      {
        type: "input",
      },
      {
        type: "output",
      },
    ],
    size: {
      width: 360,
      height: 211,
    },
  },
  info: {
    icon: iconDataSlot,
    description: "Data slot for storing and managing data.",
  },
  formMeta,
  onAdd(ctx) {
    console.log('on data-slot add', ctx)
    return {
      id: `data-slot_${nanoid(5)}`,
      type: "data-slot",
      data: {
        title: `data-slot`,
      },
    };
  },
  onCreate(node, json) {
    // console.log("onCreate", node, json);
    // 节点创建后异步获取真正的ID并更新
    getUniqueId()
      .then((response) => {
        const uniqueId = response;
        // 更新节点ID
        const form = getNodeForm(node);
        if (form) {
          form.updateFormValues({
            ...form.values,
            serverId: uniqueId,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to get unique ID for data-slot node:", error);
        Toast.error('无法获取data-slot节点ID,节点创建失败')
        node.dispose()
      });
  },
};

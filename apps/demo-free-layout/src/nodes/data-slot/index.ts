/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { nanoid } from "nanoid";

import { formMeta } from "./form-meta";
import { WorkflowNodeType } from "../constants";
import { FlowNodeRegistry } from "../../typings";
import IconDataSlot from "../../assets/icon-data-slot.svg";

export const DataSlotNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.DataSlot,
  info: {
    icon: IconDataSlot,
    description: "数据插槽",
  },
  meta: {
    nodePanelVisible: true,
    defaultPorts: [{ type: "input" }, { type: "output" }],
    expandable: true,
  },
  formMeta,
  onAdd() {
    return {
      id: `data-slot${nanoid(5)}`,
      type: "data-slot",
      data: {
        title: "DataSlot",
      },
    };
  },
};

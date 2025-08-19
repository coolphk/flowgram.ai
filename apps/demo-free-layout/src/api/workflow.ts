/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {alovaInstance} from "./index";
import {RunWorkFlowRequest} from "../typings";

export const getWorkflows = <T>(dataSlotId?: string) =>
  alovaInstance.Get<T>("/workflow", {
    params: {
      id: dataSlotId,
    },
    cacheFor: 0
  });
export const runWorkFlow = (params: RunWorkFlowRequest) =>
  alovaInstance.Post<{ dtInstanceId: string }>(`/workflow/run`, params);

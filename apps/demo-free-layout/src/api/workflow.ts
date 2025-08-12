/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {alovaInstance} from "./index";
import {RunWorkFlowRequest} from "../typings";

export const getWorkflows = <T>() =>
  alovaInstance.Get<T>("/workflow", {
    cacheFor: 0
  });
export const runWorkFlow = (params: RunWorkFlowRequest) =>
  alovaInstance.Post<{ dtInstanceId: string }>(`/workflow/run`, params);

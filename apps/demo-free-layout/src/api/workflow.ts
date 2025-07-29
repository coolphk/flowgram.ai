/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { alovaInstance } from "./index";

export const getWorkflows = <T>() =>
  alovaInstance.Get<T>("/workflow", {
    cacheFor: {
      mode: "memory",

      // 单位为毫秒
      // 当设置为`Infinity`，表示数据永不过期，设置为0或负数时表示不缓存
      expire: 60 * 10 * 1000,
    },
  });

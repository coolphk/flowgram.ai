/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { alovaInstance } from "./index";

export const getUniqueId = <T>() =>
  alovaInstance.Get<T>("/id", {
    cacheFor: 0,
    shareRequest: false,
  });

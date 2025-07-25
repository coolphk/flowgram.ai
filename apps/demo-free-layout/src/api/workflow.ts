/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */



import { alovaInstance } from './index';

export const getWorkflows = <T>() =>
  alovaInstance.Get<T>('/workflow', {
    cacheFor: 0,
  });

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

// 环境常量定义
export const ENV = {
  DEV: 'dev',
  PROD: 'prod'
} as const;

export type EnvType = typeof ENV[keyof typeof ENV];
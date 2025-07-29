/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */



import { CSSProperties } from 'react';
import { NodeReport } from '@flowgram.ai/runtime-interface';

export interface RunHistoryPluginOptions {
  /**
   * 是否禁用layer
   */
  disableLayer?: boolean;
  /**
   * 面板样式
   */
  panelStyles?: CSSProperties;
  /**
   * 容器样式
   */
  containerStyles?: CSSProperties;
}

export interface RunHistoryRecord {
  /**
   * 运行记录ID
   */
  id: string;
  /**
   * 运行开始时间
   */
  startTime: number;
  /**
   * 运行结束时间
   */
  endTime?: number;
  /**
   * 节点报告记录
   */
  nodeReports: Record<string, NodeReport>;
  /**
   * 运行状态
   */
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  /**
   * 输入参数
   */
  inputs?: Record<string, any>;
  /**
   * 输出结果
   */
  outputs?: Record<string, any>;
  /**
   * 错误信息
   */
  errors?: string[];
}
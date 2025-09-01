/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * 工作流状态枚举
 */
export enum WorkflowStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

/**
 * 状态颜色配置
 */
export const WorkflowStatusColors: Record<WorkflowStatus, string> = {
  [WorkflowStatus.PENDING]: '#FFA500',     // 橙色 - 等待中
  [WorkflowStatus.RUNNING]: '#00BFFF',     // 深天蓝 - 运行中
  [WorkflowStatus.SUCCESS]: '#32CD32',     // 酸橙绿 - 成功
  [WorkflowStatus.FAILED]: '#FF4500',      // 橙红色 - 失败
  [WorkflowStatus.CANCELLED]: '#808080'    // 灰色 - 已取消
};

/**
 * 动画配置参数
 */
export interface AnimationParams {
  duration: number;        // 动画持续时间(ms)
  borderWidth: number;     // 边框宽度(px)
  scale: number;          // 缩放效果
  curve: string;          // 动画曲线
}

/**
 * 默认动画配置
 */
export const DefaultAnimationParams: AnimationParams = {
  duration: 2000,          // 2秒动画
  borderWidth: 2,          // 2px边框
  scale: 1.02,            // 轻微缩放
  curve: 'ease-in-out'     // 缓动曲线
};

/**
 * 根据状态获取颜色
 * @param status 工作流状态
 * @returns 对应的颜色值
 */
export function getStatusColor(status: WorkflowStatus): string {
  return WorkflowStatusColors[status] || WorkflowStatusColors[WorkflowStatus.PENDING];
}

/**
 * 检查状态是否为活跃状态（需要动画）
 * @param status 工作流状态
 * @returns 是否为活跃状态
 */
export function isActiveStatus(status: WorkflowStatus): boolean {
  return status === WorkflowStatus.RUNNING || status === WorkflowStatus.PENDING;
}
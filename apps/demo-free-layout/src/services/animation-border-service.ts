/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable } from '@flowgram.ai/free-layout-editor';
import { Emitter, Disposable } from '@flowgram.ai/free-layout-editor';

/**
 * 导入WorkflowStatus代替TaskStatus
 */
import { WorkflowStatus } from '../typings/workflow';

/**
 * 动画配置接口
 */
export interface AnimationConfig {
  duration: number;        // 动画时长(ms)
  color: string;          // 边框颜色
  width: number;          // 边框宽度(px)
  curve: string;          // 动画曲线
  enabled: boolean;       // 是否启用
}

/**
 * 动画状态接口
 */
export interface AnimationState {
  isActive: boolean;
  config: AnimationConfig;
  startTime: number;
}

/**
 * 状态颜色映射，使用WorkflowStatus
 * 调整颜色让各种状态区分更明显
 */
const StatusColors: Record<WorkflowStatus, string> = {
  [WorkflowStatus.Pending]: '#FF8C00',    // 深橙色 - 等待中（更鲜艳的橙色）
  [WorkflowStatus.Running]: '#00CED1',    // 深绿松石色 - 运行中（更鲜艳的青色）
  [WorkflowStatus.Completed]: '#32CD32',  // 酸橙绿 - 成功（保持绿色）
  [WorkflowStatus.Failed]: '#DC143C',     // 深红色 - 失败（更鲜艳的红色）
  [WorkflowStatus.Canceled]: '#696969'    // 暗灰色 - 已取消（更深的灰色）
};

/**
 * 动画边框服务
 * 提供统一的动画控制和状态管理能力
 */
@injectable()
export class AnimationBorderService {
  private animationStates = new Map<string, AnimationState>();
  private stateChangeEmitter = new Emitter<{ nodeId: string; state: AnimationState | null }>();

  /**
   * 监听动画状态变化事件
   */
  public onStateChange = this.stateChangeEmitter.event;

  /**
   * 启动指定节点的动画
   * @param nodeId 节点ID
   * @param config 动画配置，可选
   */
  public startAnimation(nodeId: string, config?: Partial<AnimationConfig>): void {
    const animationConfig = this.createAnimationConfig(config);
    const animationState: AnimationState = {
      isActive: true,
      config: animationConfig,
      startTime: Date.now()
    };

    this.animationStates.set(nodeId, animationState);
    this.stateChangeEmitter.fire({ nodeId, state: animationState });
  }

  /**
   * 停止指定节点的动画
   * @param nodeId 节点ID
   */
  public stopAnimation(nodeId: string): void {
    this.animationStates.delete(nodeId);
    this.stateChangeEmitter.fire({ nodeId, state: null });
  }

  /**
   * 根据节点类型批量启动动画
   * @param nodeType 节点类型
   * @param config 动画配置，可选
   */
  public startAnimationByType(nodeType: string, config?: Partial<AnimationConfig>): void {
    // 这里可以扩展为通过文档获取相同类型的所有节点
    console.log(`Starting animation for node type: ${nodeType}`);
  }

  /**
   * 获取指定节点的动画状态
   * @param nodeId 节点ID
   * @returns 动画状态或null
   */
  public getAnimationState(nodeId: string): AnimationState | null {
    return this.animationStates.get(nodeId) || null;
  }

  /**
   * 根据工作流状态更新动画颜色
   * @param nodeId 节点ID
   * @param status 工作流状态
   */
  public updateStatusColor(nodeId: string, status: WorkflowStatus): void {
    const existingState = this.animationStates.get(nodeId);
    if (existingState) {
      const updatedConfig = {
        ...existingState.config,
        color: this.getStatusColor(status)
      };
      const updatedState: AnimationState = {
        ...existingState,
        config: updatedConfig
      };
      
      this.animationStates.set(nodeId, updatedState);
      this.stateChangeEmitter.fire({ nodeId, state: updatedState });
    }
  }

  /**
   * 创建默认动画配置
   * @param config 部分配置，用于覆盖默认值
   * @returns 完整的动画配置
   */
  private createAnimationConfig(config?: Partial<AnimationConfig>): AnimationConfig {
    return {
      duration: 1000,                    // 默认1秒（提高呼吸频率）
      color: '#00CED1',                  // 默认深绿松石色
      width: 2,                          // 默认2px边框
      curve: 'easeInOut',                // 使用motion库支持的缓动函数
      enabled: true,                     // 默认启用
      ...config
    };
  }

  /**
   * 根据状态获取对应颜色
   * @param status 工作流状态
   * @returns 颜色值
   */
  private getStatusColor(status: WorkflowStatus): string {
    return StatusColors[status] || StatusColors[WorkflowStatus.Pending];
  }

  /**
   * 清理资源
   */
  public dispose(): void {
    this.animationStates.clear();
    this.stateChangeEmitter.dispose();
  }
}
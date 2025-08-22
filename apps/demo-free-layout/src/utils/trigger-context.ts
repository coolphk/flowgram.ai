/**
 * 触发源上下文工具类
 * 基于FlowGram.AI的事件系统设计
 */

import { WorkflowNodeEntity } from '@flowgram.ai/free-layout-editor';

export interface TriggerContext {
  type: 'contextmenu' | 'line-button' | 'drag-end' | 'api-call';
  sourceNode?: WorkflowNodeEntity;
  sourcePosition?: { x: number; y: number };
  sourceEvent?: MouseEvent | React.MouseEvent;
  metadata?: {
    fromPortId?: string;
    toPortId?: string;
    lineId?: string;
    contextMenuType?: 'canvas' | 'node';
    [key: string]: any;
  };
}

export class TriggerContextUtils {
  /**
   * 创建右键菜单触发上下文
   */
  static createContextMenuTrigger(
    sourceNode: WorkflowNodeEntity | undefined,
    position: { x: number; y: number },
    event?: MouseEvent
  ): TriggerContext {
    return {
      type: 'contextmenu',
      sourceNode,
      sourcePosition: position,
      sourceEvent: event,
      metadata: {
        contextMenuType: sourceNode ? 'node' : 'canvas',
        timestamp: Date.now()
      }
    };
  }

  /**
   * 创建连接线按钮触发上下文
   */
  static createLineButtonTrigger(
    sourceNode: WorkflowNodeEntity,
    position: { x: number; y: number },
    lineId: string,
    fromPortId: string,
    toPortId: string
  ): TriggerContext {
    return {
      type: 'line-button',
      sourceNode,
      sourcePosition: position,
      metadata: {
        lineId,
        fromPortId,
        toPortId,
        timestamp: Date.now()
      }
    };
  }

  /**
   * 创建拖拽结束触发上下文
   */
  static createDragEndTrigger(
    position: { x: number; y: number },
    fromPortId?: string,
    sourceNode?: WorkflowNodeEntity
  ): TriggerContext {
    return {
      type: 'drag-end',
      sourceNode,
      sourcePosition: position,
      metadata: {
        fromPortId,
        timestamp: Date.now()
      }
    };
  }

  /**
   * 创建API调用触发上下文
   */
  static createApiCallTrigger(
    position?: { x: number; y: number },
    metadata?: Record<string, any>
  ): TriggerContext {
    return {
      type: 'api-call',
      sourcePosition: position,
      metadata: {
        ...metadata,
        timestamp: Date.now()
      }
    };
  }

  /**
   * 判断触发源类型
   */
  static isContextMenu(context?: TriggerContext): boolean {
    return context?.type === 'contextmenu';
  }

  static isLineButton(context?: TriggerContext): boolean {
    return context?.type === 'line-button';
  }

  static isDragEnd(context?: TriggerContext): boolean {
    return context?.type === 'drag-end';
  }

  static isApiCall(context?: TriggerContext): boolean {
    return context?.type === 'api-call';
  }

  /**
   * 获取触发源的描述信息
   */
  static getDescription(context?: TriggerContext): string {
    if (!context) return '未知触发源';

    switch (context.type) {
      case 'contextmenu':
        return `右键菜单触发 (${context.metadata?.contextMenuType === 'node' ? '节点' : '画布'})`;
      case 'line-button':
        return `连接线按钮触发 (线条: ${context.metadata?.lineId})`;
      case 'drag-end':
        return '拖拽线条结束触发';
      case 'api-call':
        return 'API调用触发';
      default:
        return '未知触发源';
    }
  }
}

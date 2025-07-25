/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */





import { SelectBoxPluginOptions } from '@flowgram.ai/select-box-plugin';
import { HistoryService } from '@flowgram.ai/history';
import {
  LineColor,
  LineRenderType,
  onDragLineEndParams,
  WorkflowContentChangeEvent,
  WorkflowDocument,
  WorkflowJSON,
  WorkflowLineEntity,
  WorkflowLinePortInfo,
  type WorkflowLinesManager,
  WorkflowNodeEntity,
  WorkflowNodeRegistry,
  WorkflowPortEntity,
} from '@flowgram.ai/free-layout-core';
import {
  ClipboardService,
  EditorPluginContext,
  EditorProps,
  SelectionService,
  PluginContext,
  FlowNodeType,
} from '@flowgram.ai/editor';

import { AutoLayoutResetFn, AutoLayoutToolOptions } from '../tools';

export const FreeLayoutPluginContext = PluginContext;

export interface FreeLayoutPluginTools {
  autoLayout: (options?: AutoLayoutToolOptions) => Promise<AutoLayoutResetFn>;
}

export interface FreeLayoutPluginContext extends EditorPluginContext {
  /**
   * 文档
   */
  document: WorkflowDocument;
  clipboard: ClipboardService;
  selection: SelectionService;
  history: HistoryService;
  tools: FreeLayoutPluginTools;
}

/**
 * 自由布局配置
 */
export interface FreeLayoutProps extends EditorProps<FreeLayoutPluginContext, WorkflowJSON> {
  selectBox?: SelectBoxPluginOptions;
  /**
   * 节点定义
   */
  nodeRegistries?: WorkflowNodeRegistry[];
  /**
   * 默认是否展开所有节点
   */
  allNodesDefaultExpanded?: boolean;
  /*
   * 光标图片
   */
  cursors?: {
    grab?: string;
    grabbing?: string;
  };
  /**
   * 线条颜色
   */
  lineColor?: LineColor;
  /**
   * 画布内容更新
   */
  onContentChange?: (ctx: FreeLayoutPluginContext, event: WorkflowContentChangeEvent) => void;
  /**
   * 判断线条是否标红
   * @param ctx
   * @param fromPort
   * @param toPort
   * @param lines
   */
  isErrorLine?: (
    ctx: FreeLayoutPluginContext,
    fromPort: WorkflowPortEntity,
    toPort: WorkflowPortEntity | undefined,
    lines: WorkflowLinesManager
  ) => boolean;
  /**
   * 判断端口是否标红
   * @param ctx
   * @param port
   */
  isErrorPort?: (ctx: FreeLayoutPluginContext, port: WorkflowPortEntity) => boolean;
  /**
   * 判断端口是否禁用
   * @param ctx
   * @param port
   */
  isDisabledPort?: (ctx: FreeLayoutPluginContext, port: WorkflowPortEntity) => boolean;
  /**
   * 判断线条箭头是否反转
   * @param ctx
   * @param line
   */
  isReverseLine?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => boolean;
  /**
   * 判断线条是否隐藏箭头
   * @param ctx
   * @param line
   */
  isHideArrowLine?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => boolean;
  /**
   * 判断线条是否展示流动效果
   * @param ctx
   * @param line
   */
  isFlowingLine?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => boolean;
  /**
   * 判断线条是否禁用
   * @param ctx
   * @param line
   */
  isDisabledLine?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => boolean;
  /**
   * 判断线条是否竖向
   * @param ctx
   * @param line
   */
  isVerticalLine?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => boolean;
  /**
   * 拖拽线条结束
   * @param ctx
   * @param params
   */
  onDragLineEnd?: (ctx: FreeLayoutPluginContext, params: onDragLineEndParams) => Promise<void>;
  /**
   * 设置线条渲染器类型
   * @param ctx
   * @param line
   */
  setLineRenderType?: (
    ctx: FreeLayoutPluginContext,
    line: WorkflowLineEntity
  ) => LineRenderType | undefined;
  /**
   * 设置线条样式
   * @param ctx
   * @param line
   */
  setLineClassName?: (ctx: FreeLayoutPluginContext, line: WorkflowLineEntity) => string | undefined;
  /**
   * 是否允许创建线条
   * @param ctx
   * @param fromPort - 开始点
   * @param toPort - 目标点
   */
  canAddLine?: (
    ctx: FreeLayoutPluginContext,
    fromPort: WorkflowPortEntity,
    toPort: WorkflowPortEntity,
    lines: WorkflowLinesManager,
    silent?: boolean
  ) => boolean;
  /**
   * 是否允许删除节点
   * @param ctx
   * @param node - 目标节点
   * @param silent - 如果为false，可以加 toast 弹窗
   */
  canDeleteNode?: (
    ctx: FreeLayoutPluginContext,
    node: WorkflowNodeEntity,
    silent?: boolean
  ) => boolean;
  /**
   *
   * 是否允许删除线条
   * @param ctx
   * @param line - 目标线条
   * @param newLineInfo - 新的线条信息
   * @param silent - 如果为false，可以加 toast 弹窗
   */
  canDeleteLine?: (
    ctx: FreeLayoutPluginContext,
    line: WorkflowLineEntity,
    newLineInfo?: Required<WorkflowLinePortInfo>,
    silent?: boolean
  ) => boolean;
  /**
   * 是否允许重置线条
   * @param fromPort - 开始点
   * @param oldToPort - 旧的连接点
   * @param newToPort - 新的连接点
   * @param lines - 线条管理器
   */
  canResetLine?: (
    ctx: FreeLayoutPluginContext,
    fromPort: WorkflowPortEntity,
    oldToPort: WorkflowPortEntity,
    newToPort: WorkflowPortEntity,
    lines: WorkflowLinesManager
  ) => boolean;
  /**
   * 是否允许拖入子画布 (loop or group)
   * Whether to allow dragging into the sub-canvas (loop or group)
   * @param params
   */
  canDropToNode?: (
    ctx: FreeLayoutPluginContext,
    params: {
      dragNodeType?: FlowNodeType;
      dragNode?: WorkflowNodeEntity;
      dropNode?: WorkflowNodeEntity;
      dropNodeType?: FlowNodeType;
    }
  ) => boolean;
}

export namespace FreeLayoutProps {
  /**
   * 默认配置
   */
  export const DEFAULT: FreeLayoutProps = {
    ...EditorProps.DEFAULT,
  } as FreeLayoutProps;
}

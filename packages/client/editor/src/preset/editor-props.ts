/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { VariablePluginOptions } from '@flowgram.ai/variable-plugin';
import { ReduxDevToolPluginOptions } from '@flowgram.ai/redux-devtool-plugin';
import { PlaygroundReactProps, SelectionService } from '@flowgram.ai/playground-react';
import { NodeCorePluginOptions } from '@flowgram.ai/node-core-plugin';
import { MaterialsPluginOptions } from '@flowgram.ai/materials-plugin';
import { I18nPluginOptions } from '@flowgram.ai/i18n-plugin';
import { HistoryPluginOptions } from '@flowgram.ai/history';
import { FormMetaOrFormMetaGenerator } from '@flowgram.ai/form-core';
import {
  FlowDocument,
  FlowDocumentJSON,
  FlowNodeEntity,
  type FlowNodeJSON,
  FlowNodeRegistry,
  FlowNodeType,
  FlowTransitionLabel,
  FlowTransitionLine,
} from '@flowgram.ai/document';
import { PluginContext } from '@flowgram.ai/core';

export interface EditorPluginContext extends PluginContext {
  document: FlowDocument;
  selection: SelectionService;
}

/**
 * 固定布局配置
 */
export interface EditorProps<
  CTX extends EditorPluginContext = EditorPluginContext,
  JSON = FlowDocumentJSON
> extends PlaygroundReactProps<CTX> {
  /**
   * 初始化数据
   */
  initialData?: JSON;
  /**
   * 是否为 readonly
   */
  readonly?: boolean;
  /**
   * 节点定义
   */
  nodeRegistries?: FlowNodeRegistry[];
  /**
   * 获取默认的节点配置
   */
  getNodeDefaultRegistry?: (type: FlowNodeType) => FlowNodeRegistry;
  /**
   * 节点引擎配置
   */
  nodeEngine?: NodeCorePluginOptions & {
    /**
     * 默认FormMeta
     */
    createDefaultFormMeta?: (node: FlowNodeEntity) => FormMetaOrFormMetaGenerator;
    /**
     * 开启
     */
    enable?: boolean;
  };
  /**
   * 默认是否展开所有节点
   */
  allNodesDefaultExpanded?: boolean;
  /**
   * 画布物料
   */
  materials?: MaterialsPluginOptions;
  /**
   * 画布数据加载完成, 请使用 onAllLayersRendered 替代
   * @deprecated
   * */
  onLoad?: (ctx: CTX) => void;
  /**
   * 是否开启变量引擎
   */
  variableEngine?: VariablePluginOptions;
  /**
   * 是否开启历史
   */
  history?: HistoryPluginOptions<CTX> & { disableShortcuts?: boolean };

  /**
   * redux 开发者工具配置
   */
  reduxDevTool?: ReduxDevToolPluginOptions;

  scroll?: {
    enableScrollLimit?: boolean; // 开启滚动限制
    disableScrollBar?: boolean; //  关闭滚动条
  };

  /**
   * 节点数据导出
   * - node 当前节点
   * - json 当前节点数据
   */
  toNodeJSON?(node: FlowNodeEntity, json: FlowNodeJSON): FlowNodeJSON;
  /**
   * 节点数据导入
   * - node 当前节点
   * - json 当前节点数据
   * - isFirstCreate 是否是第一次创建
   */
  fromNodeJSON?(node: FlowNodeEntity, json: FlowNodeJSON, isFirstCreate: boolean): FlowNodeJSON;
  /**
   * 画布内部常量自定义
   */
  constants?: Record<string, any>;
  /**
   * 自定义节点线条
   */
  formatNodeLines?: (node: FlowNodeEntity, lines: FlowTransitionLine[]) => FlowTransitionLine[];
  /**
   * 自定义节点 label
   */
  formatNodeLabels?: (node: FlowNodeEntity, lines: FlowTransitionLabel[]) => FlowTransitionLabel[];
  /**
   * 国际化
   */
  i18n?: I18nPluginOptions;
}

export namespace EditorProps {
  /**
   * 默认配置
   */
  export const DEFAULT: EditorProps = {
    background: {},
  };
}

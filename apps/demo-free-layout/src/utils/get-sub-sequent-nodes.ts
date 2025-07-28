/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {WorkflowDocument, WorkflowLinesManager, WorkflowNodeEntity } from "@flowgram.ai/free-layout-editor";

export type IGetSubsequentNodes = (params: {
  node: WorkflowNodeEntity;
  linesManager: WorkflowLinesManager;
  document: WorkflowDocument;
}) => WorkflowNodeEntity[];
/** 获取后续节点 */
export const getSubsequentNodes: IGetSubsequentNodes = (params) => {
  const { node, linesManager, document } = params;
  const linkedBrothers = new Set();
  const linesMap = new Map<string, string[]>();
  const result: WorkflowNodeEntity[] = [];
  linesManager.getAllLines().forEach((line) => {
    if (!linesMap.has(line.from.id)) {
      linesMap.set(line.from.id, []);
    }
    if (!line.to?.id) {
      return;
    }
    linesMap.get(line.from.id)?.push(line.to.id);
  });
  const bfs = (nodeId: string) => {
    const node = document.getNode(nodeId);
    if (!node || linkedBrothers.has(nodeId)) {
      return;
    }
    linkedBrothers.add(nodeId);
    result.push(node);
    const nextNodes = linesMap.get(nodeId) ?? [];
    nextNodes.forEach(bfs);
  };
  bfs(node.id);
  return result;
};
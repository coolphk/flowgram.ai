/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  injectable,
  inject,
  Emitter,
  FlowDocument,
  WorkflowDocument,
  FlowNodeEntity,
  getNodeForm,
} from "@flowgram.ai/free-layout-editor";
import { NodeReport } from "@flowgram.ai/runtime-interface";

import { RunHistoryRecord } from "./types";
import { WorkflowRuntimeService } from "../runtime-plugin/runtime-service";
import { getSubsequentNodes } from "../../utils";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";

@injectable()
export class RunHistoryService {
  @inject(WorkflowRuntimeService)
  private runtimeService: WorkflowRuntimeService;
  @inject(WorkflowDocument) private readonly document: WorkflowDocument;

  public init(): void {
    // 监听运行时服务的事件
    this.runtimeService.onNodeReportChange((nodeReport: NodeReport) => {
      console.log("nodeReport:", nodeReport);
      // this.updateCurrentRecord(nodeReport);
    });
  }

  public getColumns() {
    const columns: ColumnProps[] = [];
    this.initColumns(columns);
    return columns;
  }

  public initColumns(columns: ColumnProps[]) {
    const linkedNodes = this.getLinkedNodes(this.getStartNode()!);
    linkedNodes.map((node) => {
      columns.push({
        title: getNodeForm(node)?.values.title,
        dataIndex: node.id,
      });
    });
  }

  private getStartNode() {
    return this.document.getAllNodes().find((node) => node.isStart);
  }

  private getLinkedNodes(startNode: FlowNodeEntity) {
    return getSubsequentNodes({
      node: startNode,
      linesManager: this.document.linesManager,
      document: this.document,
    });
  }
  public dispose(): void {}
}

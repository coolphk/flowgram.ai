/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  injectable,
  inject,
  Emitter,
  WorkflowDocument,
  FlowNodeEntity,
  getNodeForm,
  Disposable,
} from "@flowgram.ai/free-layout-editor";
import {NodeReport} from "@flowgram.ai/runtime-interface";

import {WorkflowRuntimeService} from "../runtime-plugin/runtime-service";
import {getSubsequentNodes} from "../../utils";
import {ColumnProps} from "@douyinfe/semi-ui/lib/es/table";
import {WorkflowRuntimeClient} from "../runtime-plugin";

@injectable()
export class RunHistoryService {
  @inject(WorkflowRuntimeService)
  private runtimeService: WorkflowRuntimeService;
  @inject(WorkflowDocument) private readonly document: WorkflowDocument;
  @inject(WorkflowRuntimeClient) runtimeClient: WorkflowRuntimeClient;
  private row: Record<string, any> | null = {};
  private dataSource: Record<string, any>[] = [];
  private columns: ColumnProps[] = [];
  private reportDisposer: Disposable;
  private resetDisposer: Disposable;
  private taskIdDisposer: Disposable;
  private resultDisposer: Disposable;
  private contentChangeDisposer: Disposable;
  private dataChangeEmitter = new Emitter<Record<string, any>[]>();
  private columnsChangeEmitter = new Emitter<ColumnProps[]>();
  private currentTaskId: string | undefined;
  private historySnapshot: Record<string, any> = {};

  public onDataChange = this.dataChangeEmitter.event;
  public onColumnsChange = this.columnsChangeEmitter.event;

  public init(): void {

    // 监听文档内容变化事件，重新设置列配置
    this.contentChangeDisposer = this.document.onContentChange(() => {
      this.columns = [];
      this.initColumns();
      this.columnsChangeEmitter.fire([...this.columns]);
    });

    // 监听重置事件，清理当前状态
    this.resetDisposer = this.runtimeService.onReset(() => {
      this.currentTaskId = undefined;
      this.row = null;
    });

    // 监听taskId生成事件，创建新的记录行
    this.taskIdDisposer = this.runtimeService.onTaskIdGenerated(
      (taskId: string) => {
        console.log("onTaskIdGenerated");
        this.currentTaskId = taskId;
        this.row = {
          taskId: this.currentTaskId,
          startTime: new Date().toLocaleString("zh-CN"),
          endTime: undefined,
        };
        // 将新的记录行添加到dataSource中
        this.historySnapshot[taskId] = {};
        this.dataSource.push({...this.row});
        // 触发数据变化事件
        this.dataChangeEmitter.fire([...this.dataSource]);
      }
    );

    // 监听运行时服务的事件
    this.reportDisposer = this.runtimeService.onNodeReportChange(
      (nodeReport: NodeReport) => {
        console.log("222,nodeReport:", nodeReport);
        // 更新当前运行的row对象
        if (this.row) {
          this.historySnapshot[this.currentTaskId!][nodeReport.id] =
            nodeReport.snapshots;
          this.row[nodeReport.id] = nodeReport.status;
          // 更新dataSource中对应的记录
          const lastIndex = this.dataSource.length - 1;
          if (lastIndex >= 0) {
            this.dataSource[lastIndex] = {...this.row};
            // 触发数据变化事件
            this.dataChangeEmitter.fire([...this.dataSource]);
          }
        }
      }
    );

    // 监听任务结果变化事件，记录结束时间
    this.resultDisposer = this.runtimeService.onResultChanged((result) => {
      console.log("onResultChanged", result);
      if (this.row) {
        this.row.endTime = new Date().toLocaleString("zh-CN");
        // 更新dataSource中对应的记录
        const lastIndex = this.dataSource.length - 1;
        if (lastIndex >= 0) {
          this.dataSource[lastIndex] = {...this.row};
          // 触发数据变化事件
          this.dataChangeEmitter.fire([...this.dataSource]);
        }
      }
    });
  }

  public get snapshot() {
    return this.historySnapshot;
  }

  public getDataSource(): Array<Record<string, any>> {
    return this.dataSource;
  }

  public getColumns() {
    if (this.columns.length === 0) {
      this.initColumns();
    }
    return this.columns;
  }

  public initColumns() {
    // 清空现有列配置
    this.columns = [];

    // 添加任务ID列
    this.columns.push({
      title: "任务ID",
      dataIndex: "taskId",
      width: 150,
    });

    // 添加其他节点列
    const linkedNodes = this.getLinkedNodes(this.getStartNode()!);
    linkedNodes.map((node) => {
      this.columns.push({
        title: getNodeForm(node)?.values.title,
        dataIndex: node.id,
      });
    });

    // 添加开始时间列（放在末尾）
    this.columns.push({
      title: "开始时间",
      dataIndex: "startTime",
      width: 150,
    });

    // 添加结束时间列（放在末尾）
    this.columns.push({
      title: "结束时间",
      dataIndex: "endTime",
      width: 150,
    });
  }

  public getResult() {
    console.log('this.currentTaskId', this.currentTaskId);
    this.runtimeClient.TaskResult({
      taskID: this.currentTaskId!,
    }).then((result) => {
      console.log('result', result);
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

  public dispose(): void {
    if (this.reportDisposer) {
      this.reportDisposer.dispose();
    }
    if (this.resetDisposer) {
      this.resetDisposer.dispose();
    }
    if (this.taskIdDisposer) {
      this.taskIdDisposer.dispose();
    }
    if (this.resultDisposer) {
      this.resultDisposer.dispose();
    }
    if (this.contentChangeDisposer) {
      this.contentChangeDisposer.dispose();
    }
    this.dataChangeEmitter.dispose();
    this.columnsChangeEmitter.dispose();
    this.row = null;
    this.dataSource.length = 0;
    this.columns.length = 0;
  }
}

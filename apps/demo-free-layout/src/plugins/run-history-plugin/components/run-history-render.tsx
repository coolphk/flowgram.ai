/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import Table from "@douyinfe/semi-ui/lib/es/table/Table";
import { WorkflowRuntimeService } from "../../runtime-plugin/runtime-service";
import {
  getNodeForm,
  useClientContext,
  useService,
} from "@flowgram.ai/free-layout-editor";
import { useEffect, useState } from "react";

import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { getSubsequentNodes } from "../../../utils";
import { set } from "date-fns";
import { RunHistoryService } from "../service";
interface RunHistoryRenderProps {
  service: RunHistoryService;
}
export const RunHistoryRender: React.FC<RunHistoryRenderProps> = (props) => {
  const { service } = props;
  const runtimeService = useService(WorkflowRuntimeService);
  const ctx = useClientContext();

  const [columns, setColumns] = useState<ColumnProps[]>([]);
  const [dataSource, setDataSource] = useState<Record<string, string>[]>([]);
  const getStartNode = () => {
    return ctx.document.getAllNodes().find((node) => node.isStart);
  };
  useEffect(() => {
    const cols: ColumnProps[] = [];
    const rowData: Record<string, any> = {};
    const linkedNodes = getSubsequentNodes({
      node: getStartNode()!,
      linesManager: ctx.document.linesManager,
      document: ctx.document,
    });
    linkedNodes.map((node) => {
      cols.push({
        title: getNodeForm(node)?.values.title,
        dataIndex: node.id,
      });
    });
    setColumns(cols);

    runtimeService.nodeRunningStatus.forEach((status, nodeID) => {
      console.log(112, status);
      rowData[nodeID] = status.status;
    });
    setDataSource([...dataSource, { ...rowData }]);
    const reportDisposer = runtimeService.onNodeReportChange((nodeReport) => {
      rowData[nodeReport.id] = nodeReport.status;
      setDataSource([...dataSource, { ...rowData }]);
    });

    console.log("runtimeService", runtimeService);
    const resetDisposer = runtimeService.onReset(() => {});
    return () => {
      reportDisposer.dispose();
      resetDisposer.dispose();
    };
  }, []);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        border: "0.572px solid rgba(6, 7, 9, 0.10)",
        overflow: "hidden",
        boxShadow:
          "0px 2.289px 6.867px 0px rgba(0, 0, 0, 0.08), 0px 4.578px 13.733px 0px rgba(0, 0, 0, 0.04)",
        boxSizing: "border-box",
        padding: 8,
      }}
    >
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

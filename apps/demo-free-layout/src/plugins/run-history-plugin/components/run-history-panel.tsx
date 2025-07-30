/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Button, Table, Tag, Tooltip } from "@douyinfe/semi-ui";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { WorkflowStatus } from "@flowgram.ai/runtime-interface";
import { IconSpin } from "@douyinfe/semi-icons";
import classnames from "classnames";
import { RunHistoryService } from "../service";
import { useEffect, useState } from "react";
import { IconWarningFill } from "../../../assets/icon-warning";
import { IconSuccessFill } from "../../../assets/icon-success";

import styles from "./run-history-panel.module.less";

interface RunHistoryPanelProps {
  service: RunHistoryService;
}

export const RunHistoryPanel: React.FC<RunHistoryPanelProps> = (props) => {
  const { service } = props;

  const [dataSource, setDataSource] = useState<Record<string, any>[]>([]);
  const [columns, setColumns] = useState<ColumnProps[]>([]);

  // 状态渲染函数
  const renderStatus = (status: WorkflowStatus) => {
    const isNodePending = status === WorkflowStatus.Pending;
    const isNodeProcessing = status === WorkflowStatus.Processing;
    const isNodeFailed = status === WorkflowStatus.Failed;
    const isNodeSucceed = status === WorkflowStatus.Succeeded;
    const isNodeCanceled = status === WorkflowStatus.Canceled;

    const getStatusConfig = () => {
      if (isNodeSucceed) {
        return {
          icon: <IconSuccessFill />,
          text: "Succeed",
          className: styles.nodeStatusSucceed,
        };
      }
      if (isNodeFailed) {
        return {
          icon: (
            <IconWarningFill
              className={classnames(styles.nodeStatusFailed, styles.round)}
            />
          ),
          text: "Failed",
          className: styles.nodeStatusFailed,
        };
      }
      if (isNodeProcessing) {
        return {
          icon: (
            <IconSpin
              spin
              className={classnames(styles.icon, styles.processing)}
            />
          ),
          text: "Running",
          className: styles.nodeStatusProcessing,
        };
      }
      if (isNodePending) {
        return {
          icon: (
            <IconWarningFill
              className={classnames(styles.nodeStatusPending, styles.round)}
            />
          ),
          text: "Pending",
          className: styles.nodeStatusPending,
        };
      }
      if (isNodeCanceled) {
        return {
          icon: (
            <IconWarningFill
              className={classnames(styles.nodeStatusCanceled, styles.round)}
            />
          ),
          text: "Canceled",
          className: styles.nodeStatusCanceled,
        };
      }
      return {
        icon: null,
        text: "Waiting",
        className: "",
      };
    };

    const config = getStatusConfig();

    return (
      <div className={styles.statusContainer}>
        {config.icon}
        <Tag size="small" className={config.className}>
          {config.text}
        </Tag>
      </div>
    );
  };

  useEffect(() => {
    // 初始化获取当前数据和列配置
    setDataSource(service.getDataSource());
    const initialColumns = service.getColumns();

    // 为状态列添加自定义渲染
    const enhancedColumns = initialColumns.map((col) => {
      if (col.dataIndex === "taskId") {
        return {
          ...col,
          render: (taskId: string) => {
            const shortTaskId = taskId ? taskId.substring(0, 8) + "..." : "";
            return (
              <Tooltip content={taskId} position="top">
                <span style={{ cursor: "pointer" }}>{shortTaskId}</span>
              </Tooltip>
            );
          },
          width: 100,
        };
      } else if (col.dataIndex === "startTime" || col.dataIndex === "endTime") {
        return {
          ...col,
          render: (time: string) => time || "-",
          width: 150,
        };
      } else if (col.dataIndex !== "title") {
        return {
          ...col,
          render: (status: WorkflowStatus) => renderStatus(status),
          width: 120,
        };
      }
      return col;
    });

    setColumns(enhancedColumns);

    // 监听数据变化
    const dataDisposer = service.onDataChange((newDataSource) => {
      setDataSource([...newDataSource]);
    });

    // 监听列配置变化
    const columnsDisposer = service.onColumnsChange((newColumns) => {
      // 为新的列配置添加自定义渲染
      const enhancedNewColumns = newColumns.map((col) => {
        if (col.dataIndex === "taskId") {
          return {
            ...col,
            render: (taskId: string) => {
              const shortTaskId = taskId ? taskId.substring(0, 8) + "..." : "";
              return (
                <Tooltip content={taskId} position="top">
                  <span style={{ cursor: "pointer" }}>{shortTaskId}</span>
                </Tooltip>
              );
            },
            width: 100,
          };
        } else if (
          col.dataIndex === "startTime" ||
          col.dataIndex === "endTime"
        ) {
          return {
            ...col,
            render: (time: string) => time || "-",
            width: 150,
          };
        } else if (col.dataIndex !== "title") {
          return {
            ...col,
            render: (status: WorkflowStatus) => renderStatus(status),
            width: 120,
          };
        }
        return col;
      });
      setColumns([...enhancedNewColumns]);
    });

    return () => {
      dataDisposer.dispose();
      columnsDisposer.dispose();
    };
  }, [service]);
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
      <Button onClick={() => service.getResult()}>result</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
        size="small"
        className={styles.historyTable}
        rowKey="taskId"
      />
    </div>
  );
};

import {WorkflowNodeType} from "../nodes"

export enum WSMessageType {
  // NodeMessage = 'nodeMessage',
  FileMessage = 'UPLOAD_FILE',
  RunToolMessage = 'RUN_TOOL',
  // RunWorkFlowMessage = 'RUN_WORKFLOW',
  RunWorkFlowMessage = 'WORKFLOW_STATUS',
  AssetMessage = 'ASSET_STATUS',
}

export enum WSAssetStatus {
  Success = 'success',
  Failed = 'failed',
  NotYet = 'notyet',
}

export interface WSFilePayload {
  description: string
  assetsId: string
  status: string
}

export interface WSRunToolPayload {
  status: string,
  assetsId: string[],
  toolId: string,
  url: string,
}

// cx定义的结构
export interface WSAssetPayload {
  status: string,
  assetsId: string,
}

interface WSRunWorkflowNextNode {
  id: string,
  type: WorkflowNodeType,
  assets: [{
    id: string,
    name: string,
    status: string,
  }],
}

// 我定义的结构
export interface WSRunWorkflowPayload {
  status: string,
  nextNodes: WSRunWorkflowNextNode[]
}

export interface WSAssetPayload {
  status: string,
  assetsId: string,
}

interface WSBaseMessage {
  nodeId: string;
  type: WSMessageType;
  timestamp: number;
}

// 上传文件后回执
export interface WSFileMessage extends WSBaseMessage {
  type: WSMessageType.FileMessage;
  payload: WSFilePayload;
}

// 运行工具后回执
export interface WSRunToolMessage extends WSBaseMessage {
  type: WSMessageType.RunToolMessage;
  payload: WSRunToolPayload;
}

// 运行工作流后回执
export interface WSRunWorkFlowMessage extends WSBaseMessage {
  type: WSMessageType.RunWorkFlowMessage;
  // payload: WSRunWorkflowPayload;
  payload: WSAssetPayload;
}

// 资产状态变更回执
export interface WSAssetMessage extends WSBaseMessage {
  type: WSMessageType.AssetMessage;
  payload: WSAssetPayload;
}

export type WSMessage = WSFileMessage | WSRunToolMessage | WSRunWorkFlowMessage;


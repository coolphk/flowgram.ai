import { WorkflowNodeType } from "../nodes"

export enum WSMessageType {
  // NodeMessage = 'nodeMessage',
  FileMessage = 'UPLOAD_FILE',
  RunToolMessage = 'RUN_TOOL',
  RunWorkFlowMessage = 'RUN_WORKFLOW',
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
interface WSRunWorkflowNextNode {
  id: string,
  type: WorkflowNodeType,
  assets: [{
    id: string,
    name: string,
    status: string,
  }],
}
export interface WSRunWorkflowPayload {
  status: string,
  nextNodes: WSRunWorkflowNextNode[]
}
interface WSBaseMessage {
  nodeId: string;
  type: WSMessageType;
  timestamp: number;
  payload: WSFilePayload | WSRunToolPayload | WSRunWorkflowPayload;
}
export interface WSFileMessage extends WSBaseMessage {
  type: WSMessageType.FileMessage;
  payload: WSFilePayload;
}

export interface WSRunToolMessage extends WSBaseMessage {
  type: WSMessageType.RunToolMessage;
  payload: WSRunToolPayload;
}

interface WSRunWorkFlowMessage extends WSBaseMessage {
  type: WSMessageType.RunWorkFlowMessage;
  payload: WSRunWorkflowPayload;
}

export type WSMessage = WSFileMessage | WSRunToolMessage | WSRunWorkFlowMessage;


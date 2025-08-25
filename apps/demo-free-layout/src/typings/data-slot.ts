import {WorkflowNodeType} from "../nodes";
import {IOTools} from "./io-tools";
import {JsonSchema} from "./json-schema";
import {Validation, Workflow} from "./workflow";
import {IFlowValue} from "@flowgram.ai/form-materials";

export enum AssetStatus {
  Success = 'success',
  Failed = 'failed',
  NotYet = 'notyet',
}

export interface DataSlot {
  description: string
  from: string
  id: string
  name: string
  to: string
  tools: any[]
  type: WorkflowNodeType.DataSlot
  uploadFiles: any[]
  validations: ValidationsDataSlot[]
}

export interface ValidationsDataSlot {
  id: string;
  name: string;
  validations: Validation[]
}

export interface Asset {
  "asset_id": string,
  "dataslot_id": string,
  "status": AssetStatus,
  "task_id"?: string,
  "object_path"?: string,
  "filename"?: string,
  "dt_id"?: string,
  "outlineColor"?: string,
}

// 资产状态对应的颜色配置
export const DEFAULT_ASSET_STATUS_COLORS: Record<AssetStatus, string> = {
  [AssetStatus.Success]: '#52c41a',  // 绿色
  [AssetStatus.Failed]: '#ff4d4f',   // 红色
  [AssetStatus.NotYet]: '#d9d9d9',   // 灰色
} as const;

export type AssetStatusColors = typeof DEFAULT_ASSET_STATUS_COLORS;
export type IODataSlot = Record<string, Asset>;

export interface DataSlotNodeData {
  title?: string,
  serverId?: string,
  rawData?: Workflow,
  from?: "inputs" | "outputs",
  inputs?: JsonSchema,
  inputTools?: IOTools,
  inputRadio?: string,
  inputsValues?: Record<string, IFlowValue>,
  inputSlot?: IODataSlot, //如果需要改成多文件上传，这里可以改成Asset[]
  outputs?: JsonSchema,
  outputTools?: IOTools,
  outputRadio?: string,
  outputSlot?: IODataSlot,
}

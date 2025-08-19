import { WorkflowNodeType } from "../nodes";
import { IOTools } from "./io-tools";
import { JsonSchema } from "./json-schema";
import { Validation, Workflow } from "./workflow";
import { IFlowValue } from "@flowgram.ai/form-materials";
import { WSAssetStatus } from "./web-socket";

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
  "status": WSAssetStatus,
  "task_id": string,
  "object_path": string,
  "filename": string,
  "dt_id": string,
}
// 资产状态对应的颜色配置
export const DEFAULT_ASSET_STATUS_COLORS: Record<WSAssetStatus, string> = {
  [WSAssetStatus.Success]: '#52c41a',  // 绿色
  [WSAssetStatus.Failed]: '#ff4d4f',   // 红色
  [WSAssetStatus.NotYet]: '#d9d9d9',   // 灰色
} as const;

export type AssetStatusColors = typeof DEFAULT_ASSET_STATUS_COLORS;

export interface DataSlotNodeData {
  title?: string,
  serverId?: string,
  rawData?: Workflow,
  from?: "inputs" | "outputs",
  inputs?: JsonSchema,
  inputTools?: IOTools,
  inputRadio?: string,
  inputsValues?: Record<string, IFlowValue>,
  inputSlot?: Record<string, Asset>, //如果需要改成多文件上传，这里可以改成Asset[]
  outputs?: JsonSchema,
  outputTools?: IOTools,
  outputRadio?: string,
  outputSlot?: Record<string, Asset>,
}

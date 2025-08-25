import {AssetStatus} from "./data-slot";
import {WorkflowStatus} from "./workflow";


export interface RunToolRequest {
  "dt_instance_id": string,
  "tool_id": string,
  "input_assets": string[],
  "node_id": string,
  "output_slot_id"?: string[]
}

export interface RunWorkFlowRequest {
  "dt_instance_id": string,
  "workflow_id": string,
  "input_assets": string[],
  "output_slot_id"?: string[]
  "node_id": string,
}

export type RunWorkFlowResponse = Record<string, string>

export interface LineageAsset {
  assetId: string;
  nodeId: string;
  type: string;
  status: AssetStatus;
}

export interface Task {
  nodeId: string;
  status: WorkflowStatus;
  result?: string;
  error?: string;
}

export interface LineageResponse {
  assets: LineageAsset[];
  tasks: Task[];
}

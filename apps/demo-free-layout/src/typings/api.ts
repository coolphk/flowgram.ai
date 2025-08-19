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


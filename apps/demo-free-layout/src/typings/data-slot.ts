import { FlowNodeBaseType, FlowNodeJSON } from "@flowgram.ai/free-layout-editor";
import { WorkflowNodeType } from "../nodes";
import { IOTools } from "./io-tools";
import { JsonSchema } from "./json-schema";
import { WSFilePayload } from "./web-socket";
import { Validation, Workflow } from "./workflow";
import { IFlowValue } from "@flowgram.ai/form-materials";
import { UploadResponse } from "./api";

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
export interface DataSlotNodeData {
  title?: string,
  serverId?: string,
  rawData?: Workflow,
  from?: string,
  inputs?: JsonSchema,
  inputTools?: IOTools,
  inputRadio?: string,
  inputsValues?: Record<string, IFlowValue>,
  inputUploadResponse?: Record<string, UploadResponse>,
  outputs?: JsonSchema,
  outputTools?: IOTools,
  outputRadio?: string,
  outputUploadResponse?: Record<string, UploadResponse>,
}

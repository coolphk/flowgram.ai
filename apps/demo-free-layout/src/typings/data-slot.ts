import {Validation} from "./workflow";
import {WorkflowNodeType} from "../nodes";

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

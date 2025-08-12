import { Validation } from "./workflow"

export interface IOTools {
  [key: string]: {
    tools: IOTool[]
  }
}
export interface IOTool {
  "id": string,
  "name": string,
  "description": string,
  "type": string,
  "inputs": string,
  "outputs": string,
  "input_validation": Validation[],
  "output_validation": Validation[]
}

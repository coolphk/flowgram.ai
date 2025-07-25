
export interface Workflow {
  description: string;
  id: string;
  inputs: Input[];
  name: string;
  outputs: Output[];
}

export interface Input {
  description: string;
  name: string;
  required: boolean;
  type: string;
}

export interface Output {
  description: string;
  name: string;
  required: boolean;
  type: string;
}

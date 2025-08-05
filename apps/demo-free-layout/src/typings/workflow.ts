/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export interface Workflow {
  description: string;
  id: string;
  inputs: Input[];
  name: string;
  outputs: Output[];
  serverId?: string;
}

export interface Validation {
  rule: string;
  description: string;
}

export interface ToolResponse {
  id: string;
  name: string;
  description: string;
  type: string;
  inputs: 'singular' | 'plural';
  outputs: 'singular' | 'plural';
  inputValidation: Validation[];
  outputValidation: Validation[];
}

export interface Input {
  description: string;
  name: string;
  required: boolean;
  type: string;
  validation: Validation[];
}

export interface Output {
  description: string;
  name: string;
  required: boolean;
  type: string;
  validation: Validation[];
}
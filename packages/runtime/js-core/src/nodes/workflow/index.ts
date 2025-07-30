/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  ExecutionContext,
  ExecutionResult,
  FlowGramNode,
  INodeExecutor,
} from "@flowgram.ai/runtime-interface";

export class WorkflowExecutor implements INodeExecutor {
  public readonly type = FlowGramNode.Workflow;

  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    // console.log('Start node executed', context.runtime.ioCenter.inputs)
    // await new Promise(resolve => setTimeout(resolve, 5000));
    console.log("outputs", context.node.declare.outputs);
    const outputs: Record<string, any> = {};
    Object.keys(context.node.declare.outputs!.properties!).forEach(
      (key: string) => {
        outputs[key] = {
          url: "aabbc",
        };
      }
    );
    return {
      outputs,
      // outputs: context.runtime.ioCenter.inputs,
    };
  }
}

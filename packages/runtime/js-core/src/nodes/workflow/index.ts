import {
  ExecutionContext,
  ExecutionResult,
  FlowGramNode,
  INodeExecutor,
} from '@flowgram.ai/runtime-interface';

export class WorkflowExecutor implements INodeExecutor {
  public readonly type = FlowGramNode.Workflow;

  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    // console.log('Start node executed', context.runtime.ioCenter.inputs)
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      outputs: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            title: 'ID',
          },
          name: {
            type:'string',
            title: 'Name',
          }
        },
      },
    };
  }
}
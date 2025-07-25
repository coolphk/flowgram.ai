/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */



import { nanoid } from 'nanoid';

import { formMeta } from './form-meta';
import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import IconWorkflow from '../../assets/icon-workflow.svg';

export const WorkflowNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Workflow,
  info: {
    icon: IconWorkflow,
    description: '工作流',
  },
  meta: {
    nodePanelVisible: true,
    defaultPorts: [{ type: 'input' }, { type: 'output' }],
    expandable: true,
    runnable: true,
  },
  formMeta,
  onAdd() {
    return {
      id: `workflow-${nanoid(5)}`,
      type: 'workflow',
      data: {
        title: 'Workflow',
        inputs: {
          type: 'object',
          properties: {},
        },
        outputs: {
          type: 'object',
          properties: {},
        },
      },
    };
  },
};

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */





import { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

export const initialData: WorkflowJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: {
          x: 150,
          y: 100,
        },
      },
      data: {
        title: 'Start',
        content: 'Start content',
      },
    },
    {
      id: 'node_0',
      type: 'condition',
      meta: {
        position: {
          x: 550,
          y: 100,
        },
      },
      data: {
        title: 'Condition',
        content: 'Condition node content',
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: {
          x: 1350,
          y: 100,
        },
      },
      data: {
        title: 'End',
        content: 'End content',
      },
    },
    {
      id: '144150',
      type: 'node1',
      meta: {
        position: {
          x: 950,
          y: 0,
        },
      },
      data: {
        title: 'New Node1',
        content: 'xxxx',
      },
    },
    {
      id: '118937',
      type: 'node2',
      meta: {
        position: {
          x: 950,
          y: 200,
        },
      },
      data: {
        title: 'New Node2',
        content: 'xxxx',
      },
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'node_0',
    },
    {
      sourceNodeID: 'node_0',
      targetNodeID: '144150',
      sourcePortID: 'if',
    },
    {
      sourceNodeID: 'node_0',
      targetNodeID: '118937',
      sourcePortID: 'else',
    },
    {
      sourceNodeID: '118937',
      targetNodeID: 'end_0',
    },
    {
      sourceNodeID: '144150',
      targetNodeID: 'end_0',
    },
  ],
};

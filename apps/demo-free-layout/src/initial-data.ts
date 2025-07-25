/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowDocumentJSON } from './typings';

export const initialData: FlowDocumentJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: {
          x: 400,
          y: 181.75,
        },
      },
      data: {
        title: 'Start',
        outputs: {
          type: 'object',
          properties: {
            POSCAR: {
              type: 'file',
            },
            /* KPOINTS: {
               type: 'string',
             },
             INCAR: {
               type: 'string'
             },
             POTCAR: {
               type: 'string'
             },*/
            NCORE: {
              type: 'file',
            },
          },
        },
      },
    },
    /*{
      id: 'dataSlot_0',
      type: 'data-slot',
      meta: {
        position: {
          x: 400,
          y: 381.75,
        },
      },
      data: {
        title: 'DataSlot',
        inputs: {
          type: 'object',
          properties: {
            aa: {
              type: 'file',
              default: 'Hello Flow.',
            },
            bb: {
              type: 'file',
              default: '',
            },
            cc: {
              type: 'file',
            },
            POTCAR: {
              type: 'file',
            },
            NCORE: {
              type: 'file',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            POSCAR: {
              type: 'file',
              default: 'Hello Flow.',
            },
            KPOINTS: {
              type: 'file',
              default: '',
            },
            INCAR: {
              type: 'file',
            },
            POTCAR: {
              type: 'file',
            },
            NCORE: {
              type: 'file',
            },
          },
        },
      },
    },*/
    /*{
      id: 'workflow_0',
      type: 'workflow',
      meta: {
        position: {
          x: 400,
          y: 381.75,
        },
      },
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
    },*/
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: {
          x: 400,
          y: 681.75,
        },
      },
      data: {
        title: 'End',
      },
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'end_0',
    },
    /*{
      sourceNodeID: 'workflow_0',
      targetNodeID: 'end_0',
    },*/
    /*{
     sourceNodeID: 'start_0',
     targetNodeID: 'condition_0',
   },
   {
     sourceNodeID: 'condition_0',
     targetNodeID: 'llm_8--A3',
     sourcePortID: 'if_0',
   },
   {
     sourceNodeID: 'condition_0',
     targetNodeID: 'loop_ANNyh',
     sourcePortID: 'if_f0rOAt',
   },
   {
     sourceNodeID: 'llm_vTyMa',
     targetNodeID: 'end_0',
   },
   {
     sourceNodeID: 'loop_ANNyh',
     targetNodeID: 'end_0',
   },*/
  ],
};

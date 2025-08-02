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
          x: 0,
          y: 100,
        },
      },
      data: {
        title: 'Start',
/*        outputs: {
          type: 'object',
          properties: {
            POSCAR: {
              type: 'file',
            },
             KPOINTS: {
               type: 'file',
             },
             INCAR: {
               type: 'file'
             },
             POTCAR: {
               type: 'file'
             },
            NCORE: {
              type: 'file',
            },
          },
        },*/
      },
    },
    {
      id: 'data-slot_0',
      type: 'data-slot',
      meta: {
        position: {
          x: 0,
          y: 300,
        },
      },
      data: {
        title: 'DataSlot'
/*        outputs: {
          type: 'object',
          properties: {
            POSCAR: {
              type: 'file',
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
        }*/,
      },
    },
    {
      id: 'workflow_0',
      type: 'workflow',
      meta: {
        position: {
          x: 0,
          y: 500,
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
    },
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
      targetNodeID: 'data-slot_0',
    },
    {
      sourceNodeID: 'data-slot_0',
      targetNodeID: 'workflow_0',
    },
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

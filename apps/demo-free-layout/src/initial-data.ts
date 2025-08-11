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
/*    {
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
/!*        outputs: {
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
        },*!/
      },
    },*/
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
      id:'data-slot_1',
      type:'data-slot',
      meta: {
        position: {
          x: 0,
          y: 700,
        },
      },
      data: {
        "title": "data-slot",
        "rawData": {
          "id": "d8613d7c-b789-48b0-8e4a-cf8b7aac127f",
          "name": "vasp_relax",
          "description": "使用VASP进行结构弛豫",
          "tags": [
            "vasp",
            "弛豫"
          ],
          "version": "1.0.0",
          "inputs": [
            {
              "name": "POSCAR",
              "type": "string",
              "description": "POSCAR文件的MinIO URL (e.g., 'bucket-name/path/to/POSCAR')",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                },
                {
                  "rule": "POSCAR_FILE",
                  "description": "POSCAR格式的结构文件"
                }
              ],
              "required": true
            },
            {
              "name": "KPOINTS",
              "type": "string",
              "description": "KPOINTS文件的MinIO URL",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                },
                {
                  "rule": "KPOINTS_FILE",
                  "description": "KPOINTS格式的结构文件"
                }
              ],
              "required": true
            },
            {
              "name": "INCAR",
              "type": "string",
              "description": "INCAR文件的MinIO URL",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                },
                {
                  "rule": "INCAR_FILE",
                  "description": "INCAR格式的结构文件"
                }
              ],
              "required": true
            },
            {
              "name": "POTCAR",
              "type": "string",
              "description": "POTCAR文件的MinIO URL",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                },
                {
                  "rule": "POTCAR_FILE",
                  "description": "POTCAR格式的结构文件"
                }
              ],
              "required": true
            }
          ],
          "outputs": [
            {
              "name": "CONTCAR",
              "type": "file",
              "description": "CONTCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                },
                {
                  "rule": "POSCAR_FILE",
                  "description": "POSCAR格式的结构文件"
                }
              ],
              "required": false
            }
          ]
        },
        "inputs": {
          "type": "object",
          "properties": {
            "CONTCAR": {
              "type": "file"
            }
          }
        },
        "inputsValues": {
          "CONTCAR": {
            "type": "ref",
            "content": [
              "workflow_0",
              "CONTCAR"
            ],
            "extra": {
              "index": 0
            }
          }
        },
        "serverId": "10"
      },
    },
    /*{
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
    },*/
  ],
  edges: [
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

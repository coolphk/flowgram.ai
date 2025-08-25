/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { DataSlot } from "./data-slot";

export enum WorkflowStatus {
  Pending = 'pending',
  Running = 'running',
  Completed = 'completed',
  Failed = 'failed',
  Canceled = 'canceled',
}
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


export interface Input {
    id?: string;
    description: string;
    name: string;
    required: boolean;
    type: string;
    validation: Validation[];
}

export interface Output {
    id?: string;
    description: string;
    name: string;
    required: boolean;
    type: string;
    validation: Validation[];
}

export interface ISaveValidation {
    id: string;
    name: string;
    validations: Validation[]
}

export interface SaveRequest {
    id: string,
    raw: string,
    dataslots: DataSlot[];
    workflows: Workflow[];
}


/*export interface RunWorkflowResponse {
  dtInstanceId: string;
}*/
/*
{
    "id": "104",
    "dataslots": [
        {
            "id": "105",
            "type": "data-slot",
            "name": "DataSlot",
            "description": "",
            "validations": [
                {
                    "id": "111",
                    "name": "POSCAR",
                    "validations": [
                        {
                            "rule": "FILE_URL",
                            "description": "有效的文件路径"
                        },
                        {
                            "rule": "POSCAR_FILE",
                            "description": "POSCAR格式的结构文件"
                        }
                    ]
                },
                {
                    "id": "112",
                    "name": "KPOINTS",
                    "validations": [
                        {
                            "rule": "FILE_URL",
                            "description": "有效的文件路径"
                        },
                        {
                            "rule": "KPOINTS_FILE",
                            "description": "KPOINTS格式的结构文件"
                        }
                    ]
                },
                {
                    "id": "113",
                    "name": "INCAR",
                    "validations": [
                        {
                            "rule": "FILE_URL",
                            "description": "有效的文件路径"
                        },
                        {
                            "rule": "INCAR_FILE",
                            "description": "INCAR格式的结构文件"
                        }
                    ]
                },
                {
                    "id": "114",
                    "name": "POTCAR",
                    "validations": [
                        {
                            "rule": "FILE_URL",
                            "description": "有效的文件路径"
                        },
                        {
                            "rule": "POTCAR_FILE",
                            "description": "POTCAR格式的结构文件"
                        }
                    ]
                }
            ],
            "tools": [],
            "from": "",
            "to": "103",
            "uploadFiles": []
        },
        {
            "id": "106",
            "type": "data-slot",
            "name": "data-slot",
            "description": "",
            "validations": [],
            "tools": [],
            "from": "",
            "to": "",
            "uploadFiles": []
        }
    ],
    "workflows": [
        {
            "id": "103",
            "type": "workflow",
            "original": "d8613d7c-b789-48b0-8e4a-cf8b7aac127f",
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
        }
    ],
    "raw": "{\"nodes\":[{\"id\":\"data-slot_0\",\"type\":\"data-slot\",\"meta\":{\"position\":{\"x\":-24,\"y\":239}},\"data\":{\"title\":\"DataSlot\",\"serverId\":\"105\",\"rawData\":{\"id\":\"d8613d7c-b789-48b0-8e4a-cf8b7aac127f\",\"name\":\"vasp_relax\",\"description\":\"使用VASP进行结构弛豫\",\"tags\":[\"vasp\",\"弛豫\"],\"version\":\"1.0.0\",\"inputs\":[{\"name\":\"POSCAR\",\"type\":\"string\",\"description\":\"POSCAR文件的MinIO URL (e.g., 'bucket-name/path/to/POSCAR')\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"POSCAR_FILE\",\"description\":\"POSCAR格式的结构文件\"}],\"required\":true},{\"name\":\"KPOINTS\",\"type\":\"string\",\"description\":\"KPOINTS文件的MinIO URL\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"KPOINTS_FILE\",\"description\":\"KPOINTS格式的结构文件\"}],\"required\":true},{\"name\":\"INCAR\",\"type\":\"string\",\"description\":\"INCAR文件的MinIO URL\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"INCAR_FILE\",\"description\":\"INCAR格式的结构文件\"}],\"required\":true},{\"name\":\"POTCAR\",\"type\":\"string\",\"description\":\"POTCAR文件的MinIO URL\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"POTCAR_FILE\",\"description\":\"POTCAR格式的结构文件\"}],\"required\":true}],\"outputs\":[{\"name\":\"CONTCAR\",\"type\":\"file\",\"description\":\"CONTCAR文件\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"POSCAR_FILE\",\"description\":\"POSCAR格式的结构文件\"}],\"required\":false}]},\"from\":\"inputs\",\"outputs\":{\"type\":\"object\",\"properties\":{\"POSCAR\":{\"type\":\"file\"},\"KPOINTS\":{\"type\":\"file\"},\"INCAR\":{\"type\":\"file\"},\"POTCAR\":{\"type\":\"file\"}}}}},{\"id\":\"workflow_0\",\"type\":\"workflow\",\"meta\":{\"position\":{\"x\":-24,\"y\":459}},\"data\":{\"title\":\"Workflow\",\"inputs\":{\"type\":\"object\",\"properties\":{\"POSCAR\":{\"type\":\"file\"},\"KPOINTS\":{\"type\":\"file\"},\"INCAR\":{\"type\":\"file\"},\"POTCAR\":{\"type\":\"file\"}}},\"outputs\":{\"type\":\"object\",\"properties\":{\"CONTCAR\":{\"type\":\"file\"}}},\"serverId\":\"103\",\"inputsValues\":{\"POSCAR\":{\"type\":\"ref\",\"content\":[\"data-slot_0\",\"POSCAR\"],\"extra\":{\"index\":0}},\"KPOINTS\":{\"type\":\"ref\",\"content\":[\"data-slot_0\",\"KPOINTS\"],\"extra\":{\"index\":1}},\"INCAR\":{\"type\":\"ref\",\"content\":[\"data-slot_0\",\"INCAR\"],\"extra\":{\"index\":2}},\"POTCAR\":{\"type\":\"ref\",\"content\":[\"data-slot_0\",\"POTCAR\"],\"extra\":{\"index\":3}}},\"outputsValues\":{},\"rawData\":{\"id\":\"d8613d7c-b789-48b0-8e4a-cf8b7aac127f\",\"name\":\"vasp_relax\",\"description\":\"使用VASP进行结构弛豫\",\"tags\":[\"vasp\",\"弛豫\"],\"version\":\"1.0.0\",\"inputs\":[{\"name\":\"POSCAR\",\"type\":\"string\",\"description\":\"POSCAR文件的MinIO URL (e.g., 'bucket-name/path/to/POSCAR')\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"POSCAR_FILE\",\"description\":\"POSCAR格式的结构文件\"}],\"required\":true},{\"name\":\"KPOINTS\",\"type\":\"string\",\"description\":\"KPOINTS文件的MinIO URL\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"KPOINTS_FILE\",\"description\":\"KPOINTS格式的结构文件\"}],\"required\":true},{\"name\":\"INCAR\",\"type\":\"string\",\"description\":\"INCAR文件的MinIO URL\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"INCAR_FILE\",\"description\":\"INCAR格式的结构文件\"}],\"required\":true},{\"name\":\"POTCAR\",\"type\":\"string\",\"description\":\"POTCAR文件的MinIO URL\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"POTCAR_FILE\",\"description\":\"POTCAR格式的结构文件\"}],\"required\":true}],\"outputs\":[{\"name\":\"CONTCAR\",\"type\":\"file\",\"description\":\"CONTCAR文件\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"POSCAR_FILE\",\"description\":\"POSCAR格式的结构文件\"}],\"required\":false}]}}},{\"id\":\"data-slot_1\",\"type\":\"data-slot\",\"meta\":{\"position\":{\"x\":-36,\"y\":630}},\"data\":{\"title\":\"data-slot\",\"rawData\":{\"id\":\"d8613d7c-b789-48b0-8e4a-cf8b7aac127f\",\"name\":\"vasp_relax\",\"description\":\"使用VASP进行结构弛豫\",\"tags\":[\"vasp\",\"弛豫\"],\"version\":\"1.0.0\",\"inputs\":[{\"name\":\"POSCAR\",\"type\":\"string\",\"description\":\"POSCAR文件的MinIO URL (e.g., 'bucket-name/path/to/POSCAR')\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"POSCAR_FILE\",\"description\":\"POSCAR格式的结构文件\"}],\"required\":true},{\"name\":\"KPOINTS\",\"type\":\"string\",\"description\":\"KPOINTS文件的MinIO URL\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"KPOINTS_FILE\",\"description\":\"KPOINTS格式的结构文件\"}],\"required\":true},{\"name\":\"INCAR\",\"type\":\"string\",\"description\":\"INCAR文件的MinIO URL\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"INCAR_FILE\",\"description\":\"INCAR格式的结构文件\"}],\"required\":true},{\"name\":\"POTCAR\",\"type\":\"string\",\"description\":\"POTCAR文件的MinIO URL\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"POTCAR_FILE\",\"description\":\"POTCAR格式的结构文件\"}],\"required\":true}],\"outputs\":[{\"name\":\"CONTCAR\",\"type\":\"file\",\"description\":\"CONTCAR文件\",\"validation\":[{\"rule\":\"FILE_URL\",\"description\":\"有效的文件路径\"},{\"rule\":\"POSCAR_FILE\",\"description\":\"POSCAR格式的结构文件\"}],\"required\":false}]},\"inputs\":{\"type\":\"object\",\"properties\":{}},\"inputsValues\":{\"CONTCAR\":{\"type\":\"ref\",\"content\":[\"workflow_0\",\"CONTCAR\"],\"extra\":{\"index\":0}}},\"serverId\":\"106\"}}],\"edges\":[{\"sourceNodeID\":\"data-slot_0\",\"targetNodeID\":\"workflow_0\"}]}"
}
 */

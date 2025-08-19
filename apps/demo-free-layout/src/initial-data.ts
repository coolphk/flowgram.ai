import {FlowDocumentJSON} from './typings';

export const initialData: FlowDocumentJSON =
  {
    "nodes":
      [
        {
          "id": "start_0",
          "type": "start",
          "meta": {
            "position": {
              "x": 0,
              "y": 100
            }
          },
          "data": {
            "title": "Start"
          }
        },
        {
          "id": "data-slot_0",
          "type": "data-slot",
          "meta": {
            "position": {
              "x": 0,
              "y": 224
            }
          },
          "data": {
            "title": "DataSlot",
            "serverId": "546",
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
                  "required": true,
                  "id": "549"
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
                  "required": true,
                  "id": "550"
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
                  "required": true,
                  "id": "551"
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
                  "required": true,
                  "id": "552"
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
                  "required": false,
                  "id": "548"
                }
              ]
            },
            "from": "inputs",
            "outputs": {
              "type": "object",
              "properties": {
                "POSCAR": {
                  "type": "file",
                  "extra": {
                    "index": 0
                  }
                },
                "KPOINTS": {
                  "type": "file",
                  "extra": {
                    "index": 1
                  }
                },
                "INCAR": {
                  "type": "file",
                  "extra": {
                    "index": 2
                  }
                },
                "POTCAR": {
                  "type": "file",
                  "extra": {
                    "index": 3
                  }
                }
              }
            },
            "outputTools": {
              "POSCAR": {
                "tools": [
                  {
                    "id": "2",
                    "name": "Uploader",
                    "description": "文件上传工具",
                    "type": "file_generator",
                    "inputs": "singular",
                    "outputs": "singular",
                    "input_validation": [
                      {
                        "rule": "ALL",
                        "description": ""
                      }
                    ],
                    "output_validation": []
                  },
                  {
                    "id": "1",
                    "name": "Vesta",
                    "description": "晶格可视工具",
                    "type": "visualization",
                    "inputs": "plural",
                    "outputs": "singular",
                    "input_validation": [
                      {
                        "rule": "FILE_URL",
                        "description": "有效的文件路径"
                      },
                      {
                        "rule": "POSCAR_FILE",
                        "description": "POSCAR格式的结构文件"
                      }
                    ],
                    "output_validation": [
                      {
                        "rule": "FILE_URL",
                        "description": "有效的文件路径"
                      },
                      {
                        "rule": "POSCAR_FILE",
                        "description": "POSCAR格式的结构文件"
                      }
                    ]
                  }
                ]
              }
            },
            "outputRadio": "POSCAR",
            "outputUploadResponse": {
              "POSCAR": {
                "asset_id": "560",
                "name": "Si.cif",
                "dataslot_id": "554",
                "task_id": "cf415fce",
                "status": "uploading"
              }
            }
          }
        },
        {
          "id": "workflow_0",
          "type": "workflow",
          "meta": {
            "position": {
              "x": 0,
              "y": 354
            }
          },
          "data": {
            "title": "Workflow",
            "inputs": {
              "type": "object",
              "properties": {
                "POSCAR": {
                  "type": "file",
                  "extra": {
                    "index": 0
                  }
                },
                "KPOINTS": {
                  "type": "file",
                  "extra": {
                    "index": 1
                  }
                },
                "INCAR": {
                  "type": "file",
                  "extra": {
                    "index": 2
                  }
                },
                "POTCAR": {
                  "type": "file",
                  "extra": {
                    "index": 3
                  }
                }
              }
            },
            "outputs": {
              "type": "object",
              "properties": {
                "CONTCAR": {
                  "type": "file"
                }
              }
            },
            "serverId": "544",
            "inputsValues": {
              "POSCAR": {
                "type": "ref",
                "content": [
                  "data-slot_0",
                  "POSCAR"
                ],
                "extra": {
                  "index": 0
                }
              },
              "KPOINTS": {
                "type": "ref",
                "content": [
                  "data-slot_0",
                  "KPOINTS"
                ],
                "extra": {
                  "index": 1
                }
              },
              "INCAR": {
                "type": "ref",
                "content": [
                  "data-slot_0",
                  "INCAR"
                ],
                "extra": {
                  "index": 2
                }
              },
              "POTCAR": {
                "type": "ref",
                "content": [
                  "data-slot_0",
                  "POTCAR"
                ],
                "extra": {
                  "index": 3
                }
              }
            },
            "outputsValues": {},
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
                  "required": true,
                  "id": "549"
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
                  "required": true,
                  "id": "550"
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
                  "required": true,
                  "id": "551"
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
                  "required": true,
                  "id": "552"
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
                  "required": false,
                  "id": "548"
                }
              ]
            }
          }
        },
        {
          "id": "data-slot_1",
          "type": "data-slot",
          "meta": {
            "position": {
              "x": 0,
              "y": 510
            }
          },
          "data": {
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
                  "required": true,
                  "id": "549"
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
                  "required": true,
                  "id": "550"
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
                  "required": true,
                  "id": "551"
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
                  "required": true,
                  "id": "552"
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
                  "required": false,
                  "id": "548"
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
            "serverId": "547",
            "from": "outputs",
            "inputTools": {
              "CONTCAR": {
                "tools": [
                  {
                    "id": "2",
                    "name": "Uploader",
                    "description": "文件上传工具",
                    "type": "file_generator",
                    "inputs": "singular",
                    "outputs": "singular",
                    "input_validation": [
                      {
                        "rule": "ALL",
                        "description": ""
                      }
                    ],
                    "output_validation": []
                  },
                  {
                    "id": "1",
                    "name": "Vesta",
                    "description": "晶格可视工具",
                    "type": "visualization",
                    "inputs": "plural",
                    "outputs": "singular",
                    "input_validation": [
                      {
                        "rule": "FILE_URL",
                        "description": "有效的文件路径"
                      },
                      {
                        "rule": "POSCAR_FILE",
                        "description": "POSCAR格式的结构文件"
                      }
                    ],
                    "output_validation": [
                      {
                        "rule": "FILE_URL",
                        "description": "有效的文件路径"
                      },
                      {
                        "rule": "POSCAR_FILE",
                        "description": "POSCAR格式的结构文件"
                      }
                    ]
                  }
                ]
              }
            },
            "inputRadio": "CONTCAR"
          }
        },
        {
          "id": "end_0",
          "type": "end",
          "meta": {
            "position": {
              "x": -42,
              "y": 637
            }
          },
          "data": {
            "title": "End"
          }
        }
      ],
    "edges":
      [
        {
          "sourceNodeID": "data-slot_0",
          "targetNodeID": "workflow_0"
        },
        {
          "sourceNodeID": "workflow_0",
          "targetNodeID": "data-slot_1"
        }
      ]
  }
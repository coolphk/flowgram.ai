import {FlowDocumentJSON} from './typings';

export const initialData: FlowDocumentJSON =
  {
    "nodes": [
      {
        "id": "data-slot_0",
        "type": "data-slot",
        "meta": {
          "position": {
            "x": -1084,
            "y": -885
          }
        },
        "data": {
          "title": "单质单胞初始结构",
          "serverId": "120",
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
            },
            "KPOINTS": {
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
                }
              ]
            },
            "INCAR": {
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
                }
              ]
            },
            "POTCAR": {
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
                }
              ]
            }
          },
          "outputRadio": "POTCAR"
        }
      },
      {
        "id": "workflow_0",
        "type": "workflow",
        "meta": {
          "position": {
            "x": -634,
            "y": -886
          }
        },
        "data": {
          "title": "单质单胞弛豫",
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
          "serverId": "118",
          "inputsValues": {
            "POSCAR": {
              "type": "ref",
              "content": [
                "data-slot_fn_wb",
                "POSCAR"
              ],
              "extra": {
                "index": 0
              }
            },
            "KPOINTS": {
              "type": "ref",
              "content": [
                "data-slot_fn_wb",
                "KPOINTS"
              ],
              "extra": {
                "index": 1
              }
            },
            "INCAR": {
              "type": "ref",
              "content": [
                "data-slot_fn_wb",
                "INCAR"
              ],
              "extra": {
                "index": 2
              }
            },
            "POTCAR": {
              "type": "ref",
              "content": [
                "data-slot_fn_wb",
                "POTCAR"
              ],
              "extra": {
                "index": 3
              }
            }
          },
          "outputsValues": {},
          "rawData": {
            "id": "4d81497c-7dcb-4e47-a662-4cf974231eba",
            "name": "vasp_relax_mock",
            "description": "使用VASP进行结构弛豫，演示用",
            "tags": [
              "演示",
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
                "id": "139"
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
                "id": "140"
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
                "id": "141"
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
                "id": "142"
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
                "id": "123"
              }
            ]
          }
        }
      },
      {
        "id": "data-slot_6pkpt",
        "type": "data-slot",
        "meta": {
          "position": {
            "x": -192,
            "y": -885.5
          }
        },
        "data": {
          "title": "单质单胞弛豫后结构",
          "serverId": "122",
          "rawData": {
            "id": "4d81497c-7dcb-4e47-a662-4cf974231eba",
            "name": "vasp_relax_mock",
            "description": "使用VASP进行结构弛豫，演示用",
            "tags": [
              "演示",
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
                "id": "139"
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
                "id": "140"
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
                "id": "141"
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
                "id": "142"
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
                "id": "123"
              }
            ]
          },
          "from": "outputs",
          "inputs": {
            "type": "object",
            "properties": {
              "CONTCAR": {
                "type": "file"
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
          "outputTools": {
            "CONTCAR": {
              "tools": [
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
          "outputRadio": "CONTCAR"
        }
      },
      {
        "id": "workflow-vFJEc",
        "type": "workflow",
        "meta": {
          "position": {
            "x": 235,
            "y": -886
          }
        },
        "data": {
          "title": "单质单胞自洽",
          "inputs": {
            "type": "object",
            "properties": {
              "POSCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 0
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "KPOINTS": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 1
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "INCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 2
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "POTCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 3
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              }
            }
          },
          "outputs": {
            "type": "object",
            "properties": {
              "CONTCAR": {
                "type": "file"
              },
              "OUTCAR": {
                "type": "file"
              },
              "CHGCAR": {
                "type": "file"
              },
              "WAVECAR": {
                "type": "file"
              }
            }
          },
          "serverId": "124",
          "preDataSlotId": "123",
          "inputsValues": {
            "POSCAR": {
              "type": "constant",
              "content": ""
            },
            "KPOINTS": {
              "type": "constant",
              "content": ""
            },
            "INCAR": {
              "type": "constant",
              "content": ""
            },
            "POTCAR": {
              "type": "constant",
              "content": ""
            }
          },
          "outputsValues": {},
          "rawData": {
            "id": "36d8b1cc-0888-49a9-bbdb-3958e30b3b1d",
            "name": "vasp_mock_scf",
            "description": "使用VASP进行电子自洽，演示用",
            "tags": [
              "演示",
              "vasp",
              "自洽"
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
                "required": false,
                "id": "165"
              },
              {
                "name": "OUTCAR",
                "type": "file",
                "description": "OUTCAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "166"
              },
              {
                "name": "CHGCAR",
                "type": "file",
                "description": "CHGCAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "167"
              },
              {
                "name": "WAVECAR",
                "type": "file",
                "description": "WAVECAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "168"
              }
            ]
          }
        }
      },
      {
        "id": "data-slot_fn_wb",
        "type": "data-slot",
        "meta": {
          "position": {
            "x": -1084,
            "y": -733
          }
        },
        "data": {
          "title": "单胞初始结构",
          "serverId": "138",
          "rawData": {
            "id": "4d81497c-7dcb-4e47-a662-4cf974231eba",
            "name": "vasp_relax_mock",
            "description": "使用VASP进行结构弛豫，演示用",
            "tags": [
              "演示",
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
                "id": "139"
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
                "id": "140"
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
                "id": "141"
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
                "id": "142"
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
                "id": "123"
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
          }
        }
      },
      {
        "id": "workflow-RuGjD",
        "type": "workflow",
        "meta": {
          "position": {
            "x": -634,
            "y": -733
          }
        },
        "data": {
          "title": "单胞弛豫",
          "inputs": {
            "type": "object",
            "properties": {
              "POSCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 0
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "KPOINTS": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 1
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "INCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 2
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "POTCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 3
                    },
                    "items": {
                      "type": "file"
                    }
                  }
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
          "serverId": "143",
          "inputsValues": {
            "POSCAR": {
              "type": "constant",
              "content": ""
            },
            "KPOINTS": {
              "type": "constant",
              "content": ""
            },
            "INCAR": {
              "type": "constant",
              "content": ""
            },
            "POTCAR": {
              "type": "constant",
              "content": ""
            }
          },
          "outputsValues": {},
          "rawData": {
            "id": "9700e802-2f63-4ec6-a11d-14c0dc39567e",
            "name": "vasp_relax_mock",
            "description": "使用VASP进行结构弛豫，演示用",
            "tags": [
              "演示",
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
                "required": false,
                "id": "149"
              }
            ]
          }
        }
      },
      {
        "id": "data-slot_ch8Bu",
        "type": "data-slot",
        "meta": {
          "position": {
            "x": -192,
            "y": -732.5
          }
        },
        "data": {
          "title": "单胞弛豫后结构",
          "serverId": "148",
          "rawData": {
            "id": "9700e802-2f63-4ec6-a11d-14c0dc39567e",
            "name": "vasp_relax_mock",
            "description": "使用VASP进行结构弛豫，演示用",
            "tags": [
              "演示",
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
                "required": false,
                "id": "149"
              }
            ]
          },
          "from": "outputs",
          "inputs": {
            "type": "object",
            "properties": {
              "CONTCAR": {
                "type": "file"
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
          "inputsValues": {
            "CONTCAR": {
              "type": "ref",
              "content": [
                "workflow-RuGjD",
                "CONTCAR"
              ],
              "extra": {
                "index": 0
              }
            }
          }
        }
      },
      {
        "id": "workflow-FZ424",
        "type": "workflow",
        "meta": {
          "position": {
            "x": 235,
            "y": -732
          }
        },
        "data": {
          "title": "单胞自洽",
          "inputs": {
            "type": "object",
            "properties": {
              "POSCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 0
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "KPOINTS": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 1
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "INCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 2
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "POTCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 3
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              }
            }
          },
          "outputs": {
            "type": "object",
            "properties": {
              "CONTCAR": {
                "type": "file"
              },
              "OUTCAR": {
                "type": "file"
              },
              "CHGCAR": {
                "type": "file"
              },
              "WAVECAR": {
                "type": "file"
              }
            }
          },
          "serverId": "150",
          "preDataSlotId": "149",
          "inputsValues": {
            "POSCAR": {
              "type": "constant",
              "content": ""
            },
            "KPOINTS": {
              "type": "constant",
              "content": ""
            },
            "INCAR": {
              "type": "constant",
              "content": ""
            },
            "POTCAR": {
              "type": "constant",
              "content": ""
            }
          },
          "outputsValues": {},
          "rawData": {
            "id": "36d8b1cc-0888-49a9-bbdb-3958e30b3b1d",
            "name": "vasp_mock_scf",
            "description": "使用VASP进行电子自洽，演示用",
            "tags": [
              "演示",
              "vasp",
              "自洽"
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
                "required": false,
                "id": "157"
              },
              {
                "name": "OUTCAR",
                "type": "file",
                "description": "OUTCAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "158"
              },
              {
                "name": "CHGCAR",
                "type": "file",
                "description": "CHGCAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "159"
              },
              {
                "name": "WAVECAR",
                "type": "file",
                "description": "WAVECAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "160"
              }
            ]
          }
        }
      },
      {
        "id": "data-slot_LjRfT",
        "type": "data-slot",
        "meta": {
          "position": {
            "x": 742.1752661840505,
            "y": -731.5
          }
        },
        "data": {
          "title": "单胞自洽后输出与结构",
          "serverId": "151",
          "rawData": {
            "id": "36d8b1cc-0888-49a9-bbdb-3958e30b3b1d",
            "name": "vasp_mock_scf",
            "description": "使用VASP进行电子自洽，演示用",
            "tags": [
              "演示",
              "vasp",
              "自洽"
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
                "required": false,
                "id": "157"
              },
              {
                "name": "OUTCAR",
                "type": "file",
                "description": "OUTCAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "158"
              },
              {
                "name": "CHGCAR",
                "type": "file",
                "description": "CHGCAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "159"
              },
              {
                "name": "WAVECAR",
                "type": "file",
                "description": "WAVECAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "160"
              }
            ]
          },
          "from": "outputs",
          "inputs": {
            "type": "object",
            "properties": {
              "CONTCAR": {
                "type": "file"
              },
              "OUTCAR": {
                "type": "file"
              },
              "CHGCAR": {
                "type": "file"
              },
              "WAVECAR": {
                "type": "file"
              }
            }
          },
          "outputs": {
            "type": "object",
            "properties": {
              "CONTCAR": {
                "type": "file"
              },
              "OUTCAR": {
                "type": "file"
              },
              "CHGCAR": {
                "type": "file"
              },
              "WAVECAR": {
                "type": "file"
              }
            }
          },
          "inputsValues": {
            "CONTCAR": {
              "type": "ref",
              "content": [
                "workflow-FZ424",
                "CONTCAR"
              ],
              "extra": {
                "index": 0
              }
            },
            "OUTCAR": {
              "type": "ref",
              "content": [
                "workflow-FZ424",
                "OUTCAR"
              ],
              "extra": {
                "index": 1
              }
            },
            "CHGCAR": {
              "type": "ref",
              "content": [
                "workflow-FZ424",
                "CHGCAR"
              ],
              "extra": {
                "index": 2
              }
            },
            "WAVECAR": {
              "type": "ref",
              "content": [
                "workflow-FZ424",
                "WAVECAR"
              ],
              "extra": {
                "index": 3
              }
            }
          }
        }
      },
      {
        "id": "workflow-YozPB",
        "type": "workflow",
        "meta": {
          "position": {
            "x": 1273.5905423499757,
            "y": -886
          }
        },
        "data": {
          "title": "化学势计算",
          "inputs": {
            "type": "object",
            "properties": {
              "POSCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 0
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "KPOINTS": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 1
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "INCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 2
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "POTCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 3
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "WAVECAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 4
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              },
              "CHGCAR": {
                "type": "object",
                "properties": {
                  "POSCAR": {
                    "type": "array",
                    "extra": {
                      "index": 5
                    },
                    "items": {
                      "type": "file"
                    }
                  }
                }
              }
            }
          },
          "outputs": {
            "type": "object",
            "properties": {
              "OUTCAR": {
                "type": "file"
              },
              "PROCAR": {
                "type": "file"
              },
              "EIGENVAL": {
                "type": "file"
              }
            }
          },
          "serverId": "161",
          "preDataSlotId": "158",
          "inputsValues": {
            "POSCAR": {
              "type": "constant",
              "content": ""
            },
            "KPOINTS": {
              "type": "constant",
              "content": ""
            },
            "INCAR": {
              "type": "constant",
              "content": ""
            },
            "POTCAR": {
              "type": "constant",
              "content": ""
            },
            "WAVECAR": {
              "type": "constant",
              "content": ""
            },
            "CHGCAR": {
              "type": "constant",
              "content": ""
            }
          },
          "outputsValues": {},
          "rawData": {
            "id": "a88c22ee-ceab-4424-ada3-cf314edf5bc4",
            "name": "vasp_mock_band",
            "description": "使用VASP进行能带计算，演示用",
            "tags": [
              "演示",
              "vasp",
              "能带计算"
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
                "description": "KPOINTS文件的MinIO URL，定义能带路径的高对称k点（如Γ-X-M-Γ），通常比自洽计算的k点更密集。",
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
              },
              {
                "name": "WAVECAR",
                "type": "string",
                "description": "WAVECAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  },
                  {
                    "rule": "WAVECAR_FILE",
                    "description": "WAVECAR文件"
                  }
                ],
                "required": false
              },
              {
                "name": "CHGCAR",
                "type": "string",
                "description": "CHGCAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  },
                  {
                    "rule": "CHGCAR_FILE",
                    "description": "CHGCAR文件"
                  }
                ],
                "required": false
              }
            ],
            "outputs": [
              {
                "name": "OUTCAR",
                "type": "file",
                "description": "OUTCAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false
              },
              {
                "name": "PROCAR",
                "type": "file",
                "description": "轨道投影信息（用于Fat Bands分析）",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false
              },
              {
                "name": "EIGENVAL",
                "type": "file",
                "description": "用于提取能带数据",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false
              }
            ]
          }
        }
      },
      {
        "id": "workflow-D07Gl",
        "type": "workflow",
        "meta": {
          "position": {
            "x": 1273.5905423499757,
            "y": -577.3613581171309
          }
        },
        "data": {
          "title": "能带计算",
          "inputs": {
            "type": "object",
            "properties": {}
          },
          "outputs": {
            "type": "object",
            "properties": {}
          },
          "serverId": "162",
          "preDataSlotId": "157"
        }
      },
      {
        "id": "data-slot_RAJzw",
        "type": "data-slot",
        "meta": {
          "position": {
            "x": 732.1364514477846,
            "y": -885.5
          }
        },
        "data": {
          "title": "单质单胞自治后输出",
          "serverId": "164",
          "rawData": {
            "id": "36d8b1cc-0888-49a9-bbdb-3958e30b3b1d",
            "name": "vasp_mock_scf",
            "description": "使用VASP进行电子自洽，演示用",
            "tags": [
              "演示",
              "vasp",
              "自洽"
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
                "required": false,
                "id": "165"
              },
              {
                "name": "OUTCAR",
                "type": "file",
                "description": "OUTCAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "166"
              },
              {
                "name": "CHGCAR",
                "type": "file",
                "description": "CHGCAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "167"
              },
              {
                "name": "WAVECAR",
                "type": "file",
                "description": "WAVECAR文件",
                "validation": [
                  {
                    "rule": "FILE_URL",
                    "description": "有效的文件路径"
                  }
                ],
                "required": false,
                "id": "168"
              }
            ]
          },
          "from": "outputs",
          "inputs": {
            "type": "object",
            "properties": {
              "CONTCAR": {
                "type": "file"
              },
              "OUTCAR": {
                "type": "file"
              },
              "CHGCAR": {
                "type": "file"
              },
              "WAVECAR": {
                "type": "file"
              }
            }
          },
          "outputs": {
            "type": "object",
            "properties": {
              "CONTCAR": {
                "type": "file"
              },
              "OUTCAR": {
                "type": "file"
              },
              "CHGCAR": {
                "type": "file"
              },
              "WAVECAR": {
                "type": "file"
              }
            }
          },
          "inputsValues": {
            "CONTCAR": {
              "type": "ref",
              "content": [
                "workflow-vFJEc",
                "CONTCAR"
              ],
              "extra": {
                "index": 0
              }
            },
            "OUTCAR": {
              "type": "ref",
              "content": [
                "workflow-vFJEc",
                "OUTCAR"
              ],
              "extra": {
                "index": 1
              }
            },
            "CHGCAR": {
              "type": "ref",
              "content": [
                "workflow-vFJEc",
                "CHGCAR"
              ],
              "extra": {
                "index": 2
              }
            },
            "WAVECAR": {
              "type": "ref",
              "content": [
                "workflow-vFJEc",
                "WAVECAR"
              ],
              "extra": {
                "index": 3
              }
            }
          }
        }
      }
    ],
    "edges": [
      {
        "sourceNodeID": "data-slot_0",
        "targetNodeID": "workflow_0"
      },
      {
        "sourceNodeID": "workflow_0",
        "targetNodeID": "data-slot_6pkpt"
      },
      {
        "sourceNodeID": "data-slot_6pkpt",
        "targetNodeID": "workflow-vFJEc"
      },
      {
        "sourceNodeID": "workflow-vFJEc",
        "targetNodeID": "data-slot_RAJzw"
      },
      {
        "sourceNodeID": "data-slot_fn_wb",
        "targetNodeID": "workflow-RuGjD"
      },
      {
        "sourceNodeID": "workflow-RuGjD",
        "targetNodeID": "data-slot_ch8Bu"
      },
      {
        "sourceNodeID": "data-slot_ch8Bu",
        "targetNodeID": "workflow-FZ424"
      },
      {
        "sourceNodeID": "workflow-FZ424",
        "targetNodeID": "data-slot_LjRfT"
      },
      {
        "sourceNodeID": "data-slot_LjRfT",
        "targetNodeID": "workflow-YozPB"
      },
      {
        "sourceNodeID": "data-slot_LjRfT",
        "targetNodeID": "workflow-D07Gl"
      },
      {
        "sourceNodeID": "data-slot_RAJzw",
        "targetNodeID": "workflow-YozPB"
      }
    ]
  }
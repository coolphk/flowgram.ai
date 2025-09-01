import { FlowDocumentJSON } from './typings';

export const initialData: FlowDocumentJSON =
{
  "nodes": [
    {
      "id": "data-slot_0",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": -1198.286277523775,
          "y": -1284.1875667842014
        }
      },
      "data": {
        "title": "单质单胞初始结构",
        "serverId": "86",
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
        "outputRadio": "POSCAR"
      }
    },
    {
      "id": "workflow_0",
      "type": "workflow",
      "meta": {
        "position": {
          "x": -1198.286277523775,
          "y": -1123.2525254923937
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
        "serverId": "99",
        "inputsValues": {
          "POSCAR": {
            "type": "ref",
            "content": [
              "data-slot_0",
              "POSCAR"
            ]
          },
          "KPOINTS": {
            "type": "ref",
            "content": [
              "data-slot_0",
              "KPOINTS"
            ]
          },
          "INCAR": {
            "type": "ref",
            "content": [
              "data-slot_0",
              "INCAR"
            ]
          },
          "POTCAR": {
            "type": "ref",
            "content": [
              "data-slot_0",
              "POTCAR"
            ]
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
              "required": false
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
          "x": -1198.286277523775,
          "y": -956.3864252995567
        }
      },
      "data": {
        "title": "单质单胞弛豫后结构",
        "serverId": "88",
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
              "id": "14"
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
          "x": -1198.286277523775,
          "y": -770.0737143377155
        }
      },
      "data": {
        "title": "单质单胞自洽",
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
            },
            "OUTCAR": {
              "type": "file"
            },
            "CHGCAR": {
              "type": "file"
            },
            "WAVECAR": {
              "type": "file"
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
              "type": "file"
            }
          }
        },
        "serverId": "100",
        "preDataSlotId": "14",
        "inputsValues": {
          "POSCAR": {
            "type": "ref",
            "content": [
              "data-slot_6pkpt",
              "CONTCAR"
            ]
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
              "id": "332"
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
              "id": "333"
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
              "id": "334"
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
              "id": "335"
            },
            {
              "name": "DOSCAR",
              "type": "file",
              "description": "DOSCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "336"
            },
            {
              "name": "EIGENVAL",
              "type": "file",
              "description": "EIGENVAL文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "337"
            },
            {
              "name": "LOCPOT",
              "type": "file",
              "description": "LOCPOT文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "338"
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
          "x": -785.8784121956513,
          "y": -1284.1875667842014
        }
      },
      "data": {
        "title": "单胞初始结构",
        "serverId": "87",
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
          "x": -785.8784121956513,
          "y": -1123.2525254923937
        }
      },
      "data": {
        "title": "单胞弛豫",
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
        "serverId": "101",
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
              "required": false
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
          "x": -785.8784121956513,
          "y": -956.3864252995567
        }
      },
      "data": {
        "title": "单胞弛豫后结构",
        "serverId": "89",
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
              "id": "19"
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
          "x": -785.8784121956513,
          "y": -770.0737143377155
        }
      },
      "data": {
        "title": "单胞自洽",
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
            },
            "OUTCAR": {
              "type": "file"
            },
            "CHGCAR": {
              "type": "file"
            },
            "WAVECAR": {
              "type": "file"
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
              "type": "file"
            }
          }
        },
        "serverId": "103",
        "preDataSlotId": "19",
        "inputsValues": {
          "POSCAR": {
            "type": "ref",
            "content": [
              "data-slot_ch8Bu",
              "CONTCAR"
            ]
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
              "id": "347"
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
              "id": "348"
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
              "id": "349"
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
              "id": "350"
            },
            {
              "name": "DOSCAR",
              "type": "file",
              "description": "DOSCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "351"
            },
            {
              "name": "EIGENVAL",
              "type": "file",
              "description": "EIGENVAL文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "352"
            },
            {
              "name": "LOCPOT",
              "type": "file",
              "description": "LOCPOT文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "353"
            }
          ]
        }
      }
    },
    {
      "id": "workflow-YozPB",
      "type": "workflow",
      "meta": {
        "position": {
          "x": -93.63171051176819,
          "y": -119.18761682220531
        }
      },
      "data": {
        "title": "形成能计算",
        "inputs": {
          "type": "object",
          "properties": {
            "outcar_perfect": {
              "type": "file",
              "extra": {
                "index": 0
              }
            },
            "poscar_perfect": {
              "type": "file",
              "extra": {
                "index": 1
              }
            },
            "doscar_perfect": {
              "type": "file",
              "extra": {
                "index": 2
              }
            },
            "eigenval_perfect": {
              "type": "file",
              "extra": {
                "index": 3
              }
            },
            "locpot_perfect": {
              "type": "file",
              "extra": {
                "index": 4
              }
            },
            "outcar_defect_files": {
              "type": "file",
              "extra": {
                "index": 5
              }
            },
            "poscar_defect_files": {
              "type": "file",
              "extra": {
                "index": 6
              }
            },
            "chgcar_defect_files": {
              "type": "file",
              "extra": {
                "index": 7
              }
            },
            "locpot_defect_files": {
              "type": "file",
              "extra": {
                "index": 8
              }
            },
            "outcar_elements": {
              "type": "file",
              "extra": {
                "index": 9
              }
            },
            "outcar_dielectric": {
              "type": "file",
              "extra": {
                "index": 10
              }
            },
            "correction_method": {
              "type": "file",
              "extra": {
                "index": 11
              }
            },
            "fermi_level_range": {
              "type": "file",
              "extra": {
                "index": 12
              }
            }
          }
        },
        "outputs": {
          "type": "object",
          "properties": {
            "extracted_data": {
              "type": "file"
            },
            "chemical_potentials": {
              "type": "file"
            },
            "corrections": {
              "type": "file"
            },
            "formation_energies": {
              "type": "file"
            },
            "transition_levels": {
              "type": "file"
            }
          }
        },
        "serverId": "102",
        "preDataSlotId": "20",
        "inputsValues": {
          "outcar_perfect": {
            "type": "constant",
            "content": ""
          },
          "poscar_perfect": {
            "type": "constant",
            "content": ""
          },
          "doscar_perfect": {
            "type": "constant",
            "content": ""
          },
          "eigenval_perfect": {
            "type": "constant",
            "content": ""
          },
          "locpot_perfect": {
            "type": "constant",
            "content": ""
          },
          "outcar_defect_files": {
            "type": "constant",
            "content": ""
          },
          "poscar_defect_files": {
            "type": "constant",
            "content": ""
          },
          "chgcar_defect_files": {
            "type": "constant",
            "content": ""
          },
          "locpot_defect_files": {
            "type": "constant",
            "content": ""
          },
          "outcar_elements": {
            "type": "ref",
            "content": [
              "data-slot_RAJzw",
              "OUTCAR"
            ]
          },
          "outcar_dielectric": {
            "type": "constant",
            "content": ""
          },
          "correction_method": {
            "type": "constant",
            "content": ""
          },
          "fermi_level_range": {
            "type": "constant",
            "content": ""
          }
        },
        "outputsValues": {},
        "rawData": {
          "id": "5f84d128-c67e-4025-89c0-af93b32da7f1",
          "name": "defect_computation_workflow",
          "description": "缺陷计算工作流 - 计算模块，包含数据提取、化学势计算、能量修正、形成能计算和跃迁能级计算。https://www.notion.so/25d3e5a37713801e9625f2cda2eeb73a",
          "tags": [
            "defect",
            "computation",
            "VASP",
            "materials_science"
          ],
          "version": "1.0.0",
          "inputs": [
            {
              "name": "outcar_perfect",
              "type": "file",
              "description": "完美超胞OUTCAR文件",
              "validation": [],
              "required": true
            },
            {
              "name": "poscar_perfect",
              "type": "file",
              "description": "完美超胞POSCAR文件",
              "validation": [],
              "required": true
            },
            {
              "name": "doscar_perfect",
              "type": "file",
              "description": "完美超胞DOSCAR文件",
              "validation": [],
              "required": true
            },
            {
              "name": "eigenval_perfect",
              "type": "file",
              "description": "完美超胞EIGENVAL文件",
              "validation": [],
              "required": true
            },
            {
              "name": "locpot_perfect",
              "type": "file",
              "description": "完美超胞LOCPOT文件",
              "validation": [],
              "required": true
            },
            {
              "name": "outcar_defect_files",
              "type": "file",
              "description": "缺陷超胞OUTCAR文件，支持单文件路径或JSON格式文件列表",
              "validation": [],
              "required": true
            },
            {
              "name": "poscar_defect_files",
              "type": "file",
              "description": "缺陷超胞POSCAR文件，支持单文件路径或JSON格式文件列表",
              "validation": [],
              "required": true
            },
            {
              "name": "chgcar_defect_files",
              "type": "file",
              "description": "缺陷超胞CHGCAR文件，支持单文件路径或JSON格式文件列表",
              "validation": [],
              "required": true
            },
            {
              "name": "locpot_defect_files",
              "type": "file",
              "description": "缺陷超胞LOCPOT文件，支持单文件路径或JSON格式文件列表",
              "validation": [],
              "required": true
            },
            {
              "name": "outcar_elements",
              "type": "file",
              "description": "单质参考态OUTCAR文件，支持单文件路径或JSON格式文件列表",
              "validation": [],
              "required": true
            },
            {
              "name": "outcar_dielectric",
              "type": "file",
              "description": "介电常数计算OUTCAR文件",
              "validation": [],
              "required": true
            },
            {
              "name": "correction_method",
              "type": "string",
              "description": "能量修正方法",
              "validation": [],
              "required": false
            },
            {
              "name": "fermi_level_range",
              "type": "array",
              "description": "费米能级范围 [min, max] (eV)",
              "validation": [],
              "required": false
            }
          ],
          "outputs": [
            {
              "name": "extracted_data",
              "type": "file",
              "description": "从VASP文件提取的原始数据JSON文件",
              "validation": [],
              "required": false
            },
            {
              "name": "chemical_potentials",
              "type": "file",
              "description": "化学势计算结果JSON文件",
              "validation": [],
              "required": false
            },
            {
              "name": "corrections",
              "type": "file",
              "description": "能量修正计算结果JSON文件",
              "validation": [],
              "required": false
            },
            {
              "name": "formation_energies",
              "type": "file",
              "description": "缺陷形成能计算结果JSON文件",
              "validation": [],
              "required": false
            },
            {
              "name": "transition_levels",
              "type": "file",
              "description": "电荷跃迁能级计算结果JSON文件",
              "validation": [],
              "required": false
            }
          ]
        }
      }
    },
    {
      "id": "data-slot_RAJzw",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": -1198.286277523775,
          "y": -612.5863376438542
        }
      },
      "data": {
        "title": "单质单胞自治后输出",
        "serverId": "90",
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
              "id": "332"
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
              "id": "333"
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
              "id": "334"
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
              "id": "335"
            },
            {
              "name": "DOSCAR",
              "type": "file",
              "description": "DOSCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "336"
            },
            {
              "name": "EIGENVAL",
              "type": "file",
              "description": "EIGENVAL文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "337"
            },
            {
              "name": "LOCPOT",
              "type": "file",
              "description": "LOCPOT文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "338"
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
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
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
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
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
          },
          "DOSCAR": {
            "type": "ref",
            "content": [
              "workflow-vFJEc",
              "DOSCAR"
            ],
            "extra": {
              "index": 4
            }
          },
          "EIGENVAL": {
            "type": "ref",
            "content": [
              "workflow-vFJEc",
              "EIGENVAL"
            ],
            "extra": {
              "index": 5
            }
          },
          "LOCPOT": {
            "type": "ref",
            "content": [
              "workflow-vFJEc",
              "LOCPOT"
            ],
            "extra": {
              "index": 6
            }
          }
        }
      }
    },
    {
      "id": "workflow-bI3lP",
      "type": "workflow",
      "meta": {
        "position": {
          "x": -324.2842313197759,
          "y": -440.7255644788256
        }
      },
      "data": {
        "title": "介电常数计算",
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
            },
            "WAVECAR": {
              "type": "file",
              "extra": {
                "index": 4
              }
            }
          }
        },
        "outputs": {
          "type": "object",
          "properties": {
            "OUTCAR": {
              "type": "file"
            }
          }
        },
        "serverId": "75",
        "preDataSlotId": "271",
        "inputsValues": {
          "POSCAR": {
            "type": "ref",
            "content": [
              "data-slot_0BHid",
              "CONTCAR"
            ]
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
          }
        },
        "outputsValues": {},
        "rawData": {
          "id": "aeb73e88-7ef2-4b67-8c24-729da0829ded",
          "name": "vasp_mock_eps",
          "description": "使用VASP计算介电常数，演示用",
          "tags": [
            "演示",
            "vasp",
            "介电常数"
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
            }
          ]
        }
      }
    },
    {
      "id": "workflow-AT_aI",
      "type": "workflow",
      "meta": {
        "position": {
          "x": -324.2842313197759,
          "y": -770.0737143377155
        }
      },
      "data": {
        "title": "超胞自洽",
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
            },
            "OUTCAR": {
              "type": "file"
            },
            "CHGCAR": {
              "type": "file"
            },
            "WAVECAR": {
              "type": "file"
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
              "type": "file"
            }
          }
        },
        "serverId": "76",
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
              "id": "271"
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
              "id": "272"
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
              "id": "273"
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
              "id": "274"
            },
            {
              "name": "DOSCAR",
              "type": "file",
              "description": "DOSCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "275"
            },
            {
              "name": "EIGENVAL",
              "type": "file",
              "description": "EIGENVAL文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "276"
            },
            {
              "name": "LOCPOT",
              "type": "file",
              "description": "LOCPOT文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "277"
            }
          ]
        }
      }
    },
    {
      "id": "data-slot_0BHid",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": -324.2842313197759,
          "y": -612.5863376438542
        }
      },
      "data": {
        "title": "完美超胞自洽后结构",
        "serverId": "91",
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
              "id": "271"
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
              "id": "272"
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
              "id": "273"
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
              "id": "274"
            },
            {
              "name": "DOSCAR",
              "type": "file",
              "description": "DOSCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "275"
            },
            {
              "name": "EIGENVAL",
              "type": "file",
              "description": "EIGENVAL文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "276"
            },
            {
              "name": "LOCPOT",
              "type": "file",
              "description": "LOCPOT文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "277"
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
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
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
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
              "type": "file"
            }
          }
        },
        "inputsValues": {
          "CONTCAR": {
            "type": "ref",
            "content": [
              "workflow-AT_aI",
              "CONTCAR"
            ],
            "extra": {
              "index": 0
            }
          },
          "OUTCAR": {
            "type": "ref",
            "content": [
              "workflow-AT_aI",
              "OUTCAR"
            ],
            "extra": {
              "index": 1
            }
          },
          "CHGCAR": {
            "type": "ref",
            "content": [
              "workflow-AT_aI",
              "CHGCAR"
            ],
            "extra": {
              "index": 2
            }
          },
          "WAVECAR": {
            "type": "ref",
            "content": [
              "workflow-AT_aI",
              "WAVECAR"
            ],
            "extra": {
              "index": 3
            }
          },
          "DOSCAR": {
            "type": "ref",
            "content": [
              "workflow-AT_aI",
              "DOSCAR"
            ],
            "extra": {
              "index": 4
            }
          },
          "EIGENVAL": {
            "type": "ref",
            "content": [
              "workflow-AT_aI",
              "EIGENVAL"
            ],
            "extra": {
              "index": 5
            }
          },
          "LOCPOT": {
            "type": "ref",
            "content": [
              "workflow-AT_aI",
              "LOCPOT"
            ],
            "extra": {
              "index": 6
            }
          }
        }
      }
    },
    {
      "id": "data-slot_ZIHDy",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": 183.68202196940544,
          "y": -1284.1875667842014
        }
      },
      "data": {
        "title": "缺陷初始结构",
        "serverId": "92",
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
              "required": true,
              "id": "296"
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
              "id": "297"
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
              "id": "298"
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
              "id": "299"
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
              "id": "302"
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
      "id": "workflow-05rFg",
      "type": "workflow",
      "meta": {
        "position": {
          "x": 183.68202196940544,
          "y": -1122.2525254923937
        }
      },
      "data": {
        "title": "中性缺陷弛豫",
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
        "serverId": "77",
        "inputsValues": {
          "POSCAR": {
            "type": "ref",
            "content": [
              "data-slot_ZIHDy",
              "POSCAR"
            ],
            "extra": {
              "index": 0
            }
          },
          "KPOINTS": {
            "type": "ref",
            "content": [
              "data-slot_ZIHDy",
              "KPOINTS"
            ],
            "extra": {
              "index": 1
            }
          },
          "INCAR": {
            "type": "ref",
            "content": [
              "data-slot_ZIHDy",
              "INCAR"
            ],
            "extra": {
              "index": 2
            }
          },
          "POTCAR": {
            "type": "ref",
            "content": [
              "data-slot_ZIHDy",
              "POTCAR"
            ],
            "extra": {
              "index": 3
            }
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
              "required": true,
              "id": "296"
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
              "id": "297"
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
              "id": "298"
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
              "id": "299"
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
              "id": "302"
            }
          ]
        }
      }
    },
    {
      "id": "data-slot_U2HwR",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": 183.68202196940544,
          "y": -956.3864252995567
        }
      },
      "data": {
        "title": "中性弛豫后结构",
        "serverId": "93",
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
              "required": true,
              "id": "296"
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
              "id": "297"
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
              "id": "298"
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
              "id": "299"
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
              "id": "302"
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
              "workflow-05rFg",
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
      "id": "workflow-6ltlk",
      "type": "workflow",
      "meta": {
        "position": {
          "x": 183.68202196940544,
          "y": -769.0737143377155
        }
      },
      "data": {
        "title": "中性缺陷自洽",
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
            },
            "OUTCAR": {
              "type": "file"
            },
            "CHGCAR": {
              "type": "file"
            },
            "WAVECAR": {
              "type": "file"
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
              "type": "file"
            }
          }
        },
        "serverId": "79",
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
              "id": "312"
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
              "id": "313"
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
              "id": "314"
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
              "id": "315"
            },
            {
              "name": "DOSCAR",
              "type": "file",
              "description": "DOSCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "316"
            },
            {
              "name": "EIGENVAL",
              "type": "file",
              "description": "EIGENVAL文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "317"
            },
            {
              "name": "LOCPOT",
              "type": "file",
              "description": "LOCPOT文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "318"
            }
          ]
        },
        "preDataSlotId": "302"
      }
    },
    {
      "id": "data-slot_3eGNt",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": 183.68202196940544,
          "y": -612.5863376438542
        }
      },
      "data": {
        "title": "中性自洽后结构",
        "serverId": "82",
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
              "id": "312"
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
              "id": "313"
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
              "id": "314"
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
              "id": "315"
            },
            {
              "name": "DOSCAR",
              "type": "file",
              "description": "DOSCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "316"
            },
            {
              "name": "EIGENVAL",
              "type": "file",
              "description": "EIGENVAL文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "317"
            },
            {
              "name": "LOCPOT",
              "type": "file",
              "description": "LOCPOT文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "318"
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
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
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
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
              "type": "file"
            }
          }
        },
        "inputsValues": {
          "CONTCAR": {
            "type": "ref",
            "content": [
              "workflow-6ltlk",
              "CONTCAR"
            ],
            "extra": {
              "index": 0
            }
          },
          "OUTCAR": {
            "type": "ref",
            "content": [
              "workflow-6ltlk",
              "OUTCAR"
            ],
            "extra": {
              "index": 1
            }
          },
          "CHGCAR": {
            "type": "ref",
            "content": [
              "workflow-6ltlk",
              "CHGCAR"
            ],
            "extra": {
              "index": 2
            }
          },
          "WAVECAR": {
            "type": "ref",
            "content": [
              "workflow-6ltlk",
              "WAVECAR"
            ],
            "extra": {
              "index": 3
            }
          },
          "DOSCAR": {
            "type": "ref",
            "content": [
              "workflow-6ltlk",
              "DOSCAR"
            ],
            "extra": {
              "index": 4
            }
          },
          "EIGENVAL": {
            "type": "ref",
            "content": [
              "workflow-6ltlk",
              "EIGENVAL"
            ],
            "extra": {
              "index": 5
            }
          },
          "LOCPOT": {
            "type": "ref",
            "content": [
              "workflow-6ltlk",
              "LOCPOT"
            ],
            "extra": {
              "index": 6
            }
          }
        }
      }
    },
    {
      "id": "data-slot_SKgZ-",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": -785.8784121956513,
          "y": -612.5863376438542
        }
      },
      "data": {
        "title": "单质单胞自洽后结构",
        "serverId": "83",
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
              "id": "347"
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
              "id": "348"
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
              "id": "349"
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
              "id": "350"
            },
            {
              "name": "DOSCAR",
              "type": "file",
              "description": "DOSCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "351"
            },
            {
              "name": "EIGENVAL",
              "type": "file",
              "description": "EIGENVAL文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "352"
            },
            {
              "name": "LOCPOT",
              "type": "file",
              "description": "LOCPOT文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "353"
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
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
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
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
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
          },
          "DOSCAR": {
            "type": "ref",
            "content": [
              "workflow-FZ424",
              "DOSCAR"
            ],
            "extra": {
              "index": 4
            }
          },
          "EIGENVAL": {
            "type": "ref",
            "content": [
              "workflow-FZ424",
              "EIGENVAL"
            ],
            "extra": {
              "index": 5
            }
          },
          "LOCPOT": {
            "type": "ref",
            "content": [
              "workflow-FZ424",
              "LOCPOT"
            ],
            "extra": {
              "index": 6
            }
          }
        }
      }
    },
    {
      "id": "workflow-Yigk9",
      "type": "workflow",
      "meta": {
        "position": {
          "x": 677.9650779079954,
          "y": -1121.2525254923937
        }
      },
      "data": {
        "title": "带电缺陷弛豫",
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
        "serverId": "78",
        "preDataSlotId": "302",
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
              "id": "356"
            }
          ]
        }
      }
    },
    {
      "id": "data-slot_L1kz2",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": 677.9650779079954,
          "y": -964.3091442083634
        }
      },
      "data": {
        "title": "带电弛豫后结构",
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
              "workflow-Yigk9",
              "CONTCAR"
            ],
            "extra": {
              "index": 0
            }
          }
        },
        "serverId": "94",
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
              "id": "356"
            }
          ]
        }
      }
    },
    {
      "id": "workflow-YTh6n",
      "type": "workflow",
      "meta": {
        "position": {
          "x": 677.9650779079954,
          "y": -769.0737143377155
        }
      },
      "data": {
        "title": "带电缺陷自洽",
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
            },
            "OUTCAR": {
              "type": "file"
            },
            "CHGCAR": {
              "type": "file"
            },
            "WAVECAR": {
              "type": "file"
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
              "type": "file"
            }
          }
        },
        "serverId": "80",
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
              "id": "366"
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
              "id": "367"
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
              "id": "368"
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
              "id": "369"
            },
            {
              "name": "DOSCAR",
              "type": "file",
              "description": "DOSCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "370"
            },
            {
              "name": "EIGENVAL",
              "type": "file",
              "description": "EIGENVAL文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "371"
            },
            {
              "name": "LOCPOT",
              "type": "file",
              "description": "LOCPOT文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "372"
            }
          ]
        },
        "preDataSlotId": "356"
      }
    },
    {
      "id": "data-slot_i6c0X",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": 677.9650779079954,
          "y": -612.5863376438542
        }
      },
      "data": {
        "title": "带电自洽后结构",
        "serverId": "95",
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
              "id": "366"
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
              "id": "367"
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
              "id": "368"
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
              "id": "369"
            },
            {
              "name": "DOSCAR",
              "type": "file",
              "description": "DOSCAR文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "370"
            },
            {
              "name": "EIGENVAL",
              "type": "file",
              "description": "EIGENVAL文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "371"
            },
            {
              "name": "LOCPOT",
              "type": "file",
              "description": "LOCPOT文件",
              "validation": [
                {
                  "rule": "FILE_URL",
                  "description": "有效的文件路径"
                }
              ],
              "required": false,
              "id": "372"
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
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
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
            },
            "DOSCAR": {
              "type": "file"
            },
            "EIGENVAL": {
              "type": "file"
            },
            "LOCPOT": {
              "type": "file"
            }
          }
        },
        "inputsValues": {
          "CONTCAR": {
            "type": "ref",
            "content": [
              "workflow-YTh6n",
              "CONTCAR"
            ],
            "extra": {
              "index": 0
            }
          },
          "OUTCAR": {
            "type": "ref",
            "content": [
              "workflow-YTh6n",
              "OUTCAR"
            ],
            "extra": {
              "index": 1
            }
          },
          "CHGCAR": {
            "type": "ref",
            "content": [
              "workflow-YTh6n",
              "CHGCAR"
            ],
            "extra": {
              "index": 2
            }
          },
          "WAVECAR": {
            "type": "ref",
            "content": [
              "workflow-YTh6n",
              "WAVECAR"
            ],
            "extra": {
              "index": 3
            }
          },
          "DOSCAR": {
            "type": "ref",
            "content": [
              "workflow-YTh6n",
              "DOSCAR"
            ],
            "extra": {
              "index": 4
            }
          },
          "EIGENVAL": {
            "type": "ref",
            "content": [
              "workflow-YTh6n",
              "EIGENVAL"
            ],
            "extra": {
              "index": 5
            }
          },
          "LOCPOT": {
            "type": "ref",
            "content": [
              "workflow-YTh6n",
              "LOCPOT"
            ],
            "extra": {
              "index": 6
            }
          }
        }
      }
    },
    {
      "id": "workflow-x7yhN",
      "type": "workflow",
      "meta": {
        "position": {
          "x": -785.8784121956513,
          "y": -440.7255644788256
        }
      },
      "data": {
        "title": "能带计算",
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
            },
            "WAVECAR": {
              "type": "file",
              "extra": {
                "index": 4
              }
            },
            "CHGCAR": {
              "type": "file",
              "extra": {
                "index": 5
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
        "serverId": "81",
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
              "required": false,
              "id": "378"
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
              "required": false,
              "id": "379"
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
              "required": false,
              "id": "380"
            }
          ]
        },
        "preDataSlotId": "347"
      }
    },
    {
      "id": "data-slot_QPKvW",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": -785.8784121956513,
          "y": -259.71853127127116
        }
      },
      "data": {
        "title": "能带计算结果",
        "serverId": "96",
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
              "required": false,
              "id": "378"
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
              "required": false,
              "id": "379"
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
              "required": false,
              "id": "380"
            }
          ]
        },
        "from": "outputs",
        "inputs": {
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
        "inputsValues": {
          "OUTCAR": {
            "type": "ref",
            "content": [
              "workflow-x7yhN",
              "OUTCAR"
            ],
            "extra": {
              "index": 0
            }
          },
          "PROCAR": {
            "type": "ref",
            "content": [
              "workflow-x7yhN",
              "PROCAR"
            ],
            "extra": {
              "index": 1
            }
          },
          "EIGENVAL": {
            "type": "ref",
            "content": [
              "workflow-x7yhN",
              "EIGENVAL"
            ],
            "extra": {
              "index": 2
            }
          }
        }
      }
    },
    {
      "id": "data-slot_SSmPy",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": -324.2842313197759,
          "y": -1284.1875667842014
        }
      },
      "data": {
        "title": "扩胞并产生完美超胞初始结构",
        "serverId": "97",
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
              "required": true,
              "id": "459"
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
              "id": "460"
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
              "id": "461"
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
              "id": "462"
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
              "id": "27"
            }
          ]
        },
        "from": "inputs",
        "outputs": {
          "type": "object",
          "properties": {
            "POSCAR": {
              "type": "file"
            },
            "KPOINTS": {
              "type": "object",
              "properties": {
                "schema": {
                  "type": "object",
                  "properties": {}
                },
                "extra": {
                  "type": "object",
                  "properties": {}
                }
              }
            },
            "INCAR": {
              "type": "object",
              "properties": {
                "schema": {
                  "type": "object",
                  "properties": {}
                },
                "extra": {
                  "type": "object",
                  "properties": {}
                }
              }
            },
            "POTCAR": {
              "type": "object",
              "properties": {
                "schema": {
                  "type": "object",
                  "properties": {}
                },
                "extra": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "inputsValues": {
          "POSCAR": {
            "type": "ref",
            "content": [
              "data-slot_ch8Bu",
              "CONTCAR"
            ],
            "extra": {
              "index": 0
            }
          },
          "KPOINTS": {
            "type": "constant",
            "schema": {
              "type": "file"
            },
            "extra": {
              "index": 1
            }
          },
          "INCAR": {
            "type": "constant",
            "schema": {
              "type": "file"
            },
            "extra": {
              "index": 2
            }
          },
          "POTCAR": {
            "type": "constant",
            "schema": {
              "type": "file"
            },
            "extra": {
              "index": 3
            }
          }
        },
        "inputs": {
          "type": "object",
          "properties": {
            "POSCAR": {
              "type": "file"
            },
            "KPOINTS": {
              "type": "object",
              "properties": {
                "schema": {
                  "type": "object",
                  "properties": {}
                },
                "extra": {
                  "type": "object",
                  "properties": {}
                }
              }
            },
            "INCAR": {
              "type": "object",
              "properties": {
                "schema": {
                  "type": "object",
                  "properties": {}
                },
                "extra": {
                  "type": "object",
                  "properties": {}
                }
              }
            },
            "POTCAR": {
              "type": "object",
              "properties": {
                "schema": {
                  "type": "object",
                  "properties": {}
                },
                "extra": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        }
      }
    },
    {
      "id": "workflow-2yJiG",
      "type": "workflow",
      "meta": {
        "position": {
          "x": -324.2842313197759,
          "y": -1130.7230538007627
        }
      },
      "data": {
        "title": "超胞弛豫",
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
        "serverId": "84",
        "inputsValues": {
          "POSCAR": {
            "type": "ref",
            "content": [
              "data-slot_SSmPy",
              "POSCAR"
            ]
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
              "id": "465"
            }
          ]
        }
      }
    },
    {
      "id": "data-slot_ChinB",
      "type": "data-slot",
      "meta": {
        "position": {
          "x": -324.2842313197759,
          "y": -956.3864252995567
        }
      },
      "data": {
        "title": "data-slot",
        "serverId": "98",
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
              "id": "465"
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
              "workflow-2yJiG",
              "CONTCAR"
            ],
            "extra": {
              "index": 0
            }
          }
        }
      }
    }
  ],
  "edges": [
    {
      "sourceNodeID": "data-slot_0",
      "targetNodeID": "workflow_0",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "workflow_0",
      "targetNodeID": "data-slot_6pkpt",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    },
    {
      "sourceNodeID": "data-slot_6pkpt",
      "targetNodeID": "workflow-vFJEc",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "workflow-vFJEc",
      "targetNodeID": "data-slot_RAJzw",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    },
    {
      "sourceNodeID": "data-slot_fn_wb",
      "targetNodeID": "workflow-RuGjD",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "workflow-RuGjD",
      "targetNodeID": "data-slot_ch8Bu",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    },
    {
      "sourceNodeID": "data-slot_ch8Bu",
      "targetNodeID": "workflow-FZ424",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "data-slot_ch8Bu",
      "targetNodeID": "data-slot_SSmPy"
    },
    {
      "sourceNodeID": "workflow-FZ424",
      "targetNodeID": "data-slot_SKgZ-",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    },
    {
      "sourceNodeID": "data-slot_RAJzw",
      "targetNodeID": "workflow-YozPB",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "workflow-bI3lP",
      "targetNodeID": "workflow-YozPB",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "data-slot_3eGNt",
      "targetNodeID": "workflow-YozPB",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "data-slot_i6c0X",
      "targetNodeID": "workflow-YozPB",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "data-slot_0BHid",
      "targetNodeID": "workflow-bI3lP",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "workflow-AT_aI",
      "targetNodeID": "data-slot_0BHid",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    },
    {
      "sourceNodeID": "data-slot_ZIHDy",
      "targetNodeID": "workflow-05rFg",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "workflow-05rFg",
      "targetNodeID": "data-slot_U2HwR",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    },
    {
      "sourceNodeID": "data-slot_U2HwR",
      "targetNodeID": "workflow-6ltlk",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "data-slot_U2HwR",
      "targetNodeID": "workflow-Yigk9"
    },
    {
      "sourceNodeID": "workflow-6ltlk",
      "targetNodeID": "data-slot_3eGNt",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    },
    {
      "sourceNodeID": "data-slot_SKgZ-",
      "targetNodeID": "workflow-x7yhN",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "workflow-Yigk9",
      "targetNodeID": "data-slot_L1kz2",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    },
    {
      "sourceNodeID": "data-slot_L1kz2",
      "targetNodeID": "workflow-YTh6n",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "workflow-YTh6n",
      "targetNodeID": "data-slot_i6c0X",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    },
    {
      "sourceNodeID": "workflow-x7yhN",
      "targetNodeID": "data-slot_QPKvW",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    },
    {
      "sourceNodeID": "data-slot_SSmPy",
      "targetNodeID": "workflow-2yJiG",
      "sourcePortID": "data-slot-bottom",
      "targetPortID": "workflow-top"
    },
    {
      "sourceNodeID": "workflow-2yJiG",
      "targetNodeID": "data-slot_ChinB",
      "sourcePortID": "workflow-bottom",
      "targetPortID": "data-slot-top"
    }
  ]
}

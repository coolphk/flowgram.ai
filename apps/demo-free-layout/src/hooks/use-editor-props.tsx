/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable no-console */
import {useMemo} from "react";

import {debounce} from "lodash-es";
import {createMinimapPlugin} from "@flowgram.ai/minimap-plugin";
import {createFreeSnapPlugin} from "@flowgram.ai/free-snap-plugin";
import {createFreeNodePanelPlugin} from "@flowgram.ai/free-node-panel-plugin";
import {createFreeLinesPlugin} from "@flowgram.ai/free-lines-plugin";
import {FreeLayoutProps, getNodeForm, WorkflowNodeLinesData,} from "@flowgram.ai/free-layout-editor";
import {createFreeGroupPlugin} from "@flowgram.ai/free-group-plugin";
import {createContainerNodePlugin} from "@flowgram.ai/free-container-plugin";

import {onDragLineEnd} from "../utils";
import {FlowDocumentJSON, FlowNodeRegistry} from "../typings";
import {shortcuts} from "../shortcuts";
import {CustomService} from "../services";
import {WorkflowRuntimeService} from "../plugins/runtime-plugin/runtime-service";
import {
  createContextMenuPlugin,
  createRunHistoryPlugin,
  createRuntimePlugin,
  createVariablePanelPlugin,
} from "../plugins";
import {defaultFormMeta} from "../nodes/default-form-meta";
import {WorkflowNodeType} from "../nodes";
import {SelectorBoxPopover} from "../components/selector-box-popover";
import {BaseNode, CommentRender, GroupNodeRender, LineAddButton, NodePanel,} from "../components";
import {createTypePresetPlugin} from "@flowgram.ai/form-materials";
import {IconFile} from "@douyinfe/semi-icons";
import {Toast} from "@douyinfe/semi-ui";

const id = 'toastid';

export function useEditorProps(
  initialData: FlowDocumentJSON,
  nodeRegistries: FlowNodeRegistry[]
): FreeLayoutProps {
  return useMemo<FreeLayoutProps>(
    () => ({
      /**
       * Whether to enable the background
       */
      background: true,
      /**
       * Whether it is read-only or not, the node cannot be dragged in read-only mode
       */
      readonly: false,
      /**
       * Initial data
       * 初始化数据
       */
      initialData,
      /**
       * Node registries
       * 节点注册
       */
      nodeRegistries,
      /**
       * Get the default node registry, which will be merged with the 'nodeRegistries'
       * 提供默认的节点注册，这个会和 nodeRegistries 做合并
       */
      getNodeDefaultRegistry(type) {
        return {
          type,
          meta: {
            defaultExpanded: true,
          },
          formMeta: defaultFormMeta,
        };
      },
      /**
       * 节点数据转换, 由 ctx.document.fromJSON 调用
       * Node data transformation, called by ctx.document.fromJSON
       * @param node
       * @param json
       */
      fromNodeJSON(node, json) {
        return json;
      },
      /**
       * 节点数据转换, 由 ctx.document.toJSON 调用
       * Node data transformation, called by ctx.document.toJSON
       * @param node
       * @param json
       */
      toNodeJSON(node, json) {
        return json;
      },
      lineColor: {
        hidden: "var(--g-workflow-line-color-hidden,transparent)",
        default: "var(--g-workflow-line-color-default,#4d53e8)",
        drawing: "var(--g-workflow-line-color-drawing, #5DD6E3)",
        hovered: "var(--g-workflow-line-color-hover,#37d0ff)",
        selected: "var(--g-workflow-line-color-selected,#37d0ff)",
        error: "var(--g-workflow-line-color-error,red)",
        flowing: "var(--g-workflow-line-color-flowing,#4d53e8)",
      },
      /*
       * Check whether the line can be added
       * 判断是否连线
       */
      canAddLine(ctx, fromPort, toPort) {
        // Cannot be a self-loop on the same node / 不能是同一节点自循环
        // 获取当前节点类型
        // console.log("toPort", toPort);
        const nodeType = fromPort.node.flowNodeType;
        if (nodeType === WorkflowNodeType.DataSlot) {
          if (toPort.node.flowNodeType === WorkflowNodeType.Workflow) {
            const toNodeForm = getNodeForm(toPort.node)
            const fromNodeForm = getNodeForm(fromPort.node)
            if (toNodeForm?.values.rawData) {
              console.log(111, getNodeForm(fromPort.node));
              fromNodeForm?.setValueIn("validations", toNodeForm.getValueIn("validations"))
            } else {
              //用semiui中的message提示
              Toast.error({content: "请先选择工作流的模板类型", id})
              return false
            }
          }
        }
        if (nodeType === WorkflowNodeType.Workflow) {
          if (toPort.node.flowNodeType === WorkflowNodeType.DataSlot) {
            const toNodeForm = getNodeForm(toPort.node)
            if (toNodeForm?.values.rawData) {

            } else {
              //用semiui中的message提示
              Toast.error({content: "请先选择工作流的模板类型", id})
              return false
            }
          }
        }
        if (fromPort.node === toPort.node) {
          return false;
        }
        // Cannot be in different loop containers - 不能在不同 Loop 容器
        if (
          toPort.node.parent?.flowNodeType === WorkflowNodeType.Loop &&
          fromPort.node.parent?.id !== toPort.node.parent?.id
        ) {
          return false;
        }
        /**
         * 线条环检测，不允许连接到前面的节点
         * Line loop detection, which is not allowed to connect to the node in front of it
         */
        return !fromPort.node
          .getData(WorkflowNodeLinesData)
          .allInputNodes.includes(toPort.node);
      },
      /**
       * Check whether the line can be deleted, this triggers on the default shortcut `Bakspace` or `Delete`
       * 判断是否能删除连线, 这个会在默认快捷键 (Backspace or Delete) 触发
       */
      canDeleteLine(ctx, line, newLineInfo, silent) {
        return true;
      },
      /**
       * Check whether the node can be deleted, this triggers on the default shortcut `Bakspace` or `Delete`
       * 判断是否能删除节点, 这个会在默认快捷键 (Backspace or Delete) 触发
       */
      canDeleteNode(ctx, node) {
        return true;
      },
      canDropToNode: (ctx, params) => {
        const {dragNodeType, dropNodeType} = params;
        /**
         * 开始/结束节点无法更改容器
         * The start and end nodes cannot change container
         */
        if (
          [
            WorkflowNodeType.Start,
            WorkflowNodeType.End,
            WorkflowNodeType.BlockStart,
            WorkflowNodeType.BlockEnd,
          ].includes(dragNodeType as WorkflowNodeType)
        ) {
          return false;
        }
        /**
         * 继续循环与终止循环只能在循环节点中
         * Continue loop and break loop can only be in loop nodes
         */
        if (
          [WorkflowNodeType.Continue, WorkflowNodeType.Break].includes(
            dragNodeType as WorkflowNodeType
          ) &&
          dropNodeType !== WorkflowNodeType.Loop
        ) {
          return false;
        }
        return true;
      },
      /**
       * Drag the end of the line to create an add panel (feature optional)
       * 拖拽线条结束需要创建一个添加面板 （功能可选）
       */
      onDragLineEnd,
      /**
       * SelectBox config
       */
      selectBox: {
        SelectorBoxPopover,
      },
      scroll: {
        /**
         * Whether to restrict the node from rolling out of the canvas needs to be closed because there is a running results pane
         * 是否限制节点不能滚出画布，由于有运行结果面板，所以需要关闭
         */
        enableScrollLimit: false,
      },
      materials: {
        /**
         * Render Node
         */
        renderDefaultNode: BaseNode,
        renderNodes: {
          [WorkflowNodeType.Comment]: CommentRender,
        },
      },
      /**
       * Node engine enable, you can configure formMeta in the FlowNodeRegistry
       */
      nodeEngine: {
        enable: true,
      },
      /**
       * Variable engine enable
       */
      variableEngine: {
        enable: true,
      },
      /**
       * Redo/Undo enable
       */
      history: {
        enable: true,
        enableChangeNode: true, // Listen Node engine data change
      },
      /**
       * Content change
       */
      onContentChange: debounce((ctx, event) => {
        console.log("Auto Save: ", event, ctx.document.toJSON());

        // 转换函数：将ctx.document.toJSON()的数据转换为ISaveContent格式
        const convertToSaveContent = (documentData: any) => {
          const dataslots: any[] = [];
          const workflows: any[] = [];
          let raw = '';

          // 处理节点数据
          documentData.nodes.forEach((node: any) => {
            if (node.type === 'data-slot') {
              // 获取data-slot节点的serverId
              const serverId = node.data?.serverId || node.id;

              // 获取连接信息
              let from = '';
              let to = '';

              // 从edges中查找连接信息
              const incomingEdge = documentData.edges.find((edge: any) => edge.targetNodeID === node.id);
              const outgoingEdge = documentData.edges.find((edge: any) => edge.sourceNodeID === node.id);

              if (incomingEdge) {
                from = incomingEdge.sourceNodeID;
              }

              if (outgoingEdge) {
                to = outgoingEdge.targetNodeID;
              }

              dataslots.push({
                id: serverId,
                type: node.type,
                name: node.data?.title || '',
                description: '',
                validations: [],
                tools: [],
                from,
                to,
                uploadFiles: []
              });
            } else if (node.type === 'workflow') {
              // 获取workflow节点的serverId
              const serverId = node.data?.serverId || node.id;

              // 获取rawData作为raw
              raw = JSON.stringify(node.data?.rawData || {});

              workflows.push({
                id: serverId,
                type: node.type,
                inputs: node.data?.inputs || {},
                outputs: node.data?.outputs || {}
              });
            }
          });

          return {
            dataslots,
            workflows,
            raw
          };
        };

        // 使用转换函数
        const saveContent = convertToSaveContent(ctx.document.toJSON());
        console.log("Converted save content:", saveContent);

        /*{
    "nodes": [
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
                    "y": 300
                }
            },
            "data": {
                "title": "DataSlot",
                "serverId": "105"
            }
        },
        {
            "id": "workflow_0",
            "type": "workflow",
            "meta": {
                "position": {
                    "x": 0,
                    "y": 500
                }
            },
            "data": {
                "title": "Workflow",
                "inputs": {
                    "type": "object",
                    "properties": {
                        "POSCAR": {
                            "type": "file"
                        },
                        "KPOINTS": {
                            "type": "file"
                        },
                        "INCAR": {
                            "type": "file"
                        },
                        "POTCAR": {
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
                "serverId": "106",
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
                }
            }
        },
        {
            "id": "end_0",
            "type": "end",
            "meta": {
                "position": {
                    "x": 400,
                    "y": 681.75
                }
            },
            "data": {
                "title": "End"
            }
        }
    ],
    "edges": [
        {
            "sourceNodeID": "start_0",
            "targetNodeID": "data-slot_0"
        },
        {
            "sourceNodeID": "data-slot_0",
            "targetNodeID": "workflow_0"
        }
    ]
}*/
      }, 1000),
      /**
       * Running line
       */
      isFlowingLine: (ctx, line) =>
        ctx.get(WorkflowRuntimeService).isFlowingLine(line),

      /**
       * Shortcuts
       */
      shortcuts,
      /**
       * Bind custom service
       */
      onBind: ({bind}) => {
        bind(CustomService).toSelf().inSingletonScope();
      },
      /**
       * Playground init
       */
      onInit() {
        console.log("--- Playground init ---");
      },
      /**
       * Playground render
       */
      onAllLayersRendered(ctx) {
        // ctx.tools.autoLayout(); // init auto layout
        ctx.document.fitView(false); // init fit view

        console.log("--- Playground rendered ---");
        ctx.document.linesManager.onAvailableLinesChange(e => {} )
      },
      /**
       * Playground dispose
       */
      onDispose() {
        console.log("---- Playground Dispose ----");
      },
      i18n: {
        locale: navigator.language,
        languages: {
          "zh-CN": {
            "Never Remind": "不再提示",
            "Hold {{key}} to drag node out": "按住 {{key}} 可以将节点拖出",
          },
          "en-US": {},
        },
      },
      plugins: () => [
        /**
         * Line render plugin
         * 连线渲染插件
         */
        createFreeLinesPlugin({
          renderInsideLine: LineAddButton,
        }),
        /**
         * Minimap plugin
         * 缩略图插件
         */
        createMinimapPlugin({
          disableLayer: true,
          canvasStyle: {
            canvasWidth: 182,
            canvasHeight: 102,
            canvasPadding: 50,
            canvasBackground: "rgba(242, 243, 245, 1)",
            canvasBorderRadius: 10,
            viewportBackground: "rgba(255, 255, 255, 1)",
            viewportBorderRadius: 4,
            viewportBorderColor: "rgba(6, 7, 9, 0.10)",
            viewportBorderWidth: 1,
            viewportBorderDashLength: undefined,
            nodeColor: "rgba(0, 0, 0, 0.10)",
            nodeBorderRadius: 2,
            nodeBorderWidth: 0.145,
            nodeBorderColor: "rgba(6, 7, 9, 0.10)",
            overlayColor: "rgba(255, 255, 255, 0.55)",
          },
          inactiveDebounceTime: 1,
        }),

        /**
         * Snap plugin
         * 自动对齐及辅助线插件
         */
        createFreeSnapPlugin({
          edgeColor: "#00B2B2",
          alignColor: "#00B2B2",
          edgeLineWidth: 1,
          alignLineWidth: 1,
          alignCrossWidth: 8,
        }),
        /**
         * NodeAddPanel render plugin
         * 节点添加面板渲染插件
         */
        createFreeNodePanelPlugin({
          renderer: NodePanel,
        }),
        /**
         * This is used for the rendering of the loop node sub-canvas
         * 这个用于 loop 节点子画布的渲染
         */
        createContainerNodePlugin({}),
        /**
         * Group plugin
         */
        createFreeGroupPlugin({
          groupNodeRender: GroupNodeRender,
        }),
        /**
         * ContextMenu plugin
         */
        createContextMenuPlugin({}),
        createRuntimePlugin({
          // mode: 'browser',
          mode: "server",
          serverConfig: {
            domain: "localhost",
            port: 4000,
            protocol: "http",
          },
        }),

        /**
         * Variable panel plugin
         * 变量面板插件
         */
        createVariablePanelPlugin({}),

        /**
         * Run history plugin
         * 运行历史插件
         */
        createRunHistoryPlugin({}),
        createTypePresetPlugin({
          types: [
            {
              type: 'file',
              label: 'File',
              ConstantRenderer: () => {
                return (<span style={{marginLeft: '8px'}}>请选择输入来源</span>);
              },
              icon: <IconFile/>,
              container: false,
            },
          ],
        })
      ],
    }),
    []
  );
}

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
import {
  FreeLayoutProps,
  getNodeForm,
  WorkflowContentChangeType,
  WorkflowLineEntity,
  WorkflowNodeLinesData,
  WorkflowPortEntity,
} from "@flowgram.ai/free-layout-editor";
import {createFreeGroupPlugin} from "@flowgram.ai/free-group-plugin";
import {createContainerNodePlugin} from "@flowgram.ai/free-container-plugin";

import {onDragLineEnd} from "../utils";
import {FlowDocumentJSON, FlowNodeRegistry, SaveRequest, Workflow} from "../typings";
import {shortcuts} from "../shortcuts";
import {CustomService, WebSocketService} from "../services";
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
import {createTypePresetPlugin, IFlowValue} from "@flowgram.ai/form-materials";
import {IconFile} from "@douyinfe/semi-icons";
import {Toast} from "@douyinfe/semi-ui";
import {getUniqueId, save} from "../api/common";
import {getEnv, updateDtTemplateId} from "../providers";
import {updateSaveContent} from "../providers/env-provider";
import {convertToSaveContent} from "../utils/convert-to-save-content";

const id = 'toastid';
let dtId = ''

// let webSocketService: WebSocketService

export function useEditorProps(
  initialData: FlowDocumentJSON,
  nodeRegistries: FlowNodeRegistry[]
): FreeLayoutProps {
  /**
   * Check if workflow template type is selected
   * @param nodeForm The form of the node to check
   * @returns boolean indicating if the workflow template type is selected
   */
  const isWorkflowTemplateSelected = (nodeForm: any): boolean => {
    if (!nodeForm?.values.rawData) {
      Toast.error({content: "请先选择工作流的模板类型", id});
      return false;
    }
    return true;
  };

  /**
   * Handle data flow between different node types
   * @param line The line entity representing connection between nodes
   */
  const handleNodeDataFlow = (line: WorkflowLineEntity) => {
    // Data slot to workflow connection
    if (line.from.flowNodeType === WorkflowNodeType.DataSlot &&
      line.to?.flowNodeType === WorkflowNodeType.Workflow) {
      handleDataSlotToWorkflow(line.from, line.to, line);
    }
    // Workflow to data slot connection
    else if (line.from.flowNodeType === WorkflowNodeType.Workflow &&
      line.to?.flowNodeType === WorkflowNodeType.DataSlot) {
      handleWorkflowToDataSlot(line.from, line.to, line);
    }
  };

  /**
   * Handle data flow from DataSlot to Workflow
   * @param from DataSlot node
   * @param to Workflow node
   * @param line
   */
  const handleDataSlotToWorkflow = async (from: any, to: any, line: WorkflowLineEntity) => {
    const fromForm = getNodeForm(from); // DataSlotForm
    const toForm = getNodeForm(to); // WorkflowForm
    const inputsValues: Record<string, IFlowValue> = {};
    if (!fromForm?.getValueIn("rawData")) {
      //todo
      const toFormRawData: Workflow = toForm?.getValueIn("rawData")!;
      const promiseGetIds = toFormRawData.inputs.map(async (input) => {
        input.id = await getUniqueId();
      })
      await Promise.all(promiseGetIds);
      fromForm?.setValueIn("rawData", toFormRawData);
      fromForm?.setValueIn("from", "inputs");
    }
    fromForm?.setValueIn("outputs", toForm?.getValueIn("inputs"));
    const fromOutputs = fromForm?.getValueIn("outputs");
    // console.log("fromOutputs", fromOutputs);
    if (fromOutputs?.properties) {
      Object.keys(fromOutputs.properties).forEach((key, index) => {
        inputsValues[key] = {
          "type": "ref",
          "content": [
            line.from.id,
            key
          ],
          "extra": {
            "index": index
          }
        };
      });
    }
    toForm?.setValueIn("inputsValues", inputsValues);
  };

  /**
   * Handle data flow from Workflow to DataSlot
   * @param from Workflow node
   * @param to DataSlot node
   * @param line Line entity containing connection info
   */
  const handleWorkflowToDataSlot = async (from: any, to: any, line: WorkflowLineEntity) => {
    const fromForm = getNodeForm(from); //workflow
    const toForm = getNodeForm(to); //dataslot
    const fromOutputs = fromForm?.getValueIn("outputs");
    const inputsValues: Record<string, IFlowValue> = {};

    // 获取原始数据并设置ID
    const rawData = fromForm?.getValueIn("rawData");
    if (rawData?.outputs) {
      // 为每个output分配唯一ID
      const promiseGetIds = rawData.outputs.map(async (input: any) => {
        input.id = await getUniqueId();
      });
      await Promise.all(promiseGetIds);
    }

    toForm?.setValueIn("rawData", rawData);
    toForm?.setValueIn("from", "outputs");
    toForm?.setValueIn("inputs", fromForm?.getValueIn("outputs"));

    if (fromOutputs?.properties) {
      Object.keys(fromOutputs.properties).forEach((key, index) => {
        inputsValues[key] = {
          "type": "ref",
          "content": [
            line.from.id,
            key
          ],
          "extra": {
            "index": index
          }
        };
      });
    }

    toForm?.setValueIn("inputsValues", inputsValues);
  };

  /**
   * Check if connection between DataSlot and Workflow nodes is valid
   * @param nodeType The type of the source node
   * @param fromPort The source port
   * @param toPort The target port
   * @returns boolean indicating if the connection is valid
   */
  const isValidDataSlotWorkflowConnection = (fromPort: WorkflowPortEntity, toPort: WorkflowPortEntity): boolean => {
    // DataSlot to Workflow connection
    if (fromPort.node.flowNodeType === WorkflowNodeType.DataSlot && toPort.node.flowNodeType === WorkflowNodeType.Workflow) {
      const toNodeForm = getNodeForm(toPort.node);
      return isWorkflowTemplateSelected(toNodeForm);
    }

    // Workflow to DataSlot connection
    if (fromPort.node.flowNodeType === WorkflowNodeType.Workflow && toPort.node.flowNodeType === WorkflowNodeType.DataSlot) {
      const fromNodeForm = getNodeForm(fromPort.node);
      return isWorkflowTemplateSelected(fromNodeForm);
    }

    return true;
  };
  /*const setDtTemplateIdToContext = async () => {
    const dtTemplateId = await getUniqueId<string>()
    useEnv().setDtTemplateId(dtTemplateId)
    if (!dtTemplateId) {
      Toast.error({content: "请先选择工作流的模板类型", id});
      return "";
    }
    return dtTemplateId;
  }*/
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
        // console.log("canAddLine", toPort);

        // Check if connection between DataSlot and Workflow nodes is valid
        if (!isValidDataSlotWorkflowConnection(fromPort, toPort)) {
          return false;
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
      onContentChange: debounce(async (ctx, event) => {
        console.log("Auto Save: ", event, ctx.document.toJSON());

        if (getEnv().isDev) {
          // 使用转换函数
          const saveContent = await convertToSaveContent(dtId, ctx.document.toJSON());
          updateSaveContent(saveContent);

          console.log("Converted save content:", saveContent);
          console.log('current Env', getEnv().currentEnv)

          save(saveContent as SaveRequest).then(response => {
            console.log("Save success:", response);
          }).catch(error => {
            console.error("Save error:", error);
          })
        }

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
        console.log('onBind')
        bind(CustomService).toSelf().inSingletonScope();
        bind(WebSocketService).toSelf().inSingletonScope();
      },
      /**
       * Playground init
       */
      onInit() {
        console.log("--- Playground init ---");
        // dtId = useEnv().dtTemplateId
        getUniqueId<string>().then(id => {
          dtId = id
          console.log('setDtTemplateId', id)
          updateDtTemplateId(id)
        })
      },
      /**
       * Playground render
       */
      onAllLayersRendered(ctx) {
        // ctx.tools.autoLayout(); // init auto layout
        ctx.document.fitView(false); // init fit view
        /*webSocketService = ctx.get<WebSocketService>(WebSocketService)
        webSocketService.connect()
        const wsDisposable = webSocketService.onNodeMessage((message) => {
          console.log("Received message:", message);
        })*/
        console.log("--- Playground rendered ---");
        ctx.document.linesManager.onAvailableLinesChange(e => {
          console.log("Available lines change: ", e);
          if (ctx.document.loading) return
          if (e.type === WorkflowContentChangeType.ADD_LINE) {
            const line = e.entity as WorkflowLineEntity;
            // Handle data flow between nodes
            handleNodeDataFlow(line);
          }
        })

      },
      /**
       * Playground dispose
       */
      onDispose(ctx) {
        console.log("---- Playground Dispose ----");
        ctx.get(WebSocketService).dispose()
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

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Button, Toast } from "@douyinfe/semi-ui";
import { IconPlay, IconSpin } from "@douyinfe/semi-icons";
import { useEnv } from "../../../../providers";
import { getNodeForm, useNodeRender, WorkflowNodeEntity, WorkflowNodeLinesData } from "@flowgram.ai/free-layout-editor";
import { useState } from "react";
import { useLog } from "../../../../context/log-context";
import { DataSlotNodeData, IODataSlot, RunWorkFlowRequest, RunWorkFlowResponse, Workflow, WSAssetStatus } from "../../../../typings";
import { isEmpty } from "lodash-es";
import { runWorkFlow } from "../../../../api/workflow";
// import {runWorkFlow} from "../../../../api/workflow";

export function WorkflowHeader() {
  const { isProd, dtInstanceId } = useEnv();
  // const node = useCurrentEntity()
  const [isPlaying, setIsPlaying] = useState(false);
  const { setLogVisible } = useLog();
  const { data, node } = useNodeRender()
  const nodeData = data as Workflow

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      // 如果正在播放，点击后停止播放
      setIsPlaying(false);
      setLogVisible(false); // 隐藏日志组件
      node.getData(WorkflowNodeLinesData).inputLines.map((line) => {
        line.updateUIState({ flowing: false })
      })
      node.getData(WorkflowNodeLinesData).outputLines.map((line) => {
        line.updateUIState({ flowing: false })
      })
    } else {
      const preNodeFormData: DataSlotNodeData = getPreNodeFormData(node)
      const nextNodeFormData: DataSlotNodeData = getNextNodeFormData(node)
      const runWorkFlowParam: RunWorkFlowRequest = {
        dt_instance_id: dtInstanceId,
        workflow_id: nodeData.serverId!,
        input_assets: [],//上游节点中上传的文件Id
        output_slot_id: [], //从下游节点的rawData.outputs中获取
        node_id: node.id
      }
      if (!preNodeFormData || !nextNodeFormData) {
        return
      } else {
        if (preNodeFormData.from === 'inputs') {
          if (isEmpty(preNodeFormData.outputSlot)) {
            Toast.error("请先上传文件")
            return
          } else {
            runWorkFlowParam.input_assets = Object.values(preNodeFormData.outputSlot!).map((item) => item.asset_id)
          }
        }
        if (nextNodeFormData.from === 'outputs') {
          console.log('nextNodeFormData', nextNodeFormData)
          runWorkFlowParam.output_slot_id = Object.values(nextNodeFormData.rawData!['outputs']).map((item) => item.id!)
        }
      }
      runWorkFlow<RunWorkFlowResponse>(runWorkFlowParam).then((res) => {
        //todo 运行不好使
        if (res && typeof res === 'object') {
          // setIsPlaying(true);
          const nextNode = getNextNodes(node)?.[0]
          const nextNodeFormData: DataSlotNodeData = getNextNodeFormData(node)
          for (let key in res) {
            getNodeForm(nextNode)?.setValueIn<IODataSlot>(`inputSlot`, {
              [key]: {
                asset_id: res[key],
                dataslot_id: getDataSlotId(nextNodeFormData.rawData!, "outputs", key) || '',
                status: WSAssetStatus.NotYet,
              }
            })
          }
          // getNodeForm(nextNode)?.setValueIn('inputSlot', )
          // form?.setValueIn('')
          // setLogVisible(true); // 显示日志组件
          /* node.getData(WorkflowNodeLinesData).inputLines.map((line) => {
            line.updateUIState({ flowing: true })
          })
          node.getData(WorkflowNodeLinesData).outputLines.map((line) => {
            line.updateUIState({ flowing: true })
          }) */
          // setTimeout(() => {
          // setIsPlaying(false);
          // setLogVisible(false); // 隐藏日志组件
          /* node.getData(WorkflowNodeLinesData).inputLines.map((line) => {
            line.updateUIState({ flowing: false })
          })
          node.getData(WorkflowNodeLinesData).outputLines.map((line) => {
            line.updateUIState({ flowing: false })
          }) */
          // }, 16000)
        } else {
          Toast.error("运行失败")
        }
      })
      // 如果没有在播放，点击后开始播放


    }
  };
  const getPreNodes = (node: WorkflowNodeEntity) => {
    return node.getData(WorkflowNodeLinesData).inputNodes
  }
  const getNextNodes = (node: WorkflowNodeEntity) => {
    return node.getData(WorkflowNodeLinesData).outputNodes
  }
  const getPreNodeFormData = (node: WorkflowNodeEntity) => {
    const preNode = getPreNodes?.(node)?.[0]
    if (preNode) {
      return getNodeForm(preNode)?.values
    }
    Toast.error("请先连接上一个节点")
  }
  const getNextNodeFormData = (node: WorkflowNodeEntity) => {
    const nextNode = getNextNodes?.(node)?.[0]
    if (nextNode) {
      return getNodeForm(nextNode)?.values
    }
    Toast.error("请先连接下一个节点")
  }
  const getDataSlotId = (rawData: Workflow, io: 'inputs' | 'outputs', name: string) => {
    return rawData[io].find((item) => item.name)?.id
  }
  return (
    <>
      {isProd && (
        <Button
          icon={isPlaying ? <IconSpin spin /> : <IconPlay />}
          onClick={handlePlay}
          theme="borderless"
          style={{
            marginLeft: 4,
          }}
        />
      )}
    </>
  );
}

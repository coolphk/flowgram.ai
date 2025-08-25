/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {Button, Toast} from "@douyinfe/semi-ui";
import {IconPlay, IconSpin} from "@douyinfe/semi-icons";
import {useEnv} from "../../../../providers";
import {getNodeForm, useNodeRender, WorkflowNodeEntity, WorkflowNodeLinesData} from "@flowgram.ai/free-layout-editor";
import {useState} from "react";
import {useLog} from "../../../../context/log-context";
import {
  AssetStatus,
  DataSlotNodeData,
  IODataSlot,
  RunWorkFlowRequest,
  RunWorkFlowResponse,
  Workflow
} from "../../../../typings";
import {isEmpty} from "lodash-es";
import {runWorkFlow} from "../../../../api/workflow";

export function WorkflowHeader() {
  const {isProd, dtInstanceId} = useEnv();
  // const node = useCurrentEntity()
  const [isPlaying, setIsPlaying] = useState(false);
  const {setLogVisible} = useLog();
  const {data, node} = useNodeRender()
  const nodeData = data as Workflow
  // const available = useScopeAvailable()
  const currentNodeForm = getNodeForm(node)

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      // 如果正在播放，点击后停止播放
      setIsPlaying(false);
      setLogVisible(false); // 隐藏日志组件
      node.getData(WorkflowNodeLinesData).inputLines.map((line) => {
        line.updateUIState({flowing: false})
      })
      node.getData(WorkflowNodeLinesData).outputLines.map((line) => {
        line.updateUIState({flowing: false})
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
        // console.log('preNodeFormData', preNodeFormData.from)
        if (preNodeFormData.from === 'inputs') { //证明是上游节点是从workflow生成的
          if (isEmpty(preNodeFormData.outputSlot)) {
            Toast.error("请先上传文件")
            return
          } else {
            runWorkFlowParam.input_assets = Object.values(preNodeFormData.outputSlot!).map((item) => item.asset_id)
          }
        } else if (preNodeFormData.from == 'outputs') { //证明当前节点是从data-slot生成的
          // runWorkFlowParam.input_assets=
          const preNodeInputSlot: IODataSlot | undefined = getNodeForm(getPreNodes(node)?.[0])?.getValueIn('outputSlot')

          if (preNodeInputSlot) {
            currentNodeForm?.setValueIn('inputSlot', preNodeInputSlot)
            runWorkFlowParam.input_assets = Object.values(preNodeInputSlot).map((item) => item.asset_id)
          }
          // console.log(111, getNodeForm(getPreNodes(node)?.[0])?.getValueIn('inputsValues'));

          // preNodeFormData
          // available.getByKeyPath()
        }
        if (nextNodeFormData.from === 'outputs') {
          console.log('nextNodeFormData', nextNodeFormData)
          runWorkFlowParam.output_slot_id = Object.values(nextNodeFormData.rawData!['outputs']).map((item) => item.id!)
        }
      }
      if (runWorkFlowParam.input_assets.length === 0) {
        Toast.error("数据资产没有传递成功!")
        return
      }
      runWorkFlow<RunWorkFlowResponse>(runWorkFlowParam).then((res) => {
        if (res && Object.keys(res).length) {
          // setIsPlaying(true);
          const nextNode = getNextNodes(node)?.[0]
          console.log('runWorkFlow nextNode', nextNode)
          const nextNodeFormData: DataSlotNodeData = getNextNodeFormData(node)
          const inputSlot: IODataSlot = {}
          for (let key in res) {
            inputSlot[key] = {
              asset_id: res[key],
              dataslot_id: getDataSlotId(nextNodeFormData.rawData!, "outputs", key) || '',
              status: AssetStatus.NotYet,
            }
          }
          getNodeForm(nextNode)?.setValueIn<IODataSlot>(`inputSlot`, inputSlot)
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
          icon={isPlaying ? <IconSpin spin/> : <IconPlay/>}
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

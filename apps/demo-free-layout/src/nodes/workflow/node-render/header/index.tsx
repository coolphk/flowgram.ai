/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Button, Toast } from "@douyinfe/semi-ui";
import { IconPlay, IconSpin } from "@douyinfe/semi-icons";
import { useEnv } from "../../../../providers";
import { getNodeForm, useNodeRender, WorkflowNodeLinesData } from "@flowgram.ai/free-layout-editor";
import { useState } from "react";
import { useLog } from "../../../../context/log-context";
import { DataSlotNodeData, RunWorkFlowRequest, Workflow } from "../../../../typings";
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
      const preNodeFormData: DataSlotNodeData = getPreNodeFormData()
      const nextNodeFormData: DataSlotNodeData = getNextNodeFormData()
      const runWorkFlowParam: RunWorkFlowRequest = {
        dt_instance_id: dtInstanceId,
        workflow_id: nodeData.serverId!,
        input_assets: [],//上游节点中上传的文件Id
        output_slot_id: [] //从下游节点的rawData.outputs中获取
      }
      if (!preNodeFormData || !nextNodeFormData) {
        return
      } else {
        if (preNodeFormData.from === 'inputs') {
          if (isEmpty(preNodeFormData.outputUploadResponse)) {
            Toast.error("请先上传文件")
            return
          } else {
            runWorkFlowParam.input_assets = Object.values(preNodeFormData.outputUploadResponse!).map((item) => item.asset_id)
          }
        }
        if (nextNodeFormData.from === 'outputs') {
          console.log('nextNodeFormData', nextNodeFormData)
          runWorkFlowParam.output_slot_id = Object.values(nextNodeFormData.rawData!['outputs']).map((item) => item.id!)
        }

      }
      runWorkFlow(runWorkFlowParam).then((res) => {
        //todo 运行不好使
        if (res) {
          setIsPlaying(true);
          setLogVisible(true); // 显示日志组件
          node.getData(WorkflowNodeLinesData).inputLines.map((line) => {
            line.updateUIState({ flowing: true })
          })
          node.getData(WorkflowNodeLinesData).outputLines.map((line) => {
            line.updateUIState({ flowing: true })
          })
          setTimeout(() => {
            setIsPlaying(false);
            setLogVisible(false); // 隐藏日志组件
            node.getData(WorkflowNodeLinesData).inputLines.map((line) => {
              line.updateUIState({ flowing: false })
            })
            node.getData(WorkflowNodeLinesData).outputLines.map((line) => {
              line.updateUIState({ flowing: false })
            })
          }, 16000)
        } else {
          Toast.error("运行失败")
        }
      })
      // 如果没有在播放，点击后开始播放


    }
  };
  const getPreNodeFormData = () => {
    if (node.pre) {
      return getNodeForm(node.pre)?.values
    }
    Toast.error("请先连接上一个节点")
  }
  const getNextNodeFormData = () => {
    if (node.next) {
      return getNodeForm(node.next)?.values
    }
    Toast.error("请先连接下一个节点")
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

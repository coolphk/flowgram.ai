/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Button } from "@douyinfe/semi-ui";
import { IconPlay, IconSpin } from "@douyinfe/semi-icons";
import { useEnv } from "../../../../providers";
import { useCurrentEntity, WorkflowNodeLinesData } from "@flowgram.ai/free-layout-editor";
import { useState } from "react";
import { useLog } from "../../../../context/log-context";

export function WorkflowHeader() {
  const { isProd } = useEnv();
  const node= useCurrentEntity()
  const [isPlaying, setIsPlaying] = useState(false);
  const { setLogVisible } = useLog();

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
      // 如果没有在播放，点击后开始播放
      setIsPlaying(true);
      setLogVisible(true); // 显示日志组件
      node.getData(WorkflowNodeLinesData).inputLines.map((line) => {
        line.updateUIState({ flowing: true })
      })
      node.getData(WorkflowNodeLinesData).outputLines.map((line) => {
        line.updateUIState({ flowing: true })
      })
    }
  };

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
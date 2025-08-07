/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Button } from "@douyinfe/semi-ui";
import { IconPlay } from "@douyinfe/semi-icons";
import { useEnv } from "../../../../providers";
import { useCurrentEntity, WorkflowNodeLinesData } from "@flowgram.ai/free-layout-editor";

export function WorkflowHeader() {
  const { isProd } = useEnv();
  const node= useCurrentEntity()

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 实现play按钮的功能
    console.log("Play button clicked for workflow node");
    node.getData(WorkflowNodeLinesData).inputLines.map((line) => {
      line.updateUIState({ flowing: true })
    })
  };

  return (
    <>
      {isProd && (
        <Button
          icon={<IconPlay />}
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

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {RunHistoryContainer} from "./styles";
import {RunHistoryService} from "../../plugins/run-history-plugin/service";
import {useService} from "@flowgram.ai/free-layout-editor";
import {RunHistoryPanel} from "../../plugins/run-history-plugin/components/run-history-panel";

export const RunHistory = ({visible}: { visible?: boolean }) => {
  const runHistoryService = useService(RunHistoryService);
  if (!visible) {
    return <></>;
  }
  return (
    <RunHistoryContainer>
      <RunHistoryPanel service={runHistoryService}/>
      {/* <MinimapRender
        service={minimapService}
        panelStyles={{}}
        containerStyles={{
          pointerEvents: "auto",
          position: "relative",
          top: "unset",
          right: "unset",
          bottom: "unset",
          left: "unset",
        }}
        inactiveStyle={{
          opacity: 1,
          scale: 1,
          translateX: 0,
          translateY: 0,
        }}
      /> */}
    </RunHistoryContainer>
  );
};

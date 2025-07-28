/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { RunHistoryRender } from "../../plugins/run-history-plugin/components/run-history-render";
import { RunHistoryContainer } from "./styles";

export const RunHistory = ({ visible }: { visible?: boolean }) => {
  if (!visible) {
    return <></>;
  }
  return (
    <RunHistoryContainer>
      <RunHistoryRender />
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

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { definePluginCreator } from "@flowgram.ai/free-layout-editor";

import { RunHistoryService } from "./service";

export const createRunHistoryPlugin = definePluginCreator({
  onBind({ bind }) {
    // 绑定服务
    bind(RunHistoryService).toSelf().inSingletonScope();
  },
  onInit(ctx) {
    // 初始化服务
    ctx.get(RunHistoryService).init();
  },
  onDispose(ctx) {
    console.log("dispose run history plugin");
    // 清理资源
    ctx.get(RunHistoryService).dispose();
  },
});

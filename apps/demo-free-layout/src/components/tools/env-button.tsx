/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, {useCallback} from "react";
import { Button } from "@douyinfe/semi-ui";
import { useEnv } from "../../providers";
import { ENV } from "../../constants";
import { runDt, save } from "../../api/common";
import {usePlayground, useService } from "@flowgram.ai/free-layout-editor";
import { WebSocketService } from "../../services";

export const EnvButton: React.FC = () => {
  const { setCurrentEnv, isDev, dtTemplateId, setDtInstanceId, saveContent } = useEnv();
  const wsService = useService(WebSocketService);
  const playground = usePlayground();
  const handleToggleEnv = () => {
    // dtTemplateId 暂定为切换到运行模式时调用run接口，进行运行
    console.log('handleToggleEnv', dtTemplateId)

    if (isDev) {
      playground.config.readonly = true
      if (!saveContent) {
        return;
      }
      save(saveContent).then(res => {
        // console.log('save res', res)
        runDt(dtTemplateId).then(res => {
          console.log('dtInstanceId', res)
          setDtInstanceId(res)
          wsService.setDtInstanceId(res)
          wsService.connect()
          // wsService.onConnectionStateChange((state) => {
          //   console.log('wsService connection state change', state)
          // })
          // wsService.onNodeMessage((msg) => {
          //   console.log('wsService onNodeMessage', msg)
          // })
        })
      })
      setCurrentEnv(ENV.PROD);
    } else {
      wsService.dispose()
      setCurrentEnv(ENV.DEV);
      playground.config.readonly = false
    }
  };

  return (
    <Button
      onClick={handleToggleEnv}
      style={{
        backgroundColor: isDev ? 'rgba(0, 178, 60, 1)' : 'rgba(255, 77, 79, 1)',
        borderRadius: '8px',
        color: '#fff',
        border: 'none'
      }}
    >
      {isDev ? "设计模式" : "运行模式"}
    </Button>
  );
};

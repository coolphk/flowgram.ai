/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from "react";
import {Button} from "@douyinfe/semi-ui";
import {useEnv} from "../../providers";
import {ENV} from "../../constants";
import {runDt} from "../../api/common";

export const EnvButton: React.FC = () => {
  const {setCurrentEnv, isDev, dtTemplateId, setDtInstanceId} = useEnv();

  const handleToggleEnv = () => {
    // dtTemplateId 暂定为切换到运行模式时调用run接口，进行运行
    console.log('handleToggleEnv', dtTemplateId)

    if (isDev) {
      setCurrentEnv(ENV.PROD);
      runDt(dtTemplateId).then(res => {
        console.log(res)
        setDtInstanceId(res)
      })
    } else {
      setCurrentEnv(ENV.DEV);
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

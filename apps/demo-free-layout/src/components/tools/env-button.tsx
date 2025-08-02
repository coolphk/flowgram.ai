/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from "react";
import { Button } from "@douyinfe/semi-ui";
import { useEnv } from "../../providers/env-provider";
import { ENV } from "../../constants/env";

export const EnvButton: React.FC = () => {
  const { currentEnv, setCurrentEnv, isDev, isProd } = useEnv();

  const handleToggleEnv = () => {
    if (isDev) {
      setCurrentEnv(ENV.PROD);
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

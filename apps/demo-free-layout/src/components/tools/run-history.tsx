/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';
import { useService } from '@flowgram.ai/free-layout-editor';
import { Tooltip, IconButton } from '@douyinfe/semi-ui';
import { IconHistogram } from '@douyinfe/semi-icons';
import { RunHistoryService } from '../../plugins/run-history-plugin';

export const RunHistory: React.FC = () => {
  const runHistoryService = useService(RunHistoryService);
  
  const handleToggleRunHistory = () => {
    try {
      runHistoryService.togglePanel();
    } catch (error) {
      console.warn('RunHistoryService not available:', error);
    }
  };

  return (
    <Tooltip content="运行记录">
      <IconButton
        type="tertiary"
        theme="borderless"
        icon={<IconHistogram />}
        onClick={handleToggleRunHistory}
        data-testid="run-history-button"
      />
    </Tooltip>
  );
};
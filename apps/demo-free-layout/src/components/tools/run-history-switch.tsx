/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Tooltip, IconButton } from '@douyinfe/semi-ui';
import { IconHistogram } from '@douyinfe/semi-icons';

export const RunHistorySwitch = (props: {
  runHistoryVisible: boolean;
  setRunHistoryVisible: (visible: boolean) => void;
}) => {
  const { runHistoryVisible, setRunHistoryVisible } = props;

  return (
    <Tooltip content="运行记录">
      <IconButton
        type="tertiary"
        theme="borderless"
        icon={<IconHistogram />}
        onClick={() => setRunHistoryVisible(!runHistoryVisible)}
        data-testid="run-history-button"
      />
    </Tooltip>
  );
};
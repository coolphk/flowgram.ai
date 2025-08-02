/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '../../typings';
import iconDataSlot from '../../assets/icon-data-slot.svg';
import { formMeta } from './form-meta';
import { WorkflowNodeType } from '../constants';

export const DataSlotNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.DataSlot,
  meta: {
    defaultPorts: [
      {
        type: 'input',
      },
      {
        type: 'output',
      },
    ],
    size: {
      width: 360,
      height: 211,
    },
  },
  info: {
    icon: iconDataSlot,
    description: 'Data slot for storing and managing data.',
  },
  formMeta,
};
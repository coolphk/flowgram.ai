/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  type FlowNodeEntity,
  FlowNodeRenderData,
  FlowDocument,
  useService,
  useClientContext,
} from '@flowgram.ai/fixed-layout-editor';
import { Button, Typography } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';

import { ToolNodeRegistry } from '../../nodes/agent/tool';
const { Text } = Typography;

interface PropsType {
  node: FlowNodeEntity;
}

export function AgentAdder(props: PropsType) {
  const { node } = props;

  const nodeData = node.firstChild?.getData<FlowNodeRenderData>(FlowNodeRenderData);
  const document = useService(FlowDocument) as FlowDocument;
  const ctx = useClientContext();

  async function addPort() {
    document.addNode({
      ...ToolNodeRegistry.onAdd!(ctx, node),
      parent: node,
    });
  }
  let label = <span>{node.flowNodeType}</span>;
  switch (node.flowNodeType) {
    case 'agentMemory':
      label = (
        <Button style={{ paddingLeft: 6, paddingRight: 6 }} disabled size="small">
          <Text ellipsis={{ showTooltip: true }} style={{ color: 'inherit', maxWidth: 65 }}>
            Memory
          </Text>
        </Button>
      );
      break;
    case 'agentLLM':
      label = (
        <Button style={{ paddingLeft: 6, paddingRight: 6 }} disabled size="small">
          <Text ellipsis={{ showTooltip: true }} style={{ color: 'inherit', maxWidth: 65 }}>
            LLM
          </Text>
        </Button>
      );
      break;
    case 'agentTools':
      label = (
        <Button
          onClick={() => {
            addPort();
          }}
          size="small"
          icon={<IconPlus />}
        >
          Tool
        </Button>
      );
  }

  return (
    <div
      style={{
        display: 'flex',
        background: 'var(--semi-color-bg-0)',
      }}
      onMouseEnter={() => nodeData?.toggleMouseEnter()}
      onMouseLeave={() => nodeData?.toggleMouseLeave()}
    >
      {label}
    </div>
  );
}

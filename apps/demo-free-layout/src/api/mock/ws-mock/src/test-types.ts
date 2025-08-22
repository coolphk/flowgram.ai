/**
 * 类型定义测试文件
 * 用于验证类型定义是否正确
 */

import {
  WSMessage,
  WSMessageType,
  WSAssetStatus,
  WSFileMessage,
  WSRunToolMessage,
  WSRunWorkFlowMessage,
  WSAssetMessage,
  ServerConfig,
  ClientConnection,
  validateWSMessage,
  isValidWSMessage,
} from './index';

// 测试文件消息类型
const fileMessage: WSFileMessage = {
  nodeId: 'test-node-1',
  type: WSMessageType.FileMessage,
  timestamp: Date.now(),
  payload: {
    description: '测试文件上传',
    assetsId: 'asset-123',
    status: WSAssetStatus.Success,
  },
};

// 测试工具运行消息类型
const toolMessage: WSRunToolMessage = {
  nodeId: 'test-node-2',
  type: WSMessageType.RunToolMessage,
  timestamp: Date.now(),
  payload: {
    status: 'running',
    assetsId: ['asset-1', 'asset-2'],
    toolId: 'tool-123',
    url: 'http://example.com/tool',
  },
};

// 测试工作流消息类型
const workflowMessage: WSRunWorkFlowMessage = {
  nodeId: 'test-node-3',
  type: WSMessageType.RunWorkFlowMessage,
  timestamp: Date.now(),
  payload: {
    status: WSAssetStatus.Success,
    assetsId: 'asset-456',
  },
};

// 测试资产消息类型
const assetMessage: WSAssetMessage = {
  nodeId: 'test-node-4',
  type: WSMessageType.AssetMessage,
  timestamp: Date.now(),
  payload: {
    status: WSAssetStatus.Failed,
    assetsId: 'asset-789',
  },
};

// 测试服务器配置类型
const serverConfig: ServerConfig = {
  wsPort: 8080,
  staticPort: 3000,
  mockDataInterval: 5000,
  enableMockData: true,
  enableVerboseLogging: false,
};

// 测试消息验证
const messages: WSMessage[] = [fileMessage, toolMessage, workflowMessage, assetMessage];

messages.forEach((message) => {
  const validationResult = validateWSMessage(message);
  console.log(`消息验证结果:`, validationResult);

  const isValid = isValidWSMessage(message);
  console.log(`消息是否有效:`, isValid);
});

// 导出测试数据供其他模块使用
export const testMessages = {
  fileMessage,
  toolMessage,
  workflowMessage,
  assetMessage,
};

export const testConfig = serverConfig;

console.log('类型定义测试通过！');

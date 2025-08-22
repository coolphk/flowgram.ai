/**
 * WebSocket 模拟服务器类型定义导出文件
 * 统一导出所有类型定义，方便其他模块使用
 */

// 导出服务器端类型
export * from './types';

// 导出客户端类型
export * from './client-types';

// 导出验证工具
export * from './validators';

// 重新导出常用类型的别名
export type {
  WSMessage,
  ServerConfig,
  ClientConnection,
  ConnectionManager,
  MessageHandler,
} from './types';

// 重新导出枚举（作为值导出）
export {
  WSMessageType,
  WSAssetStatus,
  WorkflowNodeType,
} from './types';

export type {
  ConnectionState,
  MessageDirection,
  MessageHistoryItem,
  ClientConfig,
  WebSocketClient,
  UIController,
  PageState,
} from './client-types';

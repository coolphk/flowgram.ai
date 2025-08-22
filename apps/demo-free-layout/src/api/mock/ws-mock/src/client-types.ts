/**
 * 客户端测试页面专用类型定义
 * 用于浏览器环境的 TypeScript 类型支持
 */

// 重新导出服务器类型中客户端需要的部分
export {
  WSMessageType,
  WSAssetStatus,
  WSFilePayload,
  WSRunToolPayload,
  WSAssetPayload,
  WSHightLightPayload,
  WSFileMessage,
  WSRunToolMessage,
  WSRunWorkFlowMessage,
  WSAssetMessage,
  WSHightLightMessage,
  WSMessage,
} from './types';

// ===== 客户端专用类型定义 =====

/**
 * WebSocket 连接状态枚举
 */
export enum ConnectionState {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
}

/**
 * 消息方向枚举
 */
export enum MessageDirection {
  SENT = 'sent',
  RECEIVED = 'received',
}

/**
 * 消息历史记录项
 */
export interface MessageHistoryItem {
  /** 消息 ID */
  id: string;
  /** 消息方向 */
  direction: MessageDirection;
  /** 消息内容 */
  message: any;
  /** 时间戳 */
  timestamp: number;
  /** 格式化的时间字符串 */
  timeString: string;
}

/**
 * 客户端配置接口
 */
export interface ClientConfig {
  /** WebSocket 服务器地址 */
  serverUrl: string;
  /** 自动重连 */
  autoReconnect: boolean;
  /** 重连间隔（毫秒） */
  reconnectInterval: number;
  /** 最大重连次数 */
  maxReconnectAttempts: number;
  /** 数字孪生实例 ID */
  dtId?: string;
}

/**
 * WebSocket 客户端接口
 */
export interface WebSocketClient {
  /** 当前连接状态 */
  state: ConnectionState;
  /** 连接到服务器 */
  connect(): Promise<void>;
  /** 断开连接 */
  disconnect(): void;
  /** 发送消息 */
  send(message: any): void;
  /** 添加消息监听器 */
  onMessage(callback: (message: any) => void): void;
  /** 添加状态变化监听器 */
  onStateChange(callback: (state: ConnectionState) => void): void;
  /** 添加错误监听器 */
  onError(callback: (error: Error) => void): void;
}

/**
 * UI 控制器接口
 */
export interface UIController {
  /** 更新连接状态显示 */
  updateConnectionState(state: ConnectionState): void;
  /** 添加消息到历史记录 */
  addMessageToHistory(item: MessageHistoryItem): void;
  /** 清空消息历史 */
  clearMessageHistory(): void;
  /** 显示错误信息 */
  showError(message: string): void;
  /** 显示成功信息 */
  showSuccess(message: string): void;
}

/**
 * 消息模板接口
 */
export interface MessageTemplate {
  /** 模板名称 */
  name: string;
  /** 消息类型 */
  type: string;
  /** 生成消息的函数 */
  generate(): any;
  /** 模板描述 */
  description: string;
}

/**
 * 测试按钮配置
 */
export interface TestButtonConfig {
  /** 按钮 ID */
  id: string;
  /** 按钮文本 */
  text: string;
  /** 按钮类名 */
  className: string;
  /** 消息模板 */
  template: MessageTemplate;
  /** 是否启用 */
  enabled: boolean;
}

/**
 * 页面状态接口
 */
export interface PageState {
  /** 连接状态 */
  connectionState: ConnectionState;
  /** 消息历史 */
  messageHistory: MessageHistoryItem[];
  /** 是否正在重连 */
  isReconnecting: boolean;
  /** 重连尝试次数 */
  reconnectAttempts: number;
  /** 统计信息 */
  stats: {
    totalSent: number;
    totalReceived: number;
    connectedAt?: number;
    lastMessageAt?: number;
  };
}

/**
 * 事件监听器类型
 */
export type EventListener<T = any> = (data: T) => void;

/**
 * 事件发射器接口
 */
export interface EventEmitter {
  /** 添加事件监听器 */
  on(event: string, listener: EventListener): void;
  /** 移除事件监听器 */
  off(event: string, listener: EventListener): void;
  /** 触发事件 */
  emit(event: string, data?: any): void;
  /** 一次性事件监听器 */
  once(event: string, listener: EventListener): void;
}

/**
 * 本地存储键名枚举
 */
export enum StorageKeys {
  CLIENT_CONFIG = 'ws_mock_client_config',
  MESSAGE_HISTORY = 'ws_mock_message_history',
  CONNECTION_STATS = 'ws_mock_connection_stats',
}

/**
 * 工具函数类型定义
 */
export interface Utils {
  /** 格式化时间戳 */
  formatTimestamp(timestamp: number): string;
  /** 生成唯一 ID */
  generateId(): string;
  /** 深拷贝对象 */
  deepClone<T>(obj: T): T;
  /** 验证消息格式 */
  validateMessage(message: any): boolean;
  /** 格式化 JSON */
  formatJSON(obj: any): string;
  /** 解析查询参数 */
  parseQueryParams(url: string): Record<string, string>;
}

/**
 * 全局应用状态
 */
export interface AppState {
  /** 客户端实例 */
  client: WebSocketClient | null;
  /** UI 控制器 */
  ui: UIController | null;
  /** 页面状态 */
  pageState: PageState;
  /** 配置 */
  config: ClientConfig;
  /** 工具函数 */
  utils: Utils;
}

/**
 * DOM 元素 ID 枚举
 */
export enum ElementIds {
  CONNECTION_STATUS = 'connection-status',
  CONNECT_BUTTON = 'connect-button',
  DISCONNECT_BUTTON = 'disconnect-button',
  MESSAGE_HISTORY = 'message-history',
  CLEAR_HISTORY_BUTTON = 'clear-history-button',
  FILE_MESSAGE_BUTTON = 'file-message-button',
  TOOL_MESSAGE_BUTTON = 'tool-message-button',
  WORKFLOW_MESSAGE_BUTTON = 'workflow-message-button',
  ASSET_MESSAGE_BUTTON = 'asset-message-button',
  STATS_CONTAINER = 'stats-container',
  ERROR_CONTAINER = 'error-container',
}

/**
 * CSS 类名枚举
 */
export enum CSSClasses {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  ERROR = 'error',
  MESSAGE_SENT = 'message-sent',
  MESSAGE_RECEIVED = 'message-received',
  BUTTON_DISABLED = 'button-disabled',
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
}

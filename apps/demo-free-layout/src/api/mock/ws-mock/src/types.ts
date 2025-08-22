/**
 * WebSocket 模拟服务器类型定义
 * 基于项目中的 WebSocket 消息类型定义进行适配
 */

// ===== 工作流节点类型枚举 =====
export enum WorkflowNodeType {
  Start = 'start',
  End = 'end',
  LLM = 'llm',
  HTTP = 'http',
  Code = 'code',
  Condition = 'condition',
  Loop = 'loop',
  BlockStart = 'block-start',
  BlockEnd = 'block-end',
  Comment = 'comment',
  Continue = 'continue',
  Break = 'break',
  DataSlot = 'data-slot',
  Workflow = 'workflow',
}

// ===== WebSocket 消息类型枚举 =====
export enum WSMessageType {
  FileMessage = 'UPLOAD_FILE',
  RunToolMessage = 'RUN_TOOL',
  RunWorkFlowMessage = 'WORKFLOW_STATUS',
  AssetMessage = 'ASSET_STATUS',
  HightLightMessage = 'HIGHLIGHT_ASSET',
}

// ===== 资产状态枚举 =====
export enum WSAssetStatus {
  Success = 'success',
  Failed = 'failed',
  NotYet = 'notyet',
}

// ===== 消息载荷接口定义 =====

/**
 * 文件上传消息载荷
 */
export interface WSFilePayload {
  description: string;
  assetsId: string;
  status: string;
}

/**
 * 工具运行消息载荷
 */
export interface WSRunToolPayload {
  status: string;
  assetsId: string[];
  toolId: string;
  url: string;
}

/**
 * 工作流下一个节点信息
 */
interface WSRunWorkflowNextNode {
  id: string;
  type: WorkflowNodeType;
  assets: [{
    id: string;
    name: string;
    status: string;
  }];
}

/**
 * 工作流运行消息载荷（完整版本）
 */
export interface WSRunWorkflowPayload {
  status: string;
  nextNodes: WSRunWorkflowNextNode[];
}

/**
 * 资产状态消息载荷
 */
export interface WSAssetPayload {
  status: string;
  assetsId: string;
}

/**
 * 高亮消息载荷
 */
export interface WSHightLightPayload {
  nodeId: string;
  dataSlotId: string;
  name: string;
  assetIds: string[];
}

// ===== 基础消息接口 =====

/**
 * WebSocket 消息基础接口
 */
interface WSBaseMessage {
  nodeId: string;
  type: WSMessageType;
  timestamp: number;
}

// ===== 具体消息类型接口 =====

/**
 * 文件上传消息
 */
export interface WSFileMessage extends WSBaseMessage {
  type: WSMessageType.FileMessage;
  payload: WSFilePayload;
}

/**
 * 工具运行消息
 */
export interface WSRunToolMessage extends WSBaseMessage {
  type: WSMessageType.RunToolMessage;
  payload: WSRunToolPayload;
}

/**
 * 工作流状态消息
 */
export interface WSRunWorkFlowMessage extends WSBaseMessage {
  type: WSMessageType.RunWorkFlowMessage;
  payload: WSAssetPayload;
}

/**
 * 资产状态消息
 */
export interface WSAssetMessage extends WSBaseMessage {
  type: WSMessageType.AssetMessage;
  payload: WSAssetPayload;
}

/**
 * 高亮消息
 */
export interface WSHightLightMessage extends WSBaseMessage {
  type: WSMessageType.HightLightMessage;
  payload: WSHightLightPayload;
}

/**
 * 所有 WebSocket 消息的联合类型
 */
export type WSMessage =
  | WSFileMessage
  | WSRunToolMessage
  | WSRunWorkFlowMessage
  | WSAssetMessage
  | WSHightLightMessage;

// ===== 服务器端专用类型定义 =====

/**
 * 服务器配置接口
 */
export interface ServerConfig {
  /** WebSocket 服务器端口 */
  wsPort: number;
  /** 静态文件服务器端口 */
  staticPort: number;
  /** 模拟数据发送间隔（毫秒） */
  mockDataInterval: number;
  /** 是否启用自动模拟数据发送 */
  enableMockData: boolean;
  /** 是否启用详细日志 */
  enableVerboseLogging: boolean;
}

/**
 * 客户端连接信息
 */
export interface ClientConnection {
  /** 连接 ID */
  id: string;
  /** WebSocket 连接对象 */
  ws: any; // 使用 any 避免引入 ws 库的类型依赖
  /** 连接时间戳 */
  connectedAt: number;
  /** 查询参数 */
  queryParams: Record<string, string>;
  /** 数字孪生实例 ID */
  dtId?: string;
  /** 是否活跃 */
  isActive: boolean;
}

/**
 * 连接管理器接口
 */
export interface ConnectionManager {
  /** 添加连接 */
  addConnection(connection: ClientConnection): void;
  /** 移除连接 */
  removeConnection(connectionId: string): void;
  /** 获取连接 */
  getConnection(connectionId: string): ClientConnection | undefined;
  /** 获取所有活跃连接 */
  getActiveConnections(): ClientConnection[];
  /** 广播消息到所有连接 */
  broadcast(message: WSMessage): void;
  /** 发送消息到指定连接 */
  sendToConnection(connectionId: string, message: WSMessage): void;
}

/**
 * 消息处理器接口
 */
export interface MessageHandler {
  /** 处理接收到的消息 */
  handleMessage(connection: ClientConnection, message: WSMessage): Promise<void>;
  /** 生成模拟响应消息 */
  generateMockResponse(messageType: WSMessageType, nodeId: string): WSMessage;
}

/**
 * 模拟数据生成器配置
 */
export interface MockDataGeneratorConfig {
  /** 节点 ID 列表 */
  nodeIds: string[];
  /** 资产 ID 列表 */
  assetIds: string[];
  /** 工具 ID 列表 */
  toolIds: string[];
  /** 生成间隔（毫秒） */
  interval: number;
}

/**
 * 日志级别枚举
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * 日志记录接口
 */
export interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

/**
 * 服务器事件类型
 */
export enum ServerEventType {
  SERVER_STARTED = 'server_started',
  SERVER_STOPPED = 'server_stopped',
  CLIENT_CONNECTED = 'client_connected',
  CLIENT_DISCONNECTED = 'client_disconnected',
  MESSAGE_RECEIVED = 'message_received',
  MESSAGE_SENT = 'message_sent',
  ERROR_OCCURRED = 'error_occurred',
}

/**
 * 服务器事件接口
 */
export interface ServerEvent {
  type: ServerEventType;
  timestamp: number;
  data?: any;
  connectionId?: string;
  error?: Error;
}

/**
 * 错误类型枚举
 */
export enum ErrorType {
  PORT_IN_USE = 'port_in_use',
  INVALID_MESSAGE = 'invalid_message',
  CONNECTION_ERROR = 'connection_error',
  PARSING_ERROR = 'parsing_error',
  VALIDATION_ERROR = 'validation_error',
}

/**
 * 自定义错误接口
 */
export interface ServerError extends Error {
  type: ErrorType;
  code?: string;
  details?: any;
}

// ===== HTTP API 服务器相关类型 =====

/**
 * HTTP API 服务器配置
 */
export interface ApiServerConfig {
  /** HTTP API 服务器端口 */
  port: number;
  /** 静态文件目录路径 */
  staticPath: string;
  /** 是否启用 CORS */
  enableCors: boolean;
}

/**
 * 消息发送请求接口
 */
export interface SendMessageRequest {
  /** 消息类型 */
  type: WSMessageType;
  /** 节点 ID（可选，如果不提供则使用随机生成的） */
  nodeId?: string;
  /** 消息载荷（可选，如果不提供则使用默认模拟数据） */
  payload?: any;
  /** 目标连接 ID（可选，如果不提供则广播到所有连接） */
  connectionId?: string;
}

/**
 * 消息发送响应接口
 */
export interface SendMessageResponse {
  /** 是否成功 */
  success: boolean;
  /** 消息内容 */
  message: WSMessage;
  /** 发送到的连接数量 */
  sentToConnections: number;
  /** 错误信息（如果有） */
  error?: string;
}

/**
 * 服务器状态响应接口
 */
export interface ServerStatusResponse {
  /** WebSocket 服务器是否运行中 */
  isRunning: boolean;
  /** WebSocket 服务器端口 */
  wsPort: number;
  /** HTTP API 服务器端口 */
  apiPort: number;
  /** 活跃连接数量 */
  activeConnections: number;
  /** 连接详情 */
  connections: Array<{
    id: string;
    dtId?: string;
    connectedAt: number;
    queryParams: Record<string, string>;
  }>;
  /** 服务器配置 */
  config: ServerConfig;
  /** 服务器启动时间 */
  startTime: number;
}

/**
 * 客户端列表响应接口
 */
export interface ClientListResponse {
  /** 客户端连接列表 */
  clients: Array<{
    id: string;
    dtId?: string;
    connectedAt: number;
    queryParams: Record<string, string>;
    isActive: boolean;
  }>;
  /** 总连接数 */
  total: number;
}

/**
 * HTTP API 服务器接口
 */
export interface ApiServer {
  /** 启动 API 服务器 */
  start(): Promise<void>;
  /** 停止 API 服务器 */
  stop(): Promise<void>;
  /** 获取服务器状态 */
  getStatus(): ServerStatusResponse;
  /** 发送消息 */
  sendMessage(request: SendMessageRequest): Promise<SendMessageResponse>;
  /** 获取客户端列表 */
  getClients(): ClientListResponse;
}

/**
 * WebSocket 模拟服务器主文件
 * 实现基础的服务器启动逻辑、客户端连接处理和查询参数解析功能
 */

import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { URL } from 'url';
import {
  ServerConfig,
  ClientConnection,
  ConnectionManager,
  MessageHandler,
  Logger,
  LogLevel,
  ServerEventType,
  ServerEvent,
  ErrorType,
  ServerError,
  WSMessage,
  WSMessageType,
  ApiServerConfig,
} from './types';
import { HttpApiServer } from './api-server';

/**
 * 简单的日志记录器实现
 */
class SimpleLogger implements Logger {
  private logLevel: LogLevel;

  constructor(logLevel: LogLevel = LogLevel.INFO) {
    this.logLevel = logLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  private formatMessage(level: string, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.length > 0 ? ` ${JSON.stringify(args)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${formattedArgs}`;
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.formatMessage('debug', message, ...args));
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage('info', message, ...args));
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage('warn', message, ...args));
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage('error', message, ...args));
    }
  }
}

/**
 * 连接管理器实现
 */
class SimpleConnectionManager implements ConnectionManager {
  private connections: Map<string, ClientConnection> = new Map();
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  addConnection(connection: ClientConnection): void {
    this.connections.set(connection.id, connection);
    this.logger.info(`连接已添加: ${connection.id}`, {
      dtId: connection.dtId,
      queryParams: connection.queryParams,
    });
  }

  removeConnection(connectionId: string): void {
    const connection = this.connections.get(connectionId);
    if (connection) {
      connection.isActive = false;
      this.connections.delete(connectionId);
      this.logger.info(`连接已移除: ${connectionId}`);
    }
  }

  getConnection(connectionId: string): ClientConnection | undefined {
    return this.connections.get(connectionId);
  }

  getActiveConnections(): ClientConnection[] {
    return Array.from(this.connections.values()).filter(conn => conn.isActive);
  }

  broadcast(message: WSMessage): void {
    const activeConnections = this.getActiveConnections();
    this.logger.debug(`广播消息到 ${activeConnections.length} 个连接`, { messageType: message.type });

    activeConnections.forEach(connection => {
      try {
        if (connection.ws.readyState === WebSocket.OPEN) {
          connection.ws.send(JSON.stringify(message));
        }
      } catch (error) {
        this.logger.error(`广播消息失败: ${connection.id}`, error);
        this.removeConnection(connection.id);
      }
    });
  }

  sendToConnection(connectionId: string, message: WSMessage): void {
    const connection = this.getConnection(connectionId);
    if (!connection) {
      this.logger.warn(`连接不存在: ${connectionId}`);
      return;
    }

    try {
      if (connection.ws.readyState === WebSocket.OPEN) {
        connection.ws.send(JSON.stringify(message));
        this.logger.debug(`消息已发送到连接: ${connectionId}`, { messageType: message.type });
      } else {
        this.logger.warn(`连接状态异常: ${connectionId}`, { readyState: connection.ws.readyState });
      }
    } catch (error) {
      this.logger.error(`发送消息失败: ${connectionId}`, error);
      this.removeConnection(connectionId);
    }
  }
}

/**
 * 基础消息处理器实现
 */
class SimpleMessageHandler implements MessageHandler {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async handleMessage(connection: ClientConnection, message: WSMessage): Promise<void> {
    this.logger.info(`收到消息: ${connection.id}`, {
      type: message.type,
      nodeId: message.nodeId,
      timestamp: message.timestamp,
    });

    // 根据消息类型进行处理
    switch (message.type) {
      case WSMessageType.FileMessage:
        this.logger.debug('处理文件上传消息', { payload: message.payload });
        break;
      case WSMessageType.RunToolMessage:
        this.logger.debug('处理工具运行消息', { payload: message.payload });
        break;
      case WSMessageType.RunWorkFlowMessage:
        this.logger.debug('处理工作流状态消息', { payload: message.payload });
        break;
      case WSMessageType.AssetMessage:
        this.logger.debug('处理资产状态消息', { payload: message.payload });
        break;
      case WSMessageType.HightLightMessage:
        this.logger.debug('处理高亮消息', { payload: message.payload });
        break;
      default:
        this.logger.warn('未知消息类型', { type: (message as any).type });
    }
  }

  generateMockResponse(messageType: WSMessageType, nodeId: string): WSMessage {
    const timestamp = Date.now();

    switch (messageType) {
      case WSMessageType.FileMessage:
        return {
          nodeId,
          type: WSMessageType.FileMessage,
          timestamp,
          payload: {
            description: '模拟文件上传响应',
            assetsId: `asset-${Date.now()}`,
            status: 'success',
          },
        };

      case WSMessageType.RunToolMessage:
        return {
          nodeId,
          type: WSMessageType.RunToolMessage,
          timestamp,
          payload: {
            status: 'running',
            assetsId: [`asset-${Date.now()}`],
            toolId: `tool-${Date.now()}`,
            url: 'http://localhost:8080/mock-tool',
          },
        };

      case WSMessageType.RunWorkFlowMessage:
        return {
          nodeId,
          type: WSMessageType.RunWorkFlowMessage,
          timestamp,
          payload: {
            status: 'completed',
            assetsId: `asset-${Date.now()}`,
          },
        };

      case WSMessageType.AssetMessage:
        return {
          nodeId,
          type: WSMessageType.AssetMessage,
          timestamp,
          payload: {
            status: 'success',
            assetsId: `asset-${Date.now()}`,
          },
        };

      case WSMessageType.HightLightMessage:
        return {
          nodeId,
          type: WSMessageType.HightLightMessage,
          timestamp,
          payload: {
            nodeId,
            dataSlotId: `slot-${Date.now()}`,
            name: '模拟高亮',
            assetIds: [`asset-${Date.now()}`],
          },
        };

      default:
        throw new Error(`不支持的消息类型: ${messageType}`);
    }
  }
}

/**
 * WebSocket 模拟服务器主类
 */
export class WebSocketMockServer {
  private config: ServerConfig;
  private wss: WebSocketServer | null = null;
  private connectionManager: ConnectionManager;
  private messageHandler: MessageHandler;
  private logger: Logger;
  private mockDataTimer: NodeJS.Timeout | null = null;
  private apiServer: HttpApiServer | null = null;

  constructor(config: Partial<ServerConfig> = {}) {
    // 设置默认配置
    this.config = {
      wsPort: 8080,
      staticPort: 3001,
      mockDataInterval: 5000,
      enableMockData: false,
      enableVerboseLogging: false,
      ...config,
    };

    // 初始化组件
    this.logger = new SimpleLogger(
      this.config.enableVerboseLogging ? LogLevel.DEBUG : LogLevel.INFO
    );
    this.connectionManager = new SimpleConnectionManager(this.logger);
    this.messageHandler = new SimpleMessageHandler(this.logger);
  }

  /**
   * 启动 WebSocket 服务器
   */
  async start(): Promise<void> {
    try {
      await this.startWebSocketServer();
      await this.startApiServer();
      this.startMockDataGenerator();
      this.setupGracefulShutdown();

      this.logger.info('WebSocket 模拟服务器启动成功', {
        wsPort: this.config.wsPort,
        staticPort: this.config.staticPort,
        mockDataEnabled: this.config.enableMockData,
      });
    } catch (error) {
      this.logger.error('服务器启动失败', error);
      throw error;
    }
  }

  /**
   * 停止服务器
   */
  async stop(): Promise<void> {
    this.logger.info('正在停止 WebSocket 服务器...');

    // 停止模拟数据生成器
    if (this.mockDataTimer) {
      clearInterval(this.mockDataTimer);
      this.mockDataTimer = null;
    }

    // 停止 HTTP API 服务器
    if (this.apiServer) {
      await this.apiServer.stop();
      this.apiServer = null;
    }

    // 关闭所有连接
    const activeConnections = this.connectionManager.getActiveConnections();
    activeConnections.forEach(connection => {
      connection.ws.close();
    });

    // 关闭 WebSocket 服务器
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }

    this.logger.info('WebSocket 服务器已停止');
  }

  /**
   * 启动 HTTP API 服务器
   */
  private async startApiServer(): Promise<void> {
    const path = require('path');

    // 判断是否为开发环境（通过检查是否存在 ts 文件来判断）
    const isDev = __filename.endsWith('.ts');
    const staticPath = isDev
      ? path.join(__dirname, '../public')  // 开发环境：src/../public
      : path.join(__dirname, '../../public'); // 生产环境：dist/src/../../public

    const apiConfig: ApiServerConfig = {
      port: this.config.staticPort,
      staticPath: staticPath,
      enableCors: true,
    };

    this.apiServer = new HttpApiServer(
      apiConfig,
      this.logger,
      this.connectionManager,
      this.messageHandler,
      this.config
    );

    await this.apiServer.start();
  }

  /**
   * 启动 WebSocket 服务器
   */
  private async startWebSocketServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.wss = new WebSocketServer({
          port: this.config.wsPort,
          perMessageDeflate: false,
        });

        this.wss.on('listening', () => {
          this.logger.info(`WebSocket 服务器监听端口: ${this.config.wsPort}`);
          resolve();
        });

        this.wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
          this.handleConnection(ws, request);
        });

        this.wss.on('error', (error: Error) => {
          this.logger.error('WebSocket 服务器错误', error);

          if (error.message.includes('EADDRINUSE')) {
            const serverError: ServerError = new Error(`端口 ${this.config.wsPort} 已被占用`) as ServerError;
            serverError.type = ErrorType.PORT_IN_USE;
            serverError.code = 'EADDRINUSE';
            reject(serverError);
          } else {
            reject(error);
          }
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 处理客户端连接
   */
  private handleConnection(ws: WebSocket, request: IncomingMessage): void {
    const connectionId = this.generateConnectionId();
    const queryParams = this.parseQueryParams(request.url || '');
    const dtId = queryParams.dt_id;

    // 创建连接对象
    const connection: ClientConnection = {
      id: connectionId,
      ws,
      connectedAt: Date.now(),
      queryParams,
      dtId,
      isActive: true,
    };

    // 添加到连接管理器
    this.connectionManager.addConnection(connection);

    this.logger.info('客户端连接成功', {
      connectionId,
      dtId,
      queryParams,
      remoteAddress: request.socket.remoteAddress,
    });

    // 设置消息处理
    ws.on('message', async (data: Buffer) => {
      try {
        const messageStr = data.toString();
        const message: WSMessage = JSON.parse(messageStr);

        // 验证消息格式
        if (!this.isValidMessage(message)) {
          this.logger.warn('收到无效消息格式', { connectionId, message: messageStr });
          return;
        }

        await this.messageHandler.handleMessage(connection, message);

        // 发送模拟响应（可选）
        if (this.config.enableMockData) {
          const mockResponse = this.messageHandler.generateMockResponse(message.type, message.nodeId);
          this.connectionManager.sendToConnection(connectionId, mockResponse);
        }

      } catch (error) {
        this.logger.error('消息处理错误', { connectionId, error });
      }
    });

    // 设置连接关闭处理
    ws.on('close', (code: number, reason: Buffer) => {
      this.logger.info('客户端连接关闭', {
        connectionId,
        code,
        reason: reason.toString(),
      });
      this.connectionManager.removeConnection(connectionId);
    });

    // 设置错误处理
    ws.on('error', (error: Error) => {
      this.logger.error('WebSocket 连接错误', { connectionId, error });
      this.connectionManager.removeConnection(connectionId);
    });
  }

  /**
   * 解析查询参数
   */
  private parseQueryParams(url: string): Record<string, string> {
    try {
      const urlObj = new URL(url, 'http://localhost');
      const params: Record<string, string> = {};

      urlObj.searchParams.forEach((value, key) => {
        params[key] = value;
      });

      return params;
    } catch (error) {
      this.logger.warn('查询参数解析失败', { url, error });
      return {};
    }
  }

  /**
   * 验证消息格式
   */
  private isValidMessage(message: any): message is WSMessage {
    return (
      message &&
      typeof message === 'object' &&
      typeof message.nodeId === 'string' &&
      typeof message.type === 'string' &&
      typeof message.timestamp === 'number' &&
      message.payload !== undefined
    );
  }

  /**
   * 生成连接 ID
   */
  private generateConnectionId(): string {
    return `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 启动模拟数据生成器
   */
  private startMockDataGenerator(): void {
    if (!this.config.enableMockData) {
      return;
    }

    this.mockDataTimer = setInterval(() => {
      const activeConnections = this.connectionManager.getActiveConnections();
      if (activeConnections.length === 0) {
        return;
      }

      // 生成随机模拟消息
      const messageTypes = Object.values(WSMessageType);
      const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
      const randomNodeId = `node-${Math.floor(Math.random() * 1000)}`;

      try {
        const mockMessage = this.messageHandler.generateMockResponse(randomType, randomNodeId);
        this.connectionManager.broadcast(mockMessage);
        this.logger.debug('发送模拟数据', { type: randomType, nodeId: randomNodeId });
      } catch (error) {
        this.logger.error('生成模拟数据失败', error);
      }
    }, this.config.mockDataInterval);

    this.logger.info('模拟数据生成器已启动', { interval: this.config.mockDataInterval });
  }

  /**
   * 设置优雅关闭
   */
  private setupGracefulShutdown(): void {
    const shutdown = async (signal: string) => {
      this.logger.info(`收到 ${signal} 信号，正在优雅关闭服务器...`);
      try {
        await this.stop();
        process.exit(0);
      } catch (error) {
        this.logger.error('关闭服务器时发生错误', error);
        process.exit(1);
      }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  }

  /**
   * 获取服务器状态
   */
  getStatus() {
    const activeConnections = this.connectionManager.getActiveConnections();
    return {
      isRunning: this.wss !== null,
      port: this.config.wsPort,
      activeConnections: activeConnections.length,
      connections: activeConnections.map(conn => ({
        id: conn.id,
        dtId: conn.dtId,
        connectedAt: conn.connectedAt,
        queryParams: conn.queryParams,
      })),
      config: this.config,
    };
  }
}

// 如果直接运行此文件，启动服务器
if (require.main === module) {
  const server = new WebSocketMockServer({
    wsPort: 8080,
    enableVerboseLogging: false,
    enableMockData: false, // 明确禁用模拟数据
  });

  server.start().catch(error => {
    console.error('启动服务器失败:', error);
    process.exit(1);
  });
}

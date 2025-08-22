/**
 * HTTP API 服务器实现
 * 提供控制 WebSocket 服务器的 HTTP API 接口和静态文件服务
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { Server } from 'http';
import {
  ApiServer,
  ApiServerConfig,
  SendMessageRequest,
  SendMessageResponse,
  ServerStatusResponse,
  ClientListResponse,
  Logger,
  WSMessage,
  WSMessageType,
  ConnectionManager,
  MessageHandler,
  ServerConfig,
} from './types';

/**
 * HTTP API 服务器实现类
 */
export class HttpApiServer implements ApiServer {
  private app: Express;
  private server: Server | null = null;
  private config: ApiServerConfig;
  private logger: Logger;
  private connectionManager: ConnectionManager;
  private messageHandler: MessageHandler;
  private wsServerConfig: ServerConfig;
  private startTime: number;

  constructor(
    config: ApiServerConfig,
    logger: Logger,
    connectionManager: ConnectionManager,
    messageHandler: MessageHandler,
    wsServerConfig: ServerConfig
  ) {
    this.config = config;
    this.logger = logger;
    this.connectionManager = connectionManager;
    this.messageHandler = messageHandler;
    this.wsServerConfig = wsServerConfig;
    this.startTime = Date.now();

    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  /**
   * 设置中间件
   */
  private setupMiddleware(): void {
    // 启用 CORS
    if (this.config.enableCors) {
      this.app.use(cors({
        origin: true,
        credentials: true,
      }));
    }

    // 解析 JSON 请求体
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // 请求日志中间件
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      this.logger.debug(`HTTP ${req.method} ${req.path}`, {
        query: req.query,
        body: req.method !== 'GET' ? req.body : undefined,
      });
      next();
    });

    // 静态文件服务
    const staticPath = path.resolve(this.config.staticPath);
    this.app.use(express.static(staticPath));
    this.logger.info(`静态文件服务路径: ${staticPath}`);
  }

  /**
   * 设置路由
   */
  private setupRoutes(): void {
    // API 路由前缀
    const apiRouter = express.Router();

    // 健康检查
    apiRouter.get('/health', (req: Request, res: Response) => {
      res.json({
        status: 'ok',
        timestamp: Date.now(),
        uptime: Date.now() - this.startTime,
      });
    });

    // 获取服务器状态
    apiRouter.get('/status', (req: Request, res: Response) => {
      try {
        const status = this.getStatus();
        res.json(status);
      } catch (error) {
        this.logger.error('获取服务器状态失败', error);
        res.status(500).json({
          error: '获取服务器状态失败',
          message: error instanceof Error ? error.message : '未知错误',
        });
      }
    });

    // 获取客户端列表
    apiRouter.get('/clients', (req: Request, res: Response) => {
      try {
        const clients = this.getClients();
        res.json(clients);
      } catch (error) {
        this.logger.error('获取客户端列表失败', error);
        res.status(500).json({
          error: '获取客户端列表失败',
          message: error instanceof Error ? error.message : '未知错误',
        });
      }
    });

    // 发送消息
    apiRouter.post('/send-message', async (req: Request, res: Response) => {
      try {
        const request: SendMessageRequest = req.body;

        // 验证请求参数
        if (!request.type || !Object.values(WSMessageType).includes(request.type)) {
          return res.status(400).json({
            error: '无效的消息类型',
            validTypes: Object.values(WSMessageType),
          });
        }

        const result = await this.sendMessage(request);
        return res.json(result);
      } catch (error) {
        this.logger.error('发送消息失败', error);
        return res.status(500).json({
          error: '发送消息失败',
          message: error instanceof Error ? error.message : '未知错误',
        });
      }
    });

    // 广播消息（简化版本，只需要消息类型）
    apiRouter.post('/broadcast/:messageType', async (req: Request, res: Response) => {
      try {
        const messageType = req.params.messageType as WSMessageType;

        if (!Object.values(WSMessageType).includes(messageType)) {
          return res.status(400).json({
            error: '无效的消息类型',
            validTypes: Object.values(WSMessageType),
          });
        }

        const request: SendMessageRequest = {
          type: messageType,
          nodeId: req.body.nodeId,
          payload: req.body.payload,
        };

        const result = await this.sendMessage(request);
        return res.json(result);
      } catch (error) {
        this.logger.error('广播消息失败', error);
        return res.status(500).json({
          error: '广播消息失败',
          message: error instanceof Error ? error.message : '未知错误',
        });
      }
    });

    // 向特定连接发送消息
    apiRouter.post('/send-to-connection/:connectionId', async (req: Request, res: Response) => {
      try {
        const connectionId = req.params.connectionId;
        const { type, nodeId, payload } = req.body;

        if (!type || !Object.values(WSMessageType).includes(type)) {
          return res.status(400).json({
            error: '无效的消息类型',
            validTypes: Object.values(WSMessageType),
          });
        }

        const request: SendMessageRequest = {
          type,
          nodeId,
          payload,
          connectionId,
        };

        const result = await this.sendMessage(request);
        return res.json(result);
      } catch (error) {
        this.logger.error('向连接发送消息失败', error);
        return res.status(500).json({
          error: '向连接发送消息失败',
          message: error instanceof Error ? error.message : '未知错误',
        });
      }
    });

    // 注册 API 路由
    this.app.use('/api', apiRouter);

    // 根路径重定向到控制页面
    this.app.get('/', (req: Request, res: Response) => {
      res.redirect('/index.html');
    });
  }

  /**
   * 设置错误处理
   */
  private setupErrorHandling(): void {
    // 404 处理
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        error: '页面未找到',
        path: req.path,
      });
    });

    // 全局错误处理
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      this.logger.error('HTTP 服务器错误', {
        error: error.message,
        stack: error.stack,
        path: req.path,
        method: req.method,
      });

      res.status(500).json({
        error: '服务器内部错误',
        message: error.message,
      });
    });
  }

  /**
   * 启动 API 服务器
   */
  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(this.config.port, () => {
          this.logger.info(`HTTP API 服务器启动成功`, {
            port: this.config.port,
            staticPath: this.config.staticPath,
          });
          resolve();
        });

        this.server.on('error', (error: any) => {
          this.logger.error('HTTP API 服务器启动失败', error);

          if (error.code === 'EADDRINUSE') {
            reject(new Error(`端口 ${this.config.port} 已被占用`));
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
   * 停止 API 服务器
   */
  async stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          this.logger.info('HTTP API 服务器已停止');
          this.server = null;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * 获取服务器状态
   */
  getStatus(): ServerStatusResponse {
    const activeConnections = this.connectionManager.getActiveConnections();

    return {
      isRunning: this.server !== null,
      wsPort: this.wsServerConfig.wsPort,
      apiPort: this.config.port,
      activeConnections: activeConnections.length,
      connections: activeConnections.map(conn => ({
        id: conn.id,
        dtId: conn.dtId,
        connectedAt: conn.connectedAt,
        queryParams: conn.queryParams,
      })),
      config: this.wsServerConfig,
      startTime: this.startTime,
    };
  }

  /**
   * 发送消息
   */
  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    try {
      // 生成节点 ID（如果未提供）
      const nodeId = request.nodeId || `node-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      // 生成消息
      let message: WSMessage;
      if (request.payload) {
        // 使用提供的载荷
        message = {
          nodeId,
          type: request.type,
          timestamp: Date.now(),
          payload: request.payload,
        };
      } else {
        // 使用默认模拟数据
        message = this.messageHandler.generateMockResponse(request.type, nodeId);
      }

      // 发送消息
      let sentToConnections = 0;
      if (request.connectionId) {
        // 发送到特定连接
        const connection = this.connectionManager.getConnection(request.connectionId);
        if (!connection) {
          throw new Error(`连接不存在: ${request.connectionId}`);
        }
        this.connectionManager.sendToConnection(request.connectionId, message);
        sentToConnections = 1;
      } else {
        // 广播到所有连接
        const activeConnections = this.connectionManager.getActiveConnections();
        this.connectionManager.broadcast(message);
        sentToConnections = activeConnections.length;
      }

      this.logger.info('消息发送成功', {
        type: message.type,
        nodeId: message.nodeId,
        sentToConnections,
        connectionId: request.connectionId,
      });

      return {
        success: true,
        message,
        sentToConnections,
      };

    } catch (error) {
      this.logger.error('发送消息失败', error);
      return {
        success: false,
        message: {} as WSMessage,
        sentToConnections: 0,
        error: error instanceof Error ? error.message : '未知错误',
      };
    }
  }

  /**
   * 获取客户端列表
   */
  getClients(): ClientListResponse {
    const activeConnections = this.connectionManager.getActiveConnections();

    return {
      clients: activeConnections.map(conn => ({
        id: conn.id,
        dtId: conn.dtId,
        connectedAt: conn.connectedAt,
        queryParams: conn.queryParams,
        isActive: conn.isActive,
      })),
      total: activeConnections.length,
    };
  }
}

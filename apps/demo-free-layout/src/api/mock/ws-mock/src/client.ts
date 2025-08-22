/**
 * WebSocket 客户端 TypeScript 实现
 * 用于测试页面的类型安全 WebSocket 连接管理
 */

import {
  ConnectionState,
  MessageDirection,
  MessageHistoryItem,
  ClientConfig,
  WebSocketClient,
  UIController,
  PageState,
  Utils,
  AppState,
  ElementIds,
  CSSClasses,
  WSMessage,
  WSMessageType,
  WSFileMessage,
  WSRunToolMessage,
  WSRunWorkFlowMessage,
  WSAssetMessage,
  EventListener,
  EventEmitter,
} from './client-types';

/**
 * 简单的事件发射器实现
 */
class SimpleEventEmitter implements EventEmitter {
  private listeners: Map<string, EventListener[]> = new Map();

  on(event: string, listener: EventListener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  off(event: string, listener: EventListener): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  emit(event: string, data?: any): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }

  once(event: string, listener: EventListener): void {
    const onceListener: EventListener = (data) => {
      listener(data);
      this.off(event, onceListener);
    };
    this.on(event, onceListener);
  }
}
/**
 * WebSocket 客户端实现类
 */
class WSClient extends SimpleEventEmitter implements WebSocketClient {
  private ws: WebSocket | null = null;
  private config: ClientConfig;
  private reconnectTimer: number | null = null;
  private reconnectAttempts = 0;
  public state: ConnectionState = ConnectionState.DISCONNECTED;

  constructor(config: ClientConfig) {
    super();
    this.config = config;
  }

  async connect(): Promise<void> {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    this.setState(ConnectionState.CONNECTING);

    try {
      const url = this.buildWebSocketUrl();
      this.ws = new WebSocket(url);

      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
      this.ws.onerror = this.handleError.bind(this);

    } catch (error) {
      this.setState(ConnectionState.ERROR);
      this.emit('error', error);
      throw error;
    }
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.setState(ConnectionState.DISCONNECTED);
    this.reconnectAttempts = 0;
  }

  send(message: any): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket 连接未建立');
    }

    const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
    this.ws.send(messageStr);
    this.emit('messageSent', message);
  }

  onMessage(callback: (message: any) => void): void {
    this.on('message', callback);
  }

  onStateChange(callback: (state: ConnectionState) => void): void {
    this.on('stateChange', callback);
  }

  onError(callback: (error: Error) => void): void {
    this.on('error', callback);
  }

  private buildWebSocketUrl(): string {
    const url = new URL(this.config.serverUrl);
    if (this.config.dtId) {
      url.searchParams.set('dt_id', this.config.dtId);
    }
    return url.toString();
  }

  private setState(newState: ConnectionState): void {
    if (this.state !== newState) {
      this.state = newState;
      this.emit('stateChange', newState);
    }
  }

  private handleOpen(): void {
    this.setState(ConnectionState.CONNECTED);
    this.reconnectAttempts = 0;
    this.emit('connected');
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data);
      this.emit('message', message);
    } catch (error) {
      console.error('解析消息失败:', error);
      this.emit('error', new Error('消息解析失败'));
    }
  }

  private handleClose(): void {
    this.setState(ConnectionState.DISCONNECTED);
    this.emit('disconnected');

    if (this.config.autoReconnect && this.reconnectAttempts < this.config.maxReconnectAttempts) {
      this.scheduleReconnect();
    }
  }

  private handleError(error: Event): void {
    this.setState(ConnectionState.ERROR);
    this.emit('error', new Error('WebSocket 连接错误'));
  }

  private scheduleReconnect(): void {
    this.reconnectAttempts++;
    this.reconnectTimer = window.setTimeout(() => {
      console.log(`尝试重连 (${this.reconnectAttempts}/${this.config.maxReconnectAttempts})`);
      this.connect().catch(error => {
        console.error('重连失败:', error);
      });
    }, this.config.reconnectInterval);
  }
}

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Disposable, Emitter, injectable, } from "@flowgram.ai/free-layout-editor";
import {WSMessage} from "../typings";


@injectable()
export class WebSocketService {

  private ws: WebSocket | null = null;
  private url: string = 'wss://ws.dt.hitwin.tech';
  private reconnectInterval: number = 5000; // 5秒重连间隔
  private shouldReconnect: boolean = false;
  private messageEmitter = new Emitter<WSMessage>();
  private connectionStateEmitter = new Emitter<boolean>();


  // private disposers: Disposable[] = [];

  public onMessage = this.messageEmitter.event;
  public onConnectionStateChange = this.connectionStateEmitter.event;
  private currentNodeId: string | null = null;
  /**
   * 设置WebSocket连接URL
   * @param url WebSocket服务器地址
   */
  public setUrl(url: string): void {
    this.url = url;
  }

  public setDtInstanceId(dtInstanceId: string) {
    // 使用正则表达式匹配并替换dt_id参数，支持多次调用
    const urlObj = new URL(this.url);
    urlObj.searchParams.set('dt_id', dtInstanceId);
    this.url = urlObj.toString();
  }

  /**
   * 连接到WebSocket服务器
   */
  public connect(): void {
    if (!this.url) {
      console.warn('WebSocket URL未设置，无法连接');
      return;
    }

    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    // this.shouldReconnect = true;
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('WebSocket连接已建立');
      this.connectionStateEmitter.fire(true);
    };

    this.ws.onmessage = (event) => {
      try {
        console.log('Received message:', event.data);
        const message: WSMessage = JSON.parse(event.data);
        this.messageEmitter.fire(message);
      } catch (error) {
        console.error('解析WebSocket消息失败:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket连接已关闭');
      this.connectionStateEmitter.fire(false);
      if (this.shouldReconnect) {
        setTimeout(() => {
          this.connect();
        }, this.reconnectInterval);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket错误:', error);
    };
  }

  /**
   * 发送消息到WebSocket服务器
   * @param message 消息内容
   */
  public send(message:string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.warn('WebSocket未连接，无法发送消息');
    }
  }

  /**
   * 断开WebSocket连接
   */
  public disconnect(): void {
    this.shouldReconnect = false;
    if (this.ws) {
      this.ws.close();
    }
  }

  /**
   * 检查WebSocket连接状态
   */
  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  /**
   * 监听特定节点的消息
   * @param nodeId 节点ID
   * @param callback 消息回调函数
   */
  /*public onNodeMessage(nodeId: string, callback: (message: WebSocketMessage) => void): Disposable {
    const disposable = this.messageEmitter.event((message: WebSocketMessage) => {
      // 如果消息指定了nodeId且匹配当前节点ID，或者消息没有指定nodeId（广播消息）
      if ((message.nodeId && message.nodeId === nodeId) || !message.nodeId) {
        callback(message);
      }
    });

    return disposable;
  }*/
  public onNodeMessage(callback: (message: WSMessage) => void): Disposable {
    const disposable = this.messageEmitter.event((message: WSMessage) => {
      // console.log('onNodeMessage', message)
      // 如果消息指定了nodeId且匹配当前节点ID，或者消息没有指定nodeId（广播消息）
      // if ((message.nodeId && message.nodeId === nodeId) || !message.nodeId) {
      callback(message);
      // }
    });

    return disposable;
  }

  /**
   * 设置当前节点ID（用于处理当前上下文）
   * @param nodeId 节点ID
   */
  public setCurrentNode(nodeId: string): void {
    this.currentNodeId = nodeId;
  }

  /**
   * 获取当前节点ID
   */
  public getCurrentNode(): string | null {
    return this.currentNodeId;
  }

  /**
   * 清理资源
   */
  public dispose(): void {
    this.disconnect();

    /*    // 清理所有订阅
        this.disposers.forEach(disposer => {
          if (disposer) {
            disposer.dispose();
          }
        });*/

    this.messageEmitter.dispose();
    this.connectionStateEmitter.dispose();
    // this.disposers = [];
    this.currentNodeId = null;
  }
}

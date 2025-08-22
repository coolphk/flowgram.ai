# WebSocket 模拟服务器设计文档

## 概述

本设计文档描述了一个用于 demo-free-layout 项目的 WebSocket 模拟服务器实现。该服务器将提供完整的 WebSocket 通信模拟功能，包括服务端和一个用于测试的 Web 页面。

## 架构

### 整体架构

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   控制 Web 页面      │    │   HTTP API 服务器    │    │  WebSocket 服务器    │
│  (HTML + JS)       │◄──►│   (Express.js)     │◄──►│   (Node.js + ws)   │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
         │                           │                           │
         │                           │                           │
    ┌─────────┐                ┌─────────┐                ┌─────────┐
    │ 静态文件 │                │ 控制API │                │ 客户端   │
    │ 服务器   │                │ 路由    │                │ 连接管理 │
    └─────────┘                └─────────┘                └─────────┘
                                                                │
                                                                ▼
                                                    ┌─────────────────────┐
                                                    │  实际的 WebSocket    │
                                                    │  客户端应用          │
                                                    └─────────────────────┘
```

### 技术栈选择

- **WebSocket 服务器**: Node.js + ws 库
- **HTTP API 服务器**: Express.js
- **静态文件服务**: Express.js 静态文件中间件
- **控制页面**: 原生 HTML + JavaScript
- **消息格式**: 遵循项目中定义的 WSMessage 接口

## 组件和接口

### 1. WebSocket 服务器组件

**文件位置**: `apps/demo-free-layout/src/api/mock/ws-mock/server.js`

**主要功能**:
- 启动 WebSocket 服务器（默认端口 8080）
- 处理客户端连接和断开
- 解析查询参数（如 dt_id）
- 接收和响应各种类型的消息
- 定期发送模拟数据

**接口设计**:
```javascript
class WebSocketMockServer {
  constructor(port = 8080)
  start()
  stop()
  handleConnection(ws, request)
  handleMessage(ws, message)
  sendMockData(ws)
  broadcastMessage(message)
}
```

### 2. HTTP API 服务器组件

**文件位置**: `apps/demo-free-layout/src/api/mock/ws-mock/api-server.ts`

**主要功能**:
- 提供控制 API 接口
- 处理控制页面的消息发送请求
- 与 WebSocket 服务器通信
- 提供静态文件服务

**API 接口设计**:
```typescript
POST /api/send-message
{
  type: 'FileMessage' | 'RunToolMessage' | 'RunWorkFlowMessage' | 'AssetMessage',
  nodeId?: string,
  payload: any
}

GET /api/status
// 返回服务器状态和连接数

GET /api/clients
// 返回已连接的客户端列表
```

### 3. 控制页面组件

**文件位置**: `apps/demo-free-layout/src/api/mock/ws-mock/public/index.html`

**主要功能**:
- 提供控制界面
- 通过 HTTP API 控制服务器发送消息
- 显示服务器状态和连接信息
- 显示消息发送历史

**界面布局**:
```
┌─────────────────────────────────────┐
│        WebSocket 服务器控制页面      │
├─────────────────────────────────────┤
│ 服务器状态: [运行中] 连接数: [2]     │
├─────────────────────────────────────┤
│ 消息发送控制:                       │
│ [FileMessage] [RunToolMessage]      │
│ [RunWorkFlowMessage] [AssetMessage] │
├─────────────────────────────────────┤
│ 发送历史:                           │
│ ┌─────────────────────────────────┐ │
│ │ [时间] 已发送: {...}            │ │
│ │ [时间] 已发送: {...}            │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 数据模型

### 消息类型定义

基于项目中的 `WSMessage` 接口，支持以下消息类型：

1. **FileMessage** (UPLOAD_FILE)
```javascript
{
  nodeId: "node-123",
  type: "UPLOAD_FILE",
  timestamp: 1642678800000,
  payload: {
    description: "测试文件上传",
    assetsId: "asset-123",
    status: "success"
  }
}
```

2. **RunToolMessage** (RUN_TOOL)
```javascript
{
  nodeId: "node-123",
  type: "RUN_TOOL",
  timestamp: 1642678800000,
  payload: {
    status: "running",
    assetsId: ["asset-123", "asset-456"],
    toolId: "tool-789",
    url: "http://example.com/tool"
  }
}
```

3. **RunWorkFlowMessage** (WORKFLOW_STATUS)
```javascript
{
  nodeId: "node-123",
  type: "WORKFLOW_STATUS",
  timestamp: 1642678800000,
  payload: {
    status: "completed",
    assetsId: "asset-123"
  }
}
```

4. **AssetMessage** (ASSET_STATUS)
```javascript
{
  nodeId: "node-123",
  type: "ASSET_STATUS",
  timestamp: 1642678800000,
  payload: {
    status: "success",
    assetsId: "asset-123"
  }
}
```

### 连接参数处理

支持查询参数解析：
- `dt_id`: 数字孪生实例ID
- 其他自定义参数

## 错误处理

### 服务器端错误处理

1. **端口冲突处理**
   - 检测端口占用
   - 提供替代端口建议
   - 优雅的错误提示

2. **消息解析错误**
   - JSON 格式验证
   - 消息类型验证
   - 错误日志记录

3. **连接异常处理**
   - 客户端断开检测
   - 连接超时处理
   - 资源清理

### 客户端错误处理

1. **连接失败处理**
   - 自动重连机制
   - 连接状态显示
   - 用户友好的错误提示

2. **消息发送失败**
   - 发送状态反馈
   - 重试机制
   - 错误信息显示

## 测试策略

### 单元测试

1. **消息处理测试**
   - 各种消息类型的处理逻辑
   - 消息格式验证
   - 错误情况处理

2. **连接管理测试**
   - 连接建立和断开
   - 查询参数解析
   - 多客户端连接

### 集成测试

1. **端到端通信测试**
   - 客户端到服务器的完整消息流
   - 实时消息推送
   - 连接状态同步

2. **浏览器兼容性测试**
   - 主流浏览器的 WebSocket 支持
   - 页面功能完整性

### 手动测试

1. **功能测试**
   - 使用测试页面验证各种消息类型
   - 连接状态变化测试
   - 消息历史显示

2. **性能测试**
   - 多连接并发测试
   - 消息吞吐量测试
   - 内存使用监控

## 部署和运行

### 开发环境

1. **启动命令**
   ```bash
   cd apps/demo-free-layout/src/api/mock/ws-mock
   node server.js
   ```

2. **访问地址**
   - WebSocket 服务器: `ws://localhost:8080`
   - 测试页面: `http://localhost:3000`

### 配置选项

- WebSocket 端口: 默认 8080，可通过环境变量配置
- 静态文件端口: 默认 3000，可通过环境变量配置
- 模拟数据发送间隔: 默认 5 秒，可配置

## 扩展性考虑

1. **消息类型扩展**
   - 支持新增消息类型
   - 消息处理器插件化

2. **配置文件支持**
   - JSON 配置文件
   - 运行时配置修改

3. **日志系统**
   - 结构化日志输出
   - 日志级别控制
   - 日志文件轮转

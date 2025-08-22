# WebSocket 模拟服务器类型定义

本目录包含了 WebSocket 模拟服务器的完整 TypeScript 类型定义，确保类型安全和更好的开发体验。

## 文件结构

```
src/
├── types.ts           # 服务器端核心类型定义
├── client-types.ts    # 客户端专用类型定义
├── validators.ts      # 消息验证工具
├── index.ts          # 统一导出文件
├── test-types.ts     # 类型定义测试文件
└── README.md         # 本文档
```

## 核心类型

### WebSocket 消息类型

#### WSMessage 联合类型
所有 WebSocket 消息的基础类型，包含以下具体消息类型：

- `WSFileMessage` - 文件上传消息
- `WSRunToolMessage` - 工具运行消息
- `WSRunWorkFlowMessage` - 工作流状态消息
- `WSAssetMessage` - 资产状态消息
- `WSHightLightMessage` - 高亮消息

#### 消息类型枚举
```typescript
enum WSMessageType {
  FileMessage = 'UPLOAD_FILE',
  RunToolMessage = 'RUN_TOOL',
  RunWorkFlowMessage = 'WORKFLOW_STATUS',
  AssetMessage = 'ASSET_STATUS',
  HightLightMessage = 'HIGHLIGHT_ASSET',
}
```

#### 资产状态枚举
```typescript
enum WSAssetStatus {
  Success = 'success',
  Failed = 'failed',
  NotYet = 'notyet',
}
```

### 服务器端类型

#### ServerConfig - 服务器配置
```typescript
interface ServerConfig {
  wsPort: number;                    // WebSocket 服务器端口
  staticPort: number;                // 静态文件服务器端口
  mockDataInterval: number;          // 模拟数据发送间隔（毫秒）
  enableMockData: boolean;           // 是否启用自动模拟数据发送
  enableVerboseLogging: boolean;     // 是否启用详细日志
}
```

#### ClientConnection - 客户端连接信息
```typescript
interface ClientConnection {
  id: string;                        // 连接 ID
  ws: any;                          // WebSocket 连接对象
  connectedAt: number;              // 连接时间戳
  queryParams: Record<string, string>; // 查询参数
  dtId?: string;                    // 数字孪生实例 ID
  isActive: boolean;                // 是否活跃
}
```

### 客户端类型

#### ConnectionState - 连接状态
```typescript
enum ConnectionState {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
}
```

#### MessageHistoryItem - 消息历史记录
```typescript
interface MessageHistoryItem {
  id: string;                       // 消息 ID
  direction: MessageDirection;      // 消息方向（发送/接收）
  message: any;                     // 消息内容
  timestamp: number;                // 时间戳
  timeString: string;               // 格式化的时间字符串
}
```

## 验证工具

### 消息验证函数

#### validateWSMessage(message: any): ValidationResult
验证完整的 WebSocket 消息格式，返回验证结果。

#### isValidWSMessage(message: any): message is WSMessage
类型守卫函数，检查消息是否为有效的 WSMessage。

#### 具体消息类型验证
- `validateFilePayload()` - 验证文件消息载荷
- `validateRunToolPayload()` - 验证工具运行消息载荷
- `validateAssetPayload()` - 验证资产状态消息载荷
- `validateHighlightPayload()` - 验证高亮消息载荷

### 类型守卫函数
- `isFileMessage()` - 检查是否为文件消息
- `isRunToolMessage()` - 检查是否为工具运行消息
- `isRunWorkFlowMessage()` - 检查是否为工作流消息
- `isAssetMessage()` - 检查是否为资产消息
- `isHighlightMessage()` - 检查是否为高亮消息

## 使用示例

### 服务器端使用

```typescript
import {
  WSMessage,
  WSMessageType,
  ServerConfig,
  validateWSMessage,
  isValidWSMessage
} from './types';

// 创建服务器配置
const config: ServerConfig = {
  wsPort: 8080,
  staticPort: 3000,
  mockDataInterval: 5000,
  enableMockData: true,
  enableVerboseLogging: false,
};

// 处理接收到的消息
function handleMessage(data: string) {
  const { message, error } = safeParseMessage(data);

  if (error) {
    console.error('消息解析失败:', error);
    return;
  }

  const validation = validateWSMessage(message);
  if (!validation.isValid) {
    console.error('消息验证失败:', validation.errors);
    return;
  }

  // 类型安全的消息处理
  const wsMessage = message as WSMessage;
  console.log('收到有效消息:', wsMessage);
}
```

### 客户端使用

```typescript
import {
  ConnectionState,
  MessageHistoryItem,
  ClientConfig,
  WSMessageType
} from './client-types';

// 创建客户端配置
const clientConfig: ClientConfig = {
  serverUrl: 'ws://localhost:8080',
  autoReconnect: true,
  reconnectInterval: 3000,
  maxReconnectAttempts: 5,
  dtId: 'dt-instance-123',
};

// 创建消息历史记录
function addToHistory(direction: MessageDirection, message: any) {
  const historyItem: MessageHistoryItem = {
    id: generateId(),
    direction,
    message,
    timestamp: Date.now(),
    timeString: formatTimestamp(Date.now()),
  };

  messageHistory.push(historyItem);
}
```

## 类型安全特性

1. **强类型约束** - 所有消息类型都有严格的 TypeScript 类型定义
2. **类型守卫** - 提供运行时类型检查函数
3. **验证工具** - 内置消息格式验证功能
4. **错误处理** - 详细的错误信息和警告提示
5. **扩展性** - 易于添加新的消息类型和验证规则

## 注意事项

1. 所有消息都必须包含 `nodeId`、`type`、`timestamp` 和 `payload` 字段
2. 时间戳使用毫秒级的 Unix 时间戳
3. 消息类型必须是 `WSMessageType` 枚举中定义的值
4. 载荷格式必须符合对应消息类型的接口定义
5. 建议在发送消息前使用验证函数检查格式正确性

## 测试

运行 `test-types.ts` 文件可以验证类型定义是否正确：

```bash
# 如果有 TypeScript 编译器
npx tsc --noEmit src/test-types.ts

# 或者直接运行测试
node -r ts-node/register src/test-types.ts
```

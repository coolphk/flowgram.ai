/**
 * WebSocket 模拟服务器测试页面客户端脚本
 * 包含 WebSocket 连接管理和 HTTP API 交互功能
 */

// 全局状态管理
const AppState = {
  ws: null,
  isConnected: false,
  reconnectTimer: null,
  messageHistory: [],
  apiBaseUrl: '/api',
};

// DOM 元素引用
const Elements = {
  statusDot: null,
  statusText: null,
  reconnectBtn: null,
  wsUrl: null,
  messageLog: null,
  clearLogBtn: null,
  // WebSocket 消息按钮
  sendFileMessage: null,
  sendRunToolMessage: null,
  sendWorkflowMessage: null,
  sendAssetMessage: null,
  // HTTP API 按钮
  getServerStatus: null,
  getClientList: null,
  broadcastMessage: null,
  sendApiMessage: null,
};

// 消息类型枚举
const WSMessageType = {
  FileMessage: 'UPLOAD_FILE',
  RunToolMessage: 'RUN_TOOL',
  RunWorkFlowMessage: 'WORKFLOW_STATUS',
  AssetMessage: 'ASSET_STATUS',
  HightLightMessage: 'HIGHLIGHT_ASSET',
};

/**
 * 初始化应用
 */
function initApp() {
  // 获取 DOM 元素引用
  Elements.statusDot = document.getElementById('statusDot');
  Elements.statusText = document.getElementById('statusText');
  Elements.reconnectBtn = document.getElementById('reconnectBtn');
  Elements.wsUrl = document.getElementById('wsUrl');
  Elements.messageLog = document.getElementById('messageLog');
  Elements.clearLogBtn = document.getElementById('clearLogBtn');

  // WebSocket 消息按钮
  Elements.sendFileMessage = document.getElementById('sendFileMessage');
  Elements.sendRunToolMessage = document.getElementById('sendRunToolMessage');
  Elements.sendWorkflowMessage = document.getElementById('sendWorkflowMessage');
  Elements.sendAssetMessage = document.getElementById('sendAssetMessage');

  // HTTP API 按钮
  Elements.getServerStatus = document.getElementById('getServerStatus');
  Elements.getClientList = document.getElementById('getClientList');
  Elements.broadcastMessage = document.getElementById('broadcastMessage');
  Elements.sendApiMessage = document.getElementById('sendApiMessage');

  // 绑定事件监听器
  bindEventListeners();

  // 初始化日志
  logMessage('system', '页面加载完成，准备连接 WebSocket 服务器');
}

/**
 * 绑定事件监听器
 */
function bindEventListeners() {
  // WebSocket 连接控制
  Elements.reconnectBtn.addEventListener('click', toggleConnection);
  Elements.clearLogBtn.addEventListener('click', clearLog);

  // WebSocket 消息发送按钮
  Elements.sendFileMessage.addEventListener('click', () => sendWebSocketMessage(WSMessageType.FileMessage));
  Elements.sendRunToolMessage.addEventListener('click', () => sendWebSocketMessage(WSMessageType.RunToolMessage));
  Elements.sendWorkflowMessage.addEventListener('click', () => sendWebSocketMessage(WSMessageType.RunWorkFlowMessage));
  Elements.sendAssetMessage.addEventListener('click', () => sendWebSocketMessage(WSMessageType.AssetMessage));

  // HTTP API 按钮
  Elements.getServerStatus.addEventListener('click', getServerStatus);
  Elements.getClientList.addEventListener('click', getClientList);
  Elements.broadcastMessage.addEventListener('click', broadcastMessage);
  Elements.sendApiMessage.addEventListener('click', sendApiMessage);
}

/**
 * 切换 WebSocket 连接状态
 */
function toggleConnection() {
  if (AppState.isConnected) {
    disconnect();
  } else {
    connect();
  }
}

/**
 * 连接 WebSocket 服务器
 */
function connect() {
  const url = Elements.wsUrl.value.trim();
  if (!url) {
    logMessage('error', '请输入有效的 WebSocket 地址');
    return;
  }

  updateConnectionStatus('connecting', '连接中...');
  logMessage('system', `正在连接到: ${url}`);

  try {
    AppState.ws = new WebSocket(url);

    AppState.ws.onopen = handleWebSocketOpen;
    AppState.ws.onmessage = handleWebSocketMessage;
    AppState.ws.onclose = handleWebSocketClose;
    AppState.ws.onerror = handleWebSocketError;

  } catch (error) {
    logMessage('error', `连接失败: ${error.message}`);
    updateConnectionStatus('disconnected', '连接失败');
  }
}

/**
 * 断开 WebSocket 连接
 */
function disconnect() {
  if (AppState.ws) {
    AppState.ws.close();
    AppState.ws = null;
  }

  if (AppState.reconnectTimer) {
    clearTimeout(AppState.reconnectTimer);
    AppState.reconnectTimer = null;
  }

  updateConnectionStatus('disconnected', '已断开连接');
  logMessage('system', '主动断开连接');
}

/**
 * WebSocket 连接打开事件处理
 */
function handleWebSocketOpen(event) {
  AppState.isConnected = true;
  updateConnectionStatus('connected', '已连接');
  logMessage('system', 'WebSocket 连接已建立');

  // 启用消息发送按钮
  updateMessageButtonsState(true);
}

/**
 * WebSocket 消息接收事件处理
 */
function handleWebSocketMessage(event) {
  try {
    const message = JSON.parse(event.data);
    logMessage('received', `收到消息: ${message.type}`, message);
  } catch (error) {
    logMessage('error', `解析消息失败: ${error.message}`, event.data);
  }
}

/**
 * WebSocket 连接关闭事件处理
 */
function handleWebSocketClose(event) {
  AppState.isConnected = false;
  updateConnectionStatus('disconnected', '连接已关闭');
  updateMessageButtonsState(false);

  const reason = event.reason || '未知原因';
  logMessage('system', `连接关闭 (代码: ${event.code}, 原因: ${reason})`);

  // 如果不是主动关闭，尝试重连
  if (event.code !== 1000) {
    scheduleReconnect();
  }
}

/**
 * WebSocket 错误事件处理
 */
function handleWebSocketError(event) {
  logMessage('error', 'WebSocket 连接错误');
  updateConnectionStatus('disconnected', '连接错误');
}

/**
 * 安排重连
 */
function scheduleReconnect() {
  if (AppState.reconnectTimer) {
    clearTimeout(AppState.reconnectTimer);
  }

  AppState.reconnectTimer = setTimeout(() => {
    logMessage('system', '尝试自动重连...');
    connect();
  }, 3000);
}

/**
 * 发送 WebSocket 消息
 */
function sendWebSocketMessage(messageType) {
  if (!AppState.isConnected || !AppState.ws) {
    logMessage('error', '未连接到服务器，无法发送消息');
    return;
  }

  const message = generateMockMessage(messageType);

  try {
    AppState.ws.send(JSON.stringify(message));
    logMessage('sent', `发送消息: ${messageType}`, message);
  } catch (error) {
    logMessage('error', `发送消息失败: ${error.message}`);
  }
}

/**
 * 生成模拟消息
 */
function generateMockMessage(messageType) {
  const baseMessage = {
    nodeId: `node-${Date.now()}`,
    type: messageType,
    timestamp: Date.now(),
  };

  switch (messageType) {
    case WSMessageType.FileMessage:
      return {
        ...baseMessage,
        payload: {
          description: '测试文件上传',
          assetsId: `asset-${Date.now()}`,
          status: 'success',
        },
      };

    case WSMessageType.RunToolMessage:
      return {
        ...baseMessage,
        payload: {
          status: 'running',
          assetsId: [`asset-${Date.now()}`],
          toolId: `tool-${Date.now()}`,
          url: 'http://localhost:8080/test-tool',
        },
      };

    case WSMessageType.RunWorkFlowMessage:
      return {
        ...baseMessage,
        payload: {
          status: 'completed',
          assetsId: `asset-${Date.now()}`,
        },
      };

    case WSMessageType.AssetMessage:
      return {
        ...baseMessage,
        payload: {
          status: 'success',
          assetsId: `asset-${Date.now()}`,
        },
      };

    default:
      return baseMessage;
  }
}

/**
 * 更新连接状态显示
 */
function updateConnectionStatus(status, text) {
  // 更新状态点样式
  Elements.statusDot.className = `status-dot ${status}`;
  Elements.statusText.className = `status-text ${status}`;
  Elements.statusText.textContent = text;

  // 更新按钮文本和状态
  if (status === 'connected') {
    Elements.reconnectBtn.textContent = '断开连接';
    Elements.reconnectBtn.className = 'btn btn-secondary reconnect-btn';
  } else {
    Elements.reconnectBtn.textContent = '连接服务器';
    Elements.reconnectBtn.className = 'btn btn-primary reconnect-btn';
  }
}

/**
 * 更新消息发送按钮状态
 */
function updateMessageButtonsState(enabled) {
  const buttons = [
    Elements.sendFileMessage,
    Elements.sendRunToolMessage,
    Elements.sendWorkflowMessage,
    Elements.sendAssetMessage,
  ];

  buttons.forEach(button => {
    button.disabled = !enabled;
  });
}

/**
 * 记录消息到日志
 */
function logMessage(type, content, data = null) {
  const timestamp = new Date().toLocaleTimeString();
  const messageItem = document.createElement('div');
  messageItem.className = `message-item ${type}`;

  let messageContent = `<span class="message-timestamp">[${timestamp}]</span>`;
  messageContent += `<span class="message-content">${content}</span>`;

  if (data) {
    messageContent += `<br><span class="message-content" style="margin-left: 20px; color: #bdc3c7;">${JSON.stringify(data, null, 2)}</span>`;
  }

  messageItem.innerHTML = messageContent;
  Elements.messageLog.appendChild(messageItem);

  // 自动滚动到底部
  Elements.messageLog.scrollTop = Elements.messageLog.scrollHeight;

  // 保存到历史记录
  AppState.messageHistory.push({
    timestamp,
    type,
    content,
    data,
  });
}

/**
 * 清空日志
 */
function clearLog() {
  Elements.messageLog.innerHTML = '';
  AppState.messageHistory = [];
  logMessage('system', '日志已清空');
}

// ===== HTTP API 功能 =====

/**
 * 发送 HTTP API 请求
 */
async function makeApiRequest(method, path, data = null) {
  const url = `${AppState.apiBaseUrl}${path}`;

  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    return {
      success: response.ok,
      status: response.status,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 获取服务器状态
 */
async function getServerStatus() {
  logMessage('system', '正在获取服务器状态...');

  const result = await makeApiRequest('GET', '/status');

  if (result.success) {
    logMessage('received', 'API: 服务器状态', result.data);
  } else {
    logMessage('error', `API: 获取服务器状态失败 - ${result.error || result.data?.error}`);
  }
}

/**
 * 获取客户端列表
 */
async function getClientList() {
  logMessage('system', '正在获取客户端列表...');

  const result = await makeApiRequest('GET', '/clients');

  if (result.success) {
    logMessage('received', 'API: 客户端列表', result.data);
  } else {
    logMessage('error', `API: 获取客户端列表失败 - ${result.error || result.data?.error}`);
  }
}

/**
 * 广播消息
 */
async function broadcastMessage() {
  const messageType = 'UPLOAD_FILE';
  const messageData = {
    nodeId: `api-broadcast-${Date.now()}`,
    payload: {
      description: 'API 广播测试消息',
      assetsId: `api-asset-${Date.now()}`,
      status: 'success',
    },
  };

  logMessage('system', `正在通过 API 广播消息: ${messageType}`);

  const result = await makeApiRequest('POST', `/broadcast/${messageType}`, messageData);

  if (result.success) {
    logMessage('sent', 'API: 广播消息成功', result.data);
  } else {
    logMessage('error', `API: 广播消息失败 - ${result.error || result.data?.error}`);
  }
}

/**
 * 通过 API 发送消息
 */
async function sendApiMessage() {
  const messageData = {
    type: 'RUN_TOOL',
    nodeId: `api-message-${Date.now()}`,
    payload: {
      status: 'running',
      assetsId: [`api-asset-${Date.now()}`],
      toolId: `api-tool-${Date.now()}`,
      url: 'http://localhost:8080/api-test-tool',
    },
  };

  logMessage('system', '正在通过 API 发送消息...');

  const result = await makeApiRequest('POST', '/send-message', messageData);

  if (result.success) {
    logMessage('sent', 'API: 发送消息成功', result.data);
  } else {
    logMessage('error', `API: 发送消息失败 - ${result.error || result.data?.error}`);
  }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);

/**
 * WebSocket 消息验证工具
 * 提供类型安全的消息格式验证功能
 */

import {
  WSMessage,
  WSMessageType,
  WSFileMessage,
  WSRunToolMessage,
  WSRunWorkFlowMessage,
  WSAssetMessage,
  WSHightLightMessage,
  WSFilePayload,
  WSRunToolPayload,
  WSAssetPayload,
  WSHightLightPayload,
} from './types';

/**
 * 验证结果接口
 */
export interface ValidationResult {
  /** 是否有效 */
  isValid: boolean;
  /** 错误信息 */
  errors: string[];
  /** 警告信息 */
  warnings: string[];
}

/**
 * 基础消息结构验证
 */
export function validateBaseMessage(message: any): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  // 检查必需字段
  if (!message.nodeId || typeof message.nodeId !== 'string') {
    result.errors.push('nodeId 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!message.type || typeof message.type !== 'string') {
    result.errors.push('type 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!message.timestamp || typeof message.timestamp !== 'number') {
    result.errors.push('timestamp 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!message.payload || typeof message.payload !== 'object') {
    result.errors.push('payload 字段缺失或类型错误');
    result.isValid = false;
  }

  // 检查消息类型是否有效
  if (message.type && !Object.values(WSMessageType).includes(message.type)) {
    result.errors.push(`无效的消息类型: ${message.type}`);
    result.isValid = false;
  }

  // 检查时间戳是否合理
  if (message.timestamp) {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const oneHourLater = now + 60 * 60 * 1000;

    if (message.timestamp < oneHourAgo || message.timestamp > oneHourLater) {
      result.warnings.push('时间戳可能不准确');
    }
  }

  return result;
}

/**
 * 验证文件消息载荷
 */
export function validateFilePayload(payload: any): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  if (!payload.description || typeof payload.description !== 'string') {
    result.errors.push('description 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!payload.assetsId || typeof payload.assetsId !== 'string') {
    result.errors.push('assetsId 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!payload.status || typeof payload.status !== 'string') {
    result.errors.push('status 字段缺失或类型错误');
    result.isValid = false;
  }

  return result;
}

/**
 * 验证工具运行消息载荷
 */
export function validateRunToolPayload(payload: any): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  if (!payload.status || typeof payload.status !== 'string') {
    result.errors.push('status 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!Array.isArray(payload.assetsId)) {
    result.errors.push('assetsId 字段必须是数组');
    result.isValid = false;
  } else {
    payload.assetsId.forEach((id: any, index: number) => {
      if (typeof id !== 'string') {
        result.errors.push(`assetsId[${index}] 必须是字符串`);
        result.isValid = false;
      }
    });
  }

  if (!payload.toolId || typeof payload.toolId !== 'string') {
    result.errors.push('toolId 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!payload.url || typeof payload.url !== 'string') {
    result.errors.push('url 字段缺失或类型错误');
    result.isValid = false;
  }

  // 验证 URL 格式
  if (payload.url) {
    try {
      new URL(payload.url);
    } catch {
      result.warnings.push('url 格式可能不正确');
    }
  }

  return result;
}

/**
 * 验证资产状态消息载荷
 */
export function validateAssetPayload(payload: any): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  if (!payload.status || typeof payload.status !== 'string') {
    result.errors.push('status 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!payload.assetsId || typeof payload.assetsId !== 'string') {
    result.errors.push('assetsId 字段缺失或类型错误');
    result.isValid = false;
  }

  return result;
}

/**
 * 验证高亮消息载荷
 */
export function validateHighlightPayload(payload: any): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  if (!payload.nodeId || typeof payload.nodeId !== 'string') {
    result.errors.push('nodeId 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!payload.dataSlotId || typeof payload.dataSlotId !== 'string') {
    result.errors.push('dataSlotId 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!payload.name || typeof payload.name !== 'string') {
    result.errors.push('name 字段缺失或类型错误');
    result.isValid = false;
  }

  if (!Array.isArray(payload.assetIds)) {
    result.errors.push('assetIds 字段必须是数组');
    result.isValid = false;
  } else {
    payload.assetIds.forEach((id: any, index: number) => {
      if (typeof id !== 'string') {
        result.errors.push(`assetIds[${index}] 必须是字符串`);
        result.isValid = false;
      }
    });
  }

  return result;
}

/**
 * 验证完整的 WebSocket 消息
 */
export function validateWSMessage(message: any): ValidationResult {
  // 首先验证基础结构
  const baseResult = validateBaseMessage(message);
  if (!baseResult.isValid) {
    return baseResult;
  }

  // 根据消息类型验证载荷
  let payloadResult: ValidationResult;

  switch (message.type) {
    case WSMessageType.FileMessage:
      payloadResult = validateFilePayload(message.payload);
      break;
    case WSMessageType.RunToolMessage:
      payloadResult = validateRunToolPayload(message.payload);
      break;
    case WSMessageType.RunWorkFlowMessage:
    case WSMessageType.AssetMessage:
      payloadResult = validateAssetPayload(message.payload);
      break;
    case WSMessageType.HightLightMessage:
      payloadResult = validateHighlightPayload(message.payload);
      break;
    default:
      payloadResult = {
        isValid: false,
        errors: [`未知的消息类型: ${message.type}`],
        warnings: [],
      };
  }

  // 合并验证结果
  return {
    isValid: baseResult.isValid && payloadResult.isValid,
    errors: [...baseResult.errors, ...payloadResult.errors],
    warnings: [...baseResult.warnings, ...payloadResult.warnings],
  };
}

/**
 * 类型守卫：检查是否为有效的 WSMessage
 */
export function isValidWSMessage(message: any): message is WSMessage {
  const result = validateWSMessage(message);
  return result.isValid;
}

/**
 * 类型守卫：检查是否为文件消息
 */
export function isFileMessage(message: WSMessage): message is WSFileMessage {
  return message.type === WSMessageType.FileMessage;
}

/**
 * 类型守卫：检查是否为工具运行消息
 */
export function isRunToolMessage(message: WSMessage): message is WSRunToolMessage {
  return message.type === WSMessageType.RunToolMessage;
}

/**
 * 类型守卫：检查是否为工作流消息
 */
export function isRunWorkFlowMessage(message: WSMessage): message is WSRunWorkFlowMessage {
  return message.type === WSMessageType.RunWorkFlowMessage;
}

/**
 * 类型守卫：检查是否为资产消息
 */
export function isAssetMessage(message: WSMessage): message is WSAssetMessage {
  return message.type === WSMessageType.AssetMessage;
}

/**
 * 类型守卫：检查是否为高亮消息
 */
export function isHighlightMessage(message: WSMessage): message is WSHightLightMessage {
  return message.type === WSMessageType.HightLightMessage;
}

/**
 * 安全解析 JSON 消息
 */
export function safeParseMessage(data: string): { message: any; error?: string } {
  try {
    const message = JSON.parse(data);
    return { message };
  } catch (error) {
    return {
      message: null,
      error: `JSON 解析失败: ${error instanceof Error ? error.message : '未知错误'}`
    };
  }
}

/**
 * 格式化验证错误信息
 */
export function formatValidationErrors(result: ValidationResult): string {
  const parts: string[] = [];

  if (result.errors.length > 0) {
    parts.push(`错误: ${result.errors.join(', ')}`);
  }

  if (result.warnings.length > 0) {
    parts.push(`警告: ${result.warnings.join(', ')}`);
  }

  return parts.join(' | ');
}

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, {useEffect, useRef, useState} from 'react';
import {useLog} from '../../context/log-context';
import styled from 'styled-components';

const TerminalContainer = styled.div`
    background-color: #1e1e1e;
    position: absolute;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    padding: 10px;
    border-radius: 4px;
    height: 150px;
    overflow-y: auto;
    margin-top: 10px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
`;

const LogLine = styled.div`
    margin: 2px 0;
    font-size: 12px;
    line-height: 1.4;
    white-space: pre-wrap;
    word-break: break-all;
`;

const Prompt = styled.span`
    color: #00aaff;
    margin-right: 5px;
`;

const LogContent = styled.span`
    color: #00ff00;
`;

const ErrorContent = styled.span`
    color: #ff5555;
`;

const WarningContent = styled.span`
    color: #ffaa00;
`;

const InfoContent = styled.span`
    color: #aaaaff;
`;

interface LogEntry {
  type: 'info' | 'warning' | 'error' | 'success';
  content: string;
  timestamp: Date;
}

// 添加索引以跟踪当前日志位置
let infoIndex = 0;
let warningIndex = 0;
let errorIndex = 0;
let successIndex = 0;
let typeIndex = 0
// 按顺序生成日志内容
const generateRandomLog = (): LogEntry => {
  const types = ['info', /*'warning', 'error',*/ 'success'] as const;
  const type = types[typeIndex];
  if (typeIndex === types[typeIndex].length) {
    typeIndex++
  }
  if (typeIndex >= types.length) {
    typeIndex = 0
  }
  const infoMessages = [
    'Initializing system components...',
    'Loading configuration from server...',
    'Connecting to database...',
    'Checking network status...',
    'Processing data...',
    'Analyzing workflow...',
    'Analyzing workflow...',
    'Analyzing workflow...',
    'Fetching resources...',
    'Updating cache...',
    'Starting Vesta...',
    'Vesta Virtualizing...',
    'Vesta Virtualizing...',
    'Vesta Virtualizing...',
    'Vesta Virtualizing...',
    'Vesta started successfully',
  ];

  const warningMessages = [
    /*'Network latency detected',
    'Resource usage high',
    'Cache size exceeding threshold',
    'Connection attempt timed out, retrying...',
    'Deprecated API usage detected',
    'Memory usage approaching limit',*/
  ];

  const errorMessages = [
    /*'Failed to connect to server',
    'Database query error',
    'Authentication failed',
    'Invalid configuration detected',
    'Resource not found',
    'Operation timed out',*/
  ];

  const successMessages = [
    'Vesta started successfully',
    /*'Connection established successfully',
    'Data processed successfully',
    'Task completed',
    'Resources loaded successfully',
    'Configuration updated',
    'System optimized',*/
  ];

  let content = '';
  switch (type) {
    case 'info':
      content = infoMessages[infoIndex];
      infoIndex++;
      break;
    /*case 'warning':
      content = warningMessages[warningIndex % warningMessages.length];
      warningIndex++;
      break;
    case 'error':
      content = errorMessages[errorIndex % errorMessages.length];
      errorIndex++;
      break;*/
    case 'success':
      content = successMessages[successIndex % successMessages.length];
      successIndex++;
      break;
  }

  return {
    type,
    content,
    timestamp: new Date(),
  };
};

export const TerminalLog: React.FC = () => {
  const {isLogVisible} = useLog();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 添加新日志
  const addLog = () => {
    const newLog = generateRandomLog();
    setLogs(prevLogs => [...prevLogs, newLog].slice(-100)); // 只保留最近的100条日志
  };

  // 当日志可见性变化时处理定时器
  useEffect(() => {
    if (isLogVisible) {
      // 清空之前的日志
      setLogs([]);

      // 立即添加一条日志
      addLog();

      // 设置定时器，每隔一段时间添加新日志
      logIntervalRef.current = setInterval(() => {
        addLog();
      }, 1000); // 每800毫秒添加一条日志
    } else {
      // 如果日志不可见，清除定时器
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
        logIntervalRef.current = null;
      }
    }

    // 清理函数
    return () => {
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
      }
    };
  }, [isLogVisible]);

  // 自动滚动到底部
  useEffect(() => {
    if (containerRef.current && isLogVisible) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, isLogVisible]);

  // 如果日志不可见，不渲染组件
  if (!isLogVisible) {
    return null;
  }

  return (
    <TerminalContainer ref={containerRef}>
      {logs.map((log, index) => {
        const timestamp = log.timestamp.toLocaleTimeString();

        let ContentComponent;
        switch (log.type) {
          case 'error':
            ContentComponent = ErrorContent;
            break;
          case 'warning':
            ContentComponent = WarningContent;
            break;
          case 'info':
            ContentComponent = InfoContent;
            break;
          default:
            ContentComponent = LogContent;
        }

        return (
          <LogLine key={index}>
            <Prompt>[{timestamp}]$</Prompt>
            <ContentComponent>{log.content}</ContentComponent>
          </LogLine>
        );
      })}
    </TerminalContainer>
  );
};

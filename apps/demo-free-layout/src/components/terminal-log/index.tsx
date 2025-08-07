/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLog } from '../../context/log-context';
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

// 随机生成日志内容
const generateRandomLog = (): LogEntry => {
  const types = ['info', 'warning', 'error', 'success'] as const;
  const type = types[Math.floor(Math.random() * types.length)];

  const infoMessages = [
    'Initializing system components...',
    'Loading configuration from server...',
    'Connecting to database...',
    'Checking network status...',
    'Processing data...',
    'Analyzing workflow...',
    'Fetching resources...',
    'Updating cache...',
  ];

  const warningMessages = [
    'Network latency detected',
    'Resource usage high',
    'Cache size exceeding threshold',
    'Connection attempt timed out, retrying...',
    'Deprecated API usage detected',
    'Memory usage approaching limit',
  ];

  const errorMessages = [
    'Failed to connect to server',
    'Database query error',
    'Authentication failed',
    'Invalid configuration detected',
    'Resource not found',
    'Operation timed out',
  ];

  const successMessages = [
    'Connection established successfully',
    'Data processed successfully',
    'Task completed',
    'Resources loaded successfully',
    'Configuration updated',
    'System optimized',
  ];

  let content = '';
  switch (type) {
    case 'info':
      content = infoMessages[Math.floor(Math.random() * infoMessages.length)];
      break;
    case 'warning':
      content = warningMessages[Math.floor(Math.random() * warningMessages.length)];
      break;
    case 'error':
      content = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      break;
    case 'success':
      content = successMessages[Math.floor(Math.random() * successMessages.length)];
      break;
  }

  return {
    type,
    content,
    timestamp: new Date(),
  };
};

export const TerminalLog: React.FC = () => {
  const { isLogVisible } = useLog();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelTopRef = useRef<HTMLDivElement>(null);
  const sentinelBottomRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<Date | null>(null);
  const logCountRef = useRef<number>(0);

  // 每条日志的固定高度（包括 margin）
  const ITEM_HEIGHT = 20;
  // 缓冲区大小，在可见区域上下各保留的条目数
  const BUFFER_SIZE = 5;

  // 添加新日志
  const addLog = useCallback(() => {
    // 如果是第一次添加日志，记录开始时间（北京时间）
    if (startTimeRef.current === null) {
      // const now = new Date();
      const beijingTime = new Date();
      startTimeRef.current = beijingTime;
      logCountRef.current = 0;
    }

    // 计算模拟时间戳（开始时间 + 日志序号 * 间隔时间）
    const simulatedTime = new Date(startTimeRef.current.getTime() + logCountRef.current * 800);
    logCountRef.current++;

    const newLog = {
      ...generateRandomLog(),
      timestamp: simulatedTime
    };

    setLogs(prevLogs => {
      const newLogs = [...prevLogs, newLog].slice(-500); // 保留最近的500条日志
      return newLogs;
    });
  }, []);

  // IntersectionObserver 回调
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.target === sentinelTopRef.current && entry.isIntersecting) {
        // 向上滚动，显示更早的日志
        setVisibleRange(prev => ({
          start: Math.max(0, prev.start - BUFFER_SIZE),
          end: prev.end
        }));
      }

      if (entry.target === sentinelBottomRef.current && entry.isIntersecting) {
        // 向下滚动，显示更新的日志
        setVisibleRange(prev => ({
          start: prev.start,
          end: Math.min(logs.length, prev.end + BUFFER_SIZE)
        }));
      }
    });
  }, [logs.length]);

  // 设置 IntersectionObserver
  useEffect(() => {
    if (!isLogVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: containerRef.current,
      rootMargin: '20px', // 提前 20px 开始加载
      threshold: 0
    });

    if (sentinelTopRef.current) observer.observe(sentinelTopRef.current);
    if (sentinelBottomRef.current) observer.observe(sentinelBottomRef.current);

    return () => observer.disconnect();
  }, [isLogVisible, handleIntersection]);

  // 当日志数量变化时，更新可见范围
  useEffect(() => {
    if (logs.length > 0) {
      const containerHeight = 150; // TerminalContainer 的高度
      const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT) + BUFFER_SIZE * 2;

      setVisibleRange(prev => {
        const newEnd = Math.min(logs.length, Math.max(prev.end, logs.length));
        const newStart = Math.max(0, newEnd - visibleCount);
        return { start: newStart, end: newEnd };
      });
    }
  }, [logs.length]);

  // 当日志可见性变化时处理定时器
  useEffect(() => {
    if (isLogVisible) {
      // 重置时间和计数器
      startTimeRef.current = null;
      logCountRef.current = 0;

      // 立即添加一条日志
      addLog();

      // 设置定时器，每隔一段时间添加新日志
      logIntervalRef.current = setInterval(() => {
        addLog();
      }, 800); // 每800毫秒添加一条日志
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
  }, [isLogVisible, addLog]);

  // 自动滚动到底部
  useEffect(() => {
    if (containerRef.current && isLogVisible && logs.length > 0) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs.length, isLogVisible]);

  // 如果日志不可见，不渲染组件
  if (!isLogVisible) {
    return null;
  }

  // 计算虚拟化渲染参数
  const visibleLogs = logs.slice(visibleRange.start, visibleRange.end);
  const totalHeight = logs.length * ITEM_HEIGHT;
  const offsetY = visibleRange.start * ITEM_HEIGHT;
  const remainingHeight = totalHeight - offsetY - (visibleRange.end - visibleRange.start) * ITEM_HEIGHT;

  return (
    <TerminalContainer ref={containerRef}>
      {/* 顶部占位符 */}
      {offsetY > 0 && <div style={{ height: offsetY }} />}

      {/* 顶部哨兵元素 */}
      {visibleRange.start > 0 && (
        <div ref={sentinelTopRef} style={{ height: 1, backgroundColor: 'transparent' }} />
      )}

      {/* 可见的日志条目 */}
      {visibleLogs.map((log, index) => {
        const actualIndex = visibleRange.start + index;
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
          <LogLine key={actualIndex} style={{ height: ITEM_HEIGHT, minHeight: ITEM_HEIGHT }}>
            <Prompt>[{timestamp}]$</Prompt>
            <ContentComponent>{log.content}</ContentComponent>
          </LogLine>
        );
      })}

      {/* 底部哨兵元素 */}
      {visibleRange.end < logs.length && (
        <div ref={sentinelBottomRef} style={{ height: 1, backgroundColor: 'transparent' }} />
      )}

      {/* 底部占位符 */}
      {remainingHeight > 0 && <div style={{ height: remainingHeight }} />}
    </TerminalContainer>
  );
};

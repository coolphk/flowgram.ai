/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useService } from '@flowgram.ai/free-layout-editor';
import { AnimationBorderService, AnimationState } from '../../services/animation-border-service';

/**
 * AnimateBorderWrapper 组件属性
 */
export interface AnimateBorderWrapperProps {
  nodeId: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * 动画边框包装组件
 * 使用motion框架实现流畅的边框动画效果
 */
export const AnimateBorderWrapper: React.FC<AnimateBorderWrapperProps> = ({
  nodeId,
  children,
  className
}) => {
  const animationService = useService(AnimationBorderService);
  const [animationState, setAnimationState] = useState<AnimationState | null>(null);

  useEffect(() => {
    // 监听动画状态变化
    const disposable = animationService.onStateChange(({ nodeId: changeNodeId, state }) => {
      if (changeNodeId === nodeId) {
        setAnimationState(state);
      }
    });

    // 初始化时获取当前状态
    const currentState = animationService.getAnimationState(nodeId);
    setAnimationState(currentState);

    return () => {
      disposable.dispose();
    };
  }, [nodeId, animationService]);

  // 如果没有动画状态，直接渲染子组件
  if (!animationState || !animationState.isActive || !animationState.config.enabled) {
    return <>{children}</>;
  }

  const { config } = animationState;

  // 将缓动函数转换为motion库支持的格式
  const getMotionEasing = (curve: string) => {
    switch (curve) {
      case 'ease-in-out':
      case 'easeInOut':
        return 'easeInOut'
      case 'ease-in':
      case 'easeIn':
        return 'easeIn'
      case 'ease-out':
      case 'easeOut':
        return 'easeOut'
      case 'linear':
        return 'linear'
      default:
        return 'easeInOut' // 默认值
    }
  }

  return (
    <motion.div
      className={className}
      initial={{
        scale: 1,
        boxShadow: 'none'
      }}
      animate={{
        scale: config.duration > 0 ? [1, 1.02, 1] : 1,
        boxShadow: config.duration > 0 ? [
          'none',
          `0 0 0 ${config.width}px ${config.color}`,
          'none'
        ] : `0 0 0 ${config.width}px ${config.color}`
      }}
      transition={{
        duration: config.duration > 0 ? config.duration / 1000 : 0, // 转换为秒
        repeat: config.duration > 0 ? Infinity : 0,
        ease: getMotionEasing(config.curve),
        repeatType: config.duration > 0 ? 'loop' : undefined
      }}
      style={{
        borderRadius: '8px', // 与NodeWrapperStyle保持一致
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </motion.div>
  );
};
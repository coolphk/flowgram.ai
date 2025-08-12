/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ENV, EnvType } from '../constants/env';
import { SaveRequest } from "../typings";

interface EnvContextType {
  currentEnv: EnvType;
  setCurrentEnv: (env: EnvType) => void;
  isDev: boolean;
  isProd: boolean;
  dtTemplateId: string;
  setDtTemplateId: (id: string) => void;
  dtInstanceId: string;
  setDtInstanceId: (id: string) => void;
  saveContent: SaveRequest | undefined;
  setSaveContent: (content: SaveRequest) => void;
}

const EnvContext = createContext<EnvContextType | undefined>(undefined);

// 保存 EnvContext 的引用，以便在非 React 组件中使用
let envContextRef: EnvContextType | undefined;

interface EnvProviderProps {
  children: ReactNode;
  defaultEnv?: EnvType;
}

export const EnvProvider: React.FC<EnvProviderProps> = ({
  children,
  defaultEnv = ENV.DEV
}) => {
  const [currentEnv, setCurrentEnv] = useState<EnvType>(defaultEnv);
  const [dtTemplateId, setDtTemplateId] = useState<string>('');
  const [dtInstanceId, setDtInstanceId] = useState<string>('');
  const [saveContent, setSaveContent] = useState<SaveRequest | undefined>();
  const isDev = currentEnv === ENV.DEV;
  const isProd = currentEnv === ENV.PROD;

  const value: EnvContextType = {
    currentEnv,
    setCurrentEnv,
    isDev,
    isProd,
    dtTemplateId,
    setDtTemplateId,
    dtInstanceId,
    setDtInstanceId,
    saveContent,
    setSaveContent
  };

  // 保存引用
  envContextRef = value;

  return (
    <EnvContext.Provider value={value}>
      {children}
    </EnvContext.Provider>
  );
};

export const useEnv = (): EnvContextType => {
  const context = useContext(EnvContext);
  if (context === undefined) {
    throw new Error('useEnv must be used within an EnvProvider');
  }
  return context;
};

// 提供一个可以在非 React 组件中使用的方法
export const updateDtTemplateId = (id: string): void => {
  if (envContextRef) {
    envContextRef.setDtTemplateId(id);
  }
};

export const updateSaveContent = (content: SaveRequest): void => {
  if (envContextRef) {
    envContextRef.setSaveContent(content);
  }
};
export const getEnv = (): EnvContextType => {
  if (envContextRef) {
    return envContextRef;
  }
  throw new Error('getEnv must be used within an EnvProvider');
};

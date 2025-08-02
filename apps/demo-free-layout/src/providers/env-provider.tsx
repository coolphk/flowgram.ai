/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ENV, EnvType } from '../constants/env';

interface EnvContextType {
  currentEnv: EnvType;
  setCurrentEnv: (env: EnvType) => void;
  isDev: boolean;
  isProd: boolean;
}

const EnvContext = createContext<EnvContextType | undefined>(undefined);

interface EnvProviderProps {
  children: ReactNode;
  defaultEnv?: EnvType;
}

export const EnvProvider: React.FC<EnvProviderProps> = ({ 
  children, 
  defaultEnv = ENV.DEV 
}) => {
  const [currentEnv, setCurrentEnv] = useState<EnvType>(defaultEnv);

  const isDev = currentEnv === ENV.DEV;
  const isProd = currentEnv === ENV.PROD;

  const value: EnvContextType = {
    currentEnv,
    setCurrentEnv,
    isDev,
    isProd
  };

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
/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LogContextType {
  isLogVisible: boolean;
  setLogVisible: (visible: boolean) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogVisible, setLogVisible] = useState(false);

  return (
    <LogContext.Provider value={{ isLogVisible, setLogVisible }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => {
  const context = useContext(LogContext);
  if (context === undefined) {
    throw new Error('useLog must be used within a LogProvider');
  }
  return context;
};

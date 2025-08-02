import {useState} from "react";
import {Environment} from "../constants";

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarContext.Provider value={{ visible: !!nodeId, nodeId, setNodeId }}>
  {children}
  </SidebarContext.Provider>
);
}
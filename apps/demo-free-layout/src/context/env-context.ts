import React from "react";
import {Environment} from "../components/constants";

export const EnvironmentContext = React.createContext<{
  environment: Environment;
  setEnvironment: (environment: Environment) => void;
}>({
  environment: Environment.DEV, setEnvironment: () => {
  }
});
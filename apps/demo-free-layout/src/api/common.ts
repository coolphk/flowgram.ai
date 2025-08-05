/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {alovaInstance} from "./index";
import {Validation} from "../typings";

export interface ISaveContentParam {
  dataslots: [
    {
      id: string;
      type: string;
      name: string;
      description: string;
      validations: string[];
      tools: string[];
      from: string;
      to: string;
      uploadFiles: string[];
    }
  ];
  workflows: [
    {
      id: string;
      type: string;
      inputs: Record<string, any>;
      outputs: Record<string, any>;
    }
  ];
  raw: string;
}


export const getUniqueId = <T>() => {
  console.log("getUniqueId")
  return alovaInstance.Get<T>("/id", {
    cacheFor: 0,
    shareRequest: false,
  });
}

export const saveContent = (content: ISaveContentParam) =>
  alovaInstance.Post<string>("/save", {
    data: content,
  });
export const getTools = <T>(param: Validation[]) =>
  alovaInstance.Post<T>("/tool", {
    cacheFor: 0,
    data: param,
  });
/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {alovaInstance} from "./index";
import {Validation} from "../typings";

export interface ISaveContentParam {
  id: string,
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
  ],
  workflows: [
    {
      id: string;
      type: string;
      inputs: Record<string, any>;
      outputs: Record<string, any>;
    }
  ],
  raw: string
}


export const getUniqueId = <T>() => {
  // console.log("getUniqueId")
  return alovaInstance.Get<T>("/id", {
    cacheFor: 0,
    shareRequest: false,
  });
}

export const save = async (content: ISaveContentParam) => {
  console.log('save')
  try {
    const response = await alovaInstance.Post<string>("/save",
      content,
    );
    console.log('Save successful:', response);
    return response;
  } catch (error) {
    console.error('Save failed:', error);
    throw error;
  }
}
export const getTools = <T>(param: Validation[]) =>
  alovaInstance.Post<T>("/tool", {
    cacheFor: 0,
    data: param,
  });
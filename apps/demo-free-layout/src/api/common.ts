/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { alovaInstance } from "./index";
import { SaveRequest, Validation } from "../typings";
import { RunToolRequest } from "../typings/api";

export const getUniqueId = <T>() => {
  // console.log("getUniqueId")
  return alovaInstance.Get<T>("/id", {
    cacheFor: 0,
    shareRequest: false,
  });
}

export const save = async (content: SaveRequest) => {
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
  alovaInstance.Post<T>("/tool", { Validations: param }, {
    cacheFor: 0,
  });

export const runTool = <T>(param: RunToolRequest) =>
  alovaInstance.Post<T>("/run-tool", param, {
    cacheFor: 0,
  });

export const runDt = (dtTemplateId: string) => {
  return alovaInstance.Post<string>("/run?dt_template_id=" + dtTemplateId)
}

export const showHighLights = () => {
  return alovaInstance.Get<string>("/highlights")
}

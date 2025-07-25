/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */



import reactHook from 'alova/react';
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
export const alovaInstance = createAlova({
  baseURL: 'https://api.dt.hitdttest.tech',
  statesHook: reactHook,
  requestAdapter: adapterFetch(),
  responded: {
    onSuccess: async (response, method) => {
      // console.log('responded', response, method)
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      const json = await response.json()
      if (json.code !== 200) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(json.message)
      }
      // 解析的响应数据将传给method实例的transform钩子函数，这些函数将在后续讲解
      return json.data
    },
  },
})
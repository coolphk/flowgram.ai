import { alovaInstance } from './index';

export const getUniqueId = () =>
  alovaInstance.Get('/id', {
    cacheFor: 0,
  })

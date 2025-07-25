import { alovaInstance } from './index';

export const getWorkflows = <T>() =>
  alovaInstance.Get<T>('/workflow', {
    cacheFor: 0,
  });

import { useMemo } from 'react';

export const useTagLength = (keys: string[]) => {
  const maxTagCount = useMemo(() => {
    let totalLength = 0;
    let longKeyCount = 0;

    // 累加keys中key的长度，并记录长度超过19的key数量
    for (const key of keys) {
      totalLength += key.length;
      longKeyCount++;
      if (totalLength >= 12) {
        if (longKeyCount >= keys.length) {
          return longKeyCount - 1;
        }
        return longKeyCount;
      }
    }
    return keys.length; // 确保至少显示1个tag
  }, [keys]);

  return maxTagCount;
};

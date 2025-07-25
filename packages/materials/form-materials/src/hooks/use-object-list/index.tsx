/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { difference } from 'lodash';

function genId() {
  return nanoid();
}

interface ListItem<ValueType> {
  id: string;
  key?: string;
  value?: ValueType;
}

type ObjectType<ValueType> = Record<string, ValueType | undefined>;

export function useObjectList<ValueType>({
  value,
  onChange,
}: {
  value?: ObjectType<ValueType>;
  onChange: (value?: ObjectType<ValueType>) => void;
}) {
  const [list, setList] = useState<ListItem<ValueType>[]>([]);

  useEffect(() => {
    setList((_prevList) => {
      const newKeys = Object.keys(value || {});
      const oldKeys = _prevList.map((item) => item.key).filter(Boolean) as string[];
      const addKeys = difference(newKeys, oldKeys);

      return _prevList
        .filter((item) => !item.key || newKeys.includes(item.key))
        .map((item) => ({
          id: item.id,
          key: item.key,
          value: item.key ? value?.[item.key!] : item.value,
        }))
        .concat(
          addKeys.map((_key) => ({
            id: genId(),
            key: _key,
            value: value?.[_key],
          }))
        );
    });
  }, [value]);

  const add = () => {
    setList((prevList) => [
      ...prevList,
      {
        id: genId(),
      },
    ]);
  };

  const updateValue = (itemId: string, value: ValueType) => {
    setList((prevList) => {
      const nextList = prevList.map((_item) => {
        if (_item.id === itemId) {
          return {
            ..._item,
            value,
          };
        }
        return _item;
      });

      onChange(
        Object.fromEntries(
          nextList.filter((item) => item.key).map((item) => [item.key!, item.value])
        )
      );

      return nextList;
    });
  };

  const updateKey = (itemId: string, key: string) => {
    setList((prevList) => {
      const nextList = prevList.map((_item) => {
        if (_item.id === itemId) {
          return {
            ..._item,
            key,
          };
        }
        return _item;
      });

      onChange(
        Object.fromEntries(
          nextList.filter((item) => item.key).map((item) => [item.key!, item.value])
        )
      );

      return nextList;
    });
  };

  const remove = (itemId: string) => {
    setList((prevList) => {
      const nextList = prevList.filter((_item) => _item.id !== itemId);

      onChange(
        Object.fromEntries(
          nextList.filter((item) => item.key).map((item) => [item.key!, item.value])
        )
      );

      return nextList;
    });
  };

  return { list, add, updateKey, updateValue, remove };
}

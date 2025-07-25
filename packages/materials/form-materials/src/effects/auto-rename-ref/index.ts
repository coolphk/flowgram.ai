/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */





import { isArray, isObject, uniq } from 'lodash';
import {
  DataEvent,
  Effect,
  EffectOptions,
  VariableFieldKeyRenameService,
} from '@flowgram.ai/editor';

import { IFlowRefValue, IFlowTemplateValue } from '../../typings';

/**
 * Auto rename ref when form item's key is renamed
 *
 * Example:
 *
 * formMeta: {
 *  effects: {
 *    "inputsValues": autoRenameRefEffect,
 *  }
 * }
 */
export const autoRenameRefEffect: EffectOptions[] = [
  {
    event: DataEvent.onValueInit,
    effect: ((params) => {
      const { context, form, name } = params;

      const renameService = context.node.getService(VariableFieldKeyRenameService);

      const disposable = renameService.onRename(({ before, after }) => {
        const beforeKeyPath = [
          ...before.parentFields.map((_field) => _field.key).reverse(),
          before.key,
        ];
        const afterKeyPath = [
          ...after.parentFields.map((_field) => _field.key).reverse(),
          after.key,
        ];

        // traverse rename refs inside form item 'name'
        traverseRef(name, form.getValueIn(name), (_drilldownName, _v) => {
          if (_v.type === 'ref') {
            // ref auto rename
            if (isKeyPathMatch(_v.content, beforeKeyPath)) {
              _v.content = [...afterKeyPath, ...(_v.content || [])?.slice(beforeKeyPath.length)];
              form.setValueIn(_drilldownName, _v);
            }
          } else if (_v.type === 'template') {
            // template auto rename
            const templateKeyPaths = getTemplateKeyPaths(_v);
            let hasMatch = false;

            templateKeyPaths.forEach((_keyPath) => {
              if (isKeyPathMatch(_keyPath, beforeKeyPath)) {
                hasMatch = true;
                const nextKeyPath = [
                  ...afterKeyPath,
                  ...(_keyPath || [])?.slice(beforeKeyPath.length),
                ];
                _v.content = _v.content?.replace(
                  `{{${_keyPath.join('.')}}`,
                  `{{${nextKeyPath.join('.')}}`
                );
              }
            });

            if (hasMatch) {
              form.setValueIn(_drilldownName, { ..._v });
            }
          }
        });
      });

      return () => {
        disposable.dispose();
      };
    }) as Effect,
  },
];

/**
 * If ref value's keyPath is the under as targetKeyPath
 * @param value
 * @param targetKeyPath
 * @returns
 */
function isKeyPathMatch(keyPath: string[] = [], targetKeyPath: string[]) {
  return targetKeyPath.every((_key, index) => _key === keyPath[index]);
}

/**
 * get template key paths
 * @param value
 * @returns
 */
function getTemplateKeyPaths(value: IFlowTemplateValue) {
  // find all keyPath wrapped in {{}}
  const keyPathReg = /{{(.*?)}}/g;
  return uniq(value.content?.match(keyPathReg) || []).map((_keyPath) =>
    _keyPath.slice(2, -2).split('.')
  );
}

/**
 * If value is ref
 * @param value
 * @returns
 */
function isRef(value: any): value is IFlowRefValue {
  return (
    value?.type === 'ref' && Array.isArray(value?.content) && typeof value?.content[0] === 'string'
  );
}

function isTemplate(value: any): value is IFlowTemplateValue {
  return value?.type === 'template' && typeof value?.content === 'string';
}

/**
 * Traverse value to find ref
 * @param value
 * @param options
 * @returns
 */
function traverseRef(
  name: string,
  value: any,
  cb: (name: string, _v: IFlowRefValue | IFlowTemplateValue) => void
) {
  if (isObject(value)) {
    if (isRef(value)) {
      cb(name, value);
      return;
    }

    if (isTemplate(value)) {
      cb(name, value);
      return;
    }

    Object.entries(value).forEach(([_key, _value]) => {
      traverseRef(`${name}.${_key}`, _value, cb);
    });
    return;
  }

  if (isArray(value)) {
    value.forEach((_value, idx) => {
      traverseRef(`${name}[${idx}]`, _value, cb);
    });
    return;
  }

  return;
}

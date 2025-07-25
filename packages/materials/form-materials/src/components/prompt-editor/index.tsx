/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */





import React, { useEffect, useRef } from 'react';

import { Renderer, EditorProvider, ActiveLinePlaceholder } from '@coze-editor/editor/react';
import preset, { EditorAPI } from '@coze-editor/editor/preset-prompt';

import { PropsType } from './types';
import { UIContainer } from './styles';
import MarkdownHighlight from './extensions/markdown';
import LanguageSupport from './extensions/language-support';
import JinjaHighlight from './extensions/jinja';

export type PromptEditorPropsType = PropsType;

export function PromptEditor(props: PropsType) {
  const {
    value,
    onChange,
    readonly,
    placeholder,
    activeLinePlaceholder,
    style,
    hasError,
    children,
    disableMarkdownHighlight,
  } = props || {};

  const editorRef = useRef<EditorAPI | null>(null);

  useEffect(() => {
    // listen to value change
    if (editorRef.current?.getValue() !== value?.content) {
      editorRef.current?.setValue(String(value?.content || ''));
    }
  }, [value]);

  return (
    <UIContainer $hasError={hasError} style={style}>
      <EditorProvider>
        <Renderer
          didMount={(editor: EditorAPI) => {
            editorRef.current = editor;
          }}
          plugins={preset}
          defaultValue={String(value?.content)}
          options={{
            readOnly: readonly,
            editable: !readonly,
            placeholder,
          }}
          onChange={(e) => {
            onChange({ type: 'template', content: e.value });
          }}
        />
        {activeLinePlaceholder && (
          <ActiveLinePlaceholder>{activeLinePlaceholder}</ActiveLinePlaceholder>
        )}
        {!disableMarkdownHighlight && <MarkdownHighlight />}
        <LanguageSupport />
        <JinjaHighlight />
        {children}
      </EditorProvider>
    </UIContainer>
  );
}

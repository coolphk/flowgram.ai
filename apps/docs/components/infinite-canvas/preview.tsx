/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable import/no-unresolved */
import { PreviewEditor } from '../preview-editor';
import { InfiniteCanvas } from './infinite-canvas.tsx';

import editorCode from '!!raw-loader!@flowgram.ai/demo-playground/src/editor.tsx';
import toolCode from '!!raw-loader!@flowgram.ai/demo-playground/src/components/playground-tools.tsx';
import cardCode from '!!raw-loader!@flowgram.ai/demo-playground/src/components/card.tsx';

export const InfiniteCanvasPreview = () => {
  const files = {
    'editor.tsx': {
      active: true,
      code: editorCode,
    },
    'playground-tools.tsx': {
      code: toolCode,
    },
    'card.tsx': {
      code: cardCode,
    },
  };
  return (
    <PreviewEditor
      files={files}
      previewStyle={{ height: 500, position: 'relative' }}
      editorStyle={{ height: 500 }}
    >
      <InfiniteCanvas className="doc-infinite-canvas-preview" />
    </PreviewEditor>
  );
};

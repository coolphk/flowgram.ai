/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from "react";
import {DisplayOutputs} from "@flowgram.ai/form-materials";

import {FormContent} from "../../../form-components";

export const NodeRender: React.FC = () => {
  return (
    <FormContent>
      <DisplayOutputs displayFromScope />
    </FormContent>
  );
};

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from "react";
import {
  Field,
  FieldRenderProps,
  useNodeRender,
} from "@flowgram.ai/free-layout-editor";
import {Button, Collapse, Upload} from "@douyinfe/semi-ui";
import {IconUpload} from "@douyinfe/semi-icons";
import {JsonSchemaEditor} from "@flowgram.ai/form-materials";

import {JsonSchema} from "../../../typings";
import {FormContent} from "../../../form-components";
import {uploadAction} from "../../../config";
import {useEnv} from "../../../providers";

export const SidebarRender: React.FC = () => {
  const {data: nodeData, form,id} = useNodeRender();
  const {isDev, isProd} = useEnv();

  // 根据当前节点的inputs动态生成上传组件
  const renderUploadComponents = () => {
    console.log("renderUploadComponents", nodeData);
    const outputs = nodeData?.outputs;
    if (!outputs || !outputs.properties) {
      return <div>No inputs defined</div>;
    }

    return Object.entries(outputs.properties).map(
      ([key, schema]: [string, any]) => {
        return (
          <div
            key={key}
            style={{
              marginBottom: 16,
            }}
          >
            <div style={{marginBottom: 8, fontWeight: 500}}>{key}</div>
            <Upload
              action={uploadAction}
              data={() => ({
                form: JSON.stringify({
                  dataSlotId: id,
                  outputName: key,
                }),
              })}
              fileName="file"
              limit={1}
              multiple={false}
              onSuccess={(res) => {
                console.log("Upload success for", key, res);
                // 这里可以更新节点数据
                if (form) {
                  form.setValueIn(`outputsValues.${key}`, res.data);
                }
              }}
            >
              <Button icon={<IconUpload/>} theme="light">
                上传文件
              </Button>
            </Upload>
          </div>
        );
      }
    );
  };

  return (
    <>
      {isDev && (
        <FormContent>
          <Field
            name="outputs"
            render={({
                       field: {value, onChange},
                     }: FieldRenderProps<JsonSchema>) => (
              <>
                <JsonSchemaEditor
                  value={value}
                  onChange={(value) => onChange(value as JsonSchema)}
                />
              </>
            )}
          />
        </FormContent>
      )}

      {isProd && (
        <Collapse defaultActiveKey={["upload"]}>
          <Collapse.Panel header="文件上传" itemKey="upload">
            {renderUploadComponents()}
          </Collapse.Panel>
        </Collapse>
      )}
    </>
  );
};

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, {useMemo} from "react";
import {Field, FieldRenderProps, useNodeRender,} from "@flowgram.ai/free-layout-editor";
import {Button, Collapse, Upload} from "@douyinfe/semi-ui";
import {IconUpload} from "@douyinfe/semi-icons";
import {IFlowValue, InputsValues, JsonSchemaEditor,} from "@flowgram.ai/form-materials";

import {JsonSchema} from "../../../typings";
import {uploadAction} from "../../../config";
import {useEnv} from "../../../providers";
import {FormContent} from "../../../form-components";

export const SidebarRender: React.FC = () => {
  const {data: nodeData, form, id} = useNodeRender();
  const {isDev, isProd} = useEnv();

  // 使用useMemo优化传给InputsValues的value值，避免不必要的重新渲染
  const inputsValues = useMemo(() => {
    return nodeData?.inputsValues || {};
  }, [nodeData?.inputsValues]);

  // 使用useMemo优化传给JsonSchemaEditor的value值，避免不必要的重新渲染
  const outputsSchema = useMemo(() => {
    return nodeData?.outputs || {type: 'object', properties: {}};
  }, [nodeData?.outputs]);

  // 根据当前节点的inputs动态生成上传组件
  const renderUploadComponents = () => {
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
      <Collapse defaultActiveKey={["1", "2", "3"]}>
        {isDev && (
          <>
            <Collapse.Panel header="输入参数" itemKey="1">
              <FormContent>
                <Field<
                    Record<string, IFlowValue | undefined> | undefined
                  > name="inputsValues">
                  {({field: {value, onChange}}) => {
                    return (
                      <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{width:100}}>输入参数</div>
                        <InputsValues
                          value={inputsValues}
                          onChange={(v) => onChange(v)}
                        />
                      </div>
                    );
                  }}
                </Field>
              </FormContent>
            </Collapse.Panel>
            <Collapse.Panel header="输出参数" itemKey="2">
              <FormContent>
                <Field
                  name="outputs"
                  render={({
                             field: {value, onChange},
                           }: FieldRenderProps<JsonSchema>) => {
                    return (
                      <JsonSchemaEditor
                        value={outputsSchema}
                        onChange={(value) => onChange(value)}
                      />
                    );
                  }}
                />
              </FormContent>
            </Collapse.Panel>
            <Collapse.Panel header="工具列表" itemKey="4">
              <div style={{padding: '12px 0'}}>
                <p>这里可以添加工具列表相关内容</p>
              </div>
            </Collapse.Panel>
          </>
        )}
        {isProd && (
          <Collapse.Panel header="文件上传" itemKey="3">
            {renderUploadComponents()}
          </Collapse.Panel>
        )}
      </Collapse>
    </>
  );
};
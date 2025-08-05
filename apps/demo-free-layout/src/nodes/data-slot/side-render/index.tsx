/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, {useMemo, useState} from "react";
import {Field, FieldRenderProps, useNodeRender,} from "@flowgram.ai/free-layout-editor";
import {Button, Checkbox, Collapse, Toast, Upload} from "@douyinfe/semi-ui";
import {IconUpload} from "@douyinfe/semi-icons";
import {IFlowValue,} from "@flowgram.ai/form-materials";

import {Input, JsonSchema, ToolResponse} from "../../../typings";
import {uploadAction} from "../../../config";
import {useEnv} from "../../../providers";
import {FormContent} from "../../../form-components";
import {RadioInputsValues} from "../../../materials/radio-inputs-values";
import {RadioJsonSchemaEditor} from "../../../materials/radio-json-schema-editor";
import {useRequest} from "alova/client";
import {getTools} from "../../../api/common";


export const SidebarRender: React.FC = () => {
  const {data: nodeData, form, id} = useNodeRender();
  const {isDev, isProd} = useEnv();
  const [inputRadioValue, setInputRadioValue] = useState<string>('');
  const [outputRadioValue, setOutputRadioValue] = useState<string>('');
  const [inputTools, setInputTools] = useState<Record<string, ToolResponse[]>>({});
  const [outputTools, setOutputTools] = useState<Record<string, ToolResponse[]>>({});
  const [selectedInputTools, setSelectedInputTools] = useState<ToolResponse[]>([]);
  const [selectedOutputTools, setSelectedOutputTools] = useState<ToolResponse[]>([]);

  const {send} = useRequest(getTools<ToolResponse[]>, {
    immediate: false
  });
  const handleInputRadioChange = (value: string) => {
    if (!value) {
      Toast.error({
        content: '请选择输入参数',
      });
      return
    }
    // console.log(123, nodeData)
    const validation = nodeData.rawData.outputs.find((item: Input) => (item.name === value)).validation;
    send(validation).then((res) => {
      setInputTools({
        [value]: res,
      });
      setSelectedInputTools([])
    })
    setInputRadioValue(value);
  }
  const handleOutputRadioChange = (value: string) => {
    if (!value) {
      Toast.error({
        content: '请选择输出参数',
      });
      return
    }
    // console.log(123, nodeData)
    const validation = nodeData.rawData.inputs.find((item: Input) => (item.name === value)).validation;
    send(validation).then((res) => {
      setOutputTools({
        [value]: res,
      });
      setSelectedOutputTools([])
    })
    setOutputRadioValue(value);
  }
  const saveInputTool = () => {
    if (!inputRadioValue) {
      Toast.error({
        content: '请选择输入参数',
      });
      return
    }
    if (selectedInputTools.length === 0) {
      Toast.error({
        content: '请选择输入工具',
      });
      return
    }
    form?.setValueIn("inputTools", {
      [inputRadioValue]: selectedInputTools
    })
    Toast.success({
      content: '保存成功',
    })
  }
  const saveOutputTool = () => {
    if (!outputRadioValue) {
      Toast.error({
        content: '请选择输出参数',
      });
      return
    }
    if (selectedOutputTools.length === 0) {
      Toast.error({
        content: '请选择输出工具',
      });
      return
    }
    form?.setValueIn("outputTools", {
      [outputRadioValue]: selectedOutputTools
    })
    Toast.success({
      content: '保存成功',
    })
  }
  // 使用useMemo优化传给InputsValues的value值，避免不必要的重新渲染
  const inputsValues = useMemo(() => {
    return nodeData?.inputsValues || {};
  }, [nodeData?.inputsValues]);

  // 使用useMemo优化传给JsonSchemaEditor的value值，避免不必要的重新渲染
  const outputsSchema = useMemo(() => {
    return nodeData?.outputs || {type: 'object', properties: {}};
  }, [nodeData?.outputs]);

  // 根据当前节点的inputs动态生成上传组件
  const renderTools = (status: 'input' | 'output') => {
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
              {nodeData?.[`${status}Tools`]?.[key]?.map((item: ToolResponse) => (
                item.name === 'Uploader' ? <Upload
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
                  </Upload> :
                  <div key={item.id} style={{
                    height: '32px',
                    width: '32px',
                    padding: '8px 12px',
                    borderRadius: 4,
                    border: '1px solid #eee',
                    backgroundColor: '#f0f8ff',
                  }}>
                    {item.name}
                  </div>
              ))}
            </div>
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
                      <RadioInputsValues value={inputsValues}
                                         inputRadioValue={inputRadioValue}
                                         onInputRadioChange={handleInputRadioChange}
                                         onChange={(v) => onChange(v)}/>
                    );
                  }}
                </Field>
                <div>
                  <h4 style={{margin: '8px 0'}}>工具</h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column' as const,
                    gap: 8,
                    maxHeight: 300,
                    overflowY: 'auto',
                    padding: '8px 0'
                  }}>
                    {inputTools[inputRadioValue]?.map((item) => (
                      <Checkbox
                        key={item.id}
                        value={item}
                        checked={selectedInputTools.some(tool => tool.id === item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedInputTools([...selectedInputTools, item]);
                          } else {
                            setSelectedInputTools(selectedInputTools.filter((tool) => tool.id !== item.id));
                          }
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 4,
                          border: '1px solid #eee',
                          backgroundColor: selectedInputTools.some(tool => tool.id === item.id) ? '#f0f8ff' : 'transparent',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{
                          fontSize: 14,
                          color: selectedInputTools.some(tool => tool.id === item.id) ? '#1890ff' : 'inherit'
                        }}>
                          {item.name}
                        </span>
                      </Checkbox>
                    ))}
                  </div>
                  <Button onClick={saveInputTool}>保存</Button>
                </div>
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
                      <RadioJsonSchemaEditor
                        value={outputsSchema}
                        onChange={(value) => onChange(value)}
                        outputRadioValue={outputRadioValue}
                        onOutputRadioChange={handleOutputRadioChange}
                      />
                    );
                  }}
                />
                <div>
                  <h4 style={{margin: '8px 0'}}>工具</h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column' as const,
                    gap: 8,
                    maxHeight: 300,
                    overflowY: 'auto',
                    padding: '8px 0'
                  }}>
                    {outputTools[outputRadioValue]?.map((item) => (
                      <Checkbox
                        key={item.id}
                        value={item}
                        checked={selectedOutputTools.some((tool) => tool.id === item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOutputTools([...selectedOutputTools, item]);
                          } else {
                            setSelectedOutputTools(selectedOutputTools.filter((tool) => tool.id !== item.id));
                          }
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 4,
                          border: '1px solid #eee',
                          backgroundColor: selectedOutputTools.some((tool) => tool.id === item.id) ? '#f0f8ff' : 'transparent',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{
                          fontSize: 14,
                          color: selectedOutputTools.some((tool) => tool.id === item.id) ? '#1890ff' : 'inherit'
                        }}>
                          {item.name}
                        </span>
                      </Checkbox>
                    ))}
                  </div>
                  {
                    <Button onClick={saveOutputTool}>保存</Button>
                  }
                </div>
              </FormContent>
            </Collapse.Panel>
            {/*<Collapse.Panel header="工具列表" itemKey="4">
              <div style={{padding: '12px 0'}}>
                <div style={{marginBottom: 16}}>
                  <h4 style={{margin: '8px 0'}}>输入工具</h4>
                  <div>
                    {<inputTools className="map"></inputTools>
                  </div>
                </div>

              </div>
              <Button
                type="primary"
                onClick={() => console.log(inputRadioValue)}
                style={{marginTop: 12}}
              >
                保存
              </Button>
            </Collapse.Panel>*/}
          </>
        )}
        {isProd && (
          <Collapse.Panel header="输入参数" itemKey="3">
            {renderTools('input')}
          </Collapse.Panel>
        )}
        {
          isProd && (
            <Collapse.Panel header="输出参数" itemKey="4">
              {renderTools('output')}
            </Collapse.Panel>
          )
        }
      </Collapse>

    </>
  );
};
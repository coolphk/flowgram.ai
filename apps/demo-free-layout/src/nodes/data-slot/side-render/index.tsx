/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, {useEffect, useMemo, useState} from "react";
import {Field, FieldRenderProps, useNodeRender,} from "@flowgram.ai/free-layout-editor";
import {Button, Checkbox, Collapse, Toast, Upload} from "@douyinfe/semi-ui";
import {IconUpload} from "@douyinfe/semi-icons";
import {IFlowValue,} from "@flowgram.ai/form-materials";

import {DataSlot, DataSlotNodeData, Input, JsonSchema, ValidationsDataSlot} from "../../../typings";
import {uploadAction} from "../../../config";
import {useEnv} from "../../../providers";
import {FormContent} from "../../../form-components";
import {RadioInputsValues} from "../../../materials/radio-inputs-values";
import {RadioJsonSchemaEditor} from "../../../materials/radio-json-schema-editor";
import {useRequest} from "alova/client";
import {getTools, runTool} from "../../../api/common";
import {IOTool, RunToolRequest} from "../../../typings";

export const SidebarRender: React.FC = () => {
  const {data, form, node} = useNodeRender();
  const {isDev, isProd, dtInstanceId, saveContent} = useEnv();
  const [inputRadioValue, setInputRadioValue] = useState<string>(form?.getValueIn("inputRadio") || '');
  const [outputRadioValue, setOutputRadioValue] = useState<string>(form?.getValueIn("outputRadio") || '');
  const [inputTools, setInputTools] = useState<Record<string, IOTool[]>>({});
  const [outputTools, setOutputTools] = useState<Record<string, IOTool[]>>({});
  const [selectedInputTools, setSelectedInputTools] = useState<IOTool[]>([]);
  const [selectedOutputTools, setSelectedOutputTools] = useState<IOTool[]>([]);
  const nodeData = data as DataSlotNodeData;

  const {send} = useRequest(getTools<IOTool[]>, {
    immediate: false
  });

  useEffect(() => {
    if (!outputRadioValue) {
      return
    }
    const value = outputRadioValue
    const validation = nodeData?.rawData?.inputs?.find((item: Input) => (item.name === value))?.validation;
    send(validation!).then((res) => {
      setOutputTools({
        [value]: res,
      });
    })
    if (form?.getValueIn("outputTools")?.[value]?.tools) {
      setSelectedOutputTools(form?.getValueIn("outputTools")?.[value]?.tools)
    }
  }, [outputRadioValue, nodeData?.rawData?.inputs])

  useEffect(() => {
    if (!inputRadioValue) {
      return
    }
    const value = inputRadioValue
    const validation = nodeData.rawData?.outputs?.find((item: Input) => (item.name === value))?.validation;
    send(validation!).then((res) => {
      setInputTools({
        [value]: res,
      });
    })
    if (form?.getValueIn("inputTools")?.[value].tools) {
      setSelectedInputTools(form?.getValueIn("inputTools")[value].tools)
    }
  }, [inputRadioValue, nodeData?.rawData?.outputs])

  const handleInputRadioChange = (value: string) => {
    if (!value) {
      Toast.error({
        content: '请选择输入参数',
      });
      return
    }
    // console.log(123, nodeData)

    setInputRadioValue(value);
    if (form?.getValueIn("inputTools")?.[value]?.tools) {
      setSelectedInputTools(form?.getValueIn("inputTools")?.[value]?.tools)
    } else {
      setSelectedInputTools([])
    }
    console.log('handleInputRadioChange', node.id, value)
    // sessionStorage.setItem(node.id,`[${value}]`)
  }
  const handleOutputRadioChange = (value: string) => {
    if (!value) {
      Toast.error({
        content: '请选择输出参数',
      });
      return
    }
    // console.log(123, nodeData)

    setOutputRadioValue(value);
    if (form?.getValueIn("outputTools")?.[value]?.tools) {
      setSelectedOutputTools(form?.getValueIn("outputTools")?.[value]?.tools)
    } else {
      setSelectedOutputTools([])
    }

    console.log('handleInputRadioChange', node.id, value)
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
      ...form.getValueIn("inputTools"),
      [inputRadioValue]: {
        tools: selectedInputTools
      }
    })
    form?.setValueIn("inputRadio", inputRadioValue)
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
      ...form.getValueIn("outputTools"),
      [outputRadioValue]: {
        tools: selectedOutputTools
      }
    })
    form?.setValueIn("outputRadio", outputRadioValue)
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
  const renderTools = (direction: 'inputs' | 'outputs') => {
    const nodeDatum = nodeData?.[direction];
    if (!nodeDatum || !nodeDatum.properties) {
      return <div>No inputs defined</div>;
    }

    return Object.entries(nodeDatum.properties).map(
      ([key, schema]: [string, any]) => {
        return (
          <div
            key={key}
            style={{
              marginBottom: 16,
            }}
          >
            <div style={{marginBottom: 8, fontWeight: 500}}>{key}</div>
            {renderToolItems(direction === 'inputs' ? 'input' : 'output', key)}
          </div>

        );
      }
    );
  };

  // 工具项的渲染逻辑
  const renderToolItems = (status: 'input' | 'output', key: string) => {
    return (
      <div key={key} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
      }}>
        {nodeData?.[`${status}Tools`]?.[key]?.tools?.map((item: IOTool) => {
            // console.log('item', nodeData, item)
            return (item.name === 'Uploader' ? <Upload
                action={uploadAction}
                data={() => {
                  const validationSlot = saveContent?.dataslots
                    .flatMap((dataSlot: DataSlot) => dataSlot.validations)
                    .find((validation: ValidationsDataSlot) => validation.name === key);
                  console.log('dataSlot saveContent', saveContent)
                  return {
                    form: JSON.stringify({
                      dataSlotId: validationSlot?.id,
                      outputName: key,
                      digitalTwinInstanceId: dtInstanceId
                    }),
                  }
                }}
                fileName="file"
                key={key}
                limit={1}
                multiple={false}
                onSuccess={(res) => {
                  // 这里可以更新节点数据
                  if (form) {
                    form.setValueIn(`${status}Slot`, {
                      ...form.getValueIn(`${status}Slot`),
                      [key]: res.data
                    });
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
                cursor: 'pointer',
              }}
                   onClick={() => {
                     console.log('tool nodeData', nodeData)
                     if (!nodeData?.[`${status}Slot`]?.[key]?.asset_id) {
                       Toast.error({
                         content: '请先上传文件',
                       });
                       return
                     }
                     if (!nodeData?.[`${status}Tools`]?.[key]?.tools?.find(tool => tool.name === item.name)?.id) {
                       Toast.error({
                         content: '请先配置工具',
                       });
                       return
                     }
                     const runToolParam: RunToolRequest = {
                       dt_instance_id: dtInstanceId,
                       tool_id: item.id,
                       input_assets: [nodeData?.[`${status}Slot`]?.[key]?.asset_id!],
                       node_id: node.id
                     }
                     console.log('runToolParam', runToolParam);
                     // const url = "https://p1.xpra.hitwin.tech";
                     // window.open(url, "_blank", "noopener,noreferrer");                // window.open("https//:pl.xpra.hitwin.tech","_blank")
                     runTool(runToolParam).then(res => {
                       console.log('runTool res', res)
                     })
                     /*runTool(runToolParam).then(res => {
                       console.log('runTool res', res)
                     })*/
                   }}
              >
                {item.name}
              </div>)
          }
        )}
      </div>
    );
  };
  return (
    <>
      <Collapse defaultActiveKey={["1", "2", "3", "4"]}>
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
                    flexDirection: 'column',
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
          </>
        )}
        {isProd && (
          <Collapse.Panel header="输入参数" itemKey="3">
            {renderTools('inputs')}
          </Collapse.Panel>
        )}
        {
          isProd && (
            <Collapse.Panel header="输出参数" itemKey="4">
              {renderTools('outputs')}
            </Collapse.Panel>
          )
        }
      </Collapse>
    </>
  );
};

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {FC} from "react";

import classNames from "classnames";
import {CodeEditor, DisplaySchemaTag} from "@flowgram.ai/form-materials";
import {Input, Switch, InputNumber, Upload, Button} from "@douyinfe/semi-ui";

import {useFormMeta} from "../hooks/use-form-meta";
import {useFields} from "../hooks/use-fields";
import {useSyncDefault} from "../hooks";
import {uploadAction} from "../../../config";

import styles from "./index.module.less";
import {IconUpload} from "@douyinfe/semi-icons";

interface TestRunFormProps {
  values: Record<string, unknown>;
  setValues: (values: Record<string, unknown>) => void;
}

export const TestRunForm: FC<TestRunFormProps> = ({values, setValues}) => {
  const formMeta = useFormMeta();

  const fields = useFields({
    formMeta,
    values,
    setValues,
  });

  useSyncDefault({
    formMeta,
    values,
    setValues,
  });

  const renderField = (field: any) => {
    switch (field.type) {
      case "boolean":
        return (
          <div className={styles.fieldInput}>
            <Switch
              checked={field.value}
              onChange={(checked) => field.onChange(checked)}
            />
          </div>
        );
      case "integer":
        return (
          <div className={styles.fieldInput}>
            <InputNumber
              precision={0}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder="Please input integer"
            />
          </div>
        );
      case "number":
        return (
          <div className={styles.fieldInput}>
            <InputNumber
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder="Please input number"
            />
          </div>
        );
      case "object":
        return (
          <div
            className={classNames(styles.fieldInput, styles.codeEditorWrapper)}
          >
            <CodeEditor
              languageId="json"
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
          </div>
        );
      case "array":
        return (
          <div
            className={classNames(styles.fieldInput, styles.codeEditorWrapper)}
          >
            <CodeEditor
              languageId="json"
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
          </div>
        );
      case "file":
        return (
          <div className={classNames(styles.fieldInput)}>
            <Upload
              action={uploadAction}
              data={() => {
                console.log('upload', field)
                return {
                  form: JSON.stringify({
                    dataSlotId: 123,
                    outputName: field.name,
                  })
                }
              }}
              fileName="file"
              limit={1}
              multiple={false}
              onSuccess={(res) => {
                // console.log("upload success", res);
                field.onChange(res.data);
              }}
            >
              <Button icon={<IconUpload/>} theme="light">
                点击上传
              </Button>
            </Upload>
          </div>
        );
      default:
        return (
          <div className={styles.fieldInput}>
            <Input
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder="Please input text"
            />
          </div>
        );
    }
  };

  // Show empty state if no fields
  if (fields.length === 0) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.emptyState}>
          <div className={styles.emptyText}>Empty</div>
          <div className={styles.emptyText}>
            没有从任何相连节点中找到输入参数
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      {fields.map((field) => (
        <div key={field.name} className={styles.fieldGroup}>
          <label htmlFor={field.name} className={styles.fieldLabel}>
            {field.name}
            {field.required && (
              <span className={styles.requiredIndicator}>*</span>
            )}
            <span className={styles.fieldTypeIndicator}>
              <DisplaySchemaTag
                value={{
                  type: field.type,
                  items: field.itemsType
                    ? {
                      type: field.itemsType,
                    }
                    : undefined,
                }}
              />
            </span>
          </label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};

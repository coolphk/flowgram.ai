/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {FC} from "react";

import {Field} from "@flowgram.ai/free-layout-editor";

import {TypeTag} from "../type-tag";
import {JsonSchema} from "../../typings";
import {useIsSidebar} from "../../hooks";
import {FormOutputsContainer, LabelContainer} from "./styles";

interface FormOutputsProps {
  name?: string;
  label?: string;
}

export const FormOutputs: FC<FormOutputsProps> = ({
                                                    name = "outputs",
                                                    label = "",
                                                  }) => {
  const isSidebar = useIsSidebar();
  if (isSidebar) {
    return null;
  }
  return (
    <Field<JsonSchema> name={name}>
      {({field}) => {
        // console.log('field', field);
        const properties = field.value?.properties;
        if (properties) {
          const content = Object.keys(properties).map((key) => {
            const property = properties[key];
            return (
              <TypeTag key={key} name={key} type={property.type as string}/>
            );
          });
          return (
            <FormOutputsContainer>
              {/*<Button onClick={() => console.log(field)}>ss</Button>*/}
              <LabelContainer>{label}</LabelContainer>
              {content}
            </FormOutputsContainer>
          );
        }
        return <></>;
      }}
    </Field>
  );
};

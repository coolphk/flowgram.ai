import {alovaInstance} from "../index";

export const runDt = <T>(dtTemplateId: string) => {
  return alovaInstance.Get<T>("/run", {
    cacheFor: 0,
    params: {
      dt_template_id:dtTemplateId
    },
  });
}

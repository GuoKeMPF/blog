import { notification } from 'antd';

import type { FormInstance } from 'antd/lib/form';

/**
 * feed back message form server side
 * if key in
 * @param form the form from antd
 * @param messages request form server
 * @param keys check keys in form
 */
export const checkRequest = (
  form: FormInstance,
  messages: any = {},
  keys: string[] = [],
) => {
  const formErrors: any = [];
  const otherErrors = [];
  const formKeys = keys.length ? keys : Object.keys(form.getFieldsValue());
  for (const key in messages) {
    if (Object.prototype.hasOwnProperty.call(messages, key)) {
      const error = messages[key];
      if (formKeys.includes(key)) {
        formErrors.push({
          name: key,
          errors: [error],
        });
      } else {
        otherErrors.push(error);
      }
    }
  }
  form.setFields(formErrors);
  if (otherErrors.length) {
    notification.error({
      message: 'Bad request',
      description: otherErrors.map((e) => <p key={e}>{e}</p>),
    });
  }
};

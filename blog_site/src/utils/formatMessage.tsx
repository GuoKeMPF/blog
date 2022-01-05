import React, { Fragment, ReactNode } from 'react';

import { useIntl } from 'umi';

interface formatMessageType {
  (
    formatMessage: {
      id: string;
      defaultMessage?: string;
    },
    param?: any,
  ): ReactNode | string;
}
export const formatMessage: formatMessageType = (
  { id, defaultMessage },
  param,
) => {
  const intl = useIntl();
  return intl.formatMessage(
    {
      id,
      defaultMessage,
    },
    param,
  );
};

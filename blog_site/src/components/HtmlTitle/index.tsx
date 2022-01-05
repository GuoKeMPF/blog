import React from 'react';
import { Helmet } from 'umi';
import { formatMessage } from '@/utils/formatMessage';

export const HtmlTitle = ({ lang = 'zh-cn', id = 'home_title' }) => (
  <Helmet encodeSpecialCharacters={false}>
    <html lang={lang} />
    <title>{formatMessage({ id })}</title>
  </Helmet>
);

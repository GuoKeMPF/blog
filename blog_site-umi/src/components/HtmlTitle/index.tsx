
import { Helmet } from 'umi';
import { formatMessage } from '@/utils/formatMessage';

export const HtmlTitle = ({
  lang = 'zh-cn',
  id = 'home_title',
  descriptions = '',
}) => (
  <Helmet encodeSpecialCharacters={false}>
    <html lang={lang} />
    <title>{formatMessage({ id })}</title>
    {descriptions && (
      <meta
        name="description"
        content={
          formatMessage({
            id: descriptions,
            defaultMessage: '那个老麻的网站',
          }) || '那个老麻的网站'
        }
      />
    )}
  </Helmet>
);

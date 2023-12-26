import { useIntl, usePrefersColor } from 'dumi';
import React, { useMemo, type FC } from 'react';

import Icon from '@ant-design/icons';
import { Select, Space, Tooltip } from 'antd';
import { IPrefersColorValue } from 'dumi/dist/client/theme-api/usePrefersColor';

const IconDark = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z" />
  </svg>
);

const IconLight = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

const IconAuto = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
    <path d="M14.595 8a6.595 6.595 0 1 1-13.19 0 6.595 6.595 0 0 1 13.19 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 2.014v11.972A5.986 5.986 0 0 0 8 2.014Z" />
  </svg>
);


const ColorSwitch: FC = () => {


  const intl = useIntl();
  const [, theme, setPrefersColor] = usePrefersColor();

  const themeConfig = useMemo(() => {
    // ['light', 'dark', 'auto']
    return [
      {
        label: intl.formatMessage({
          id: `header.color.mode.auto`,
        }),
        value: 'auto',
        icon: <span role="img">
          <Icon component={IconAuto} />
        </span>,
        desc: intl.formatMessage({
          id: `header.color.mode.auto`,
        }),
      },
      {
        label: intl.formatMessage({
          id: `header.color.mode.light`,
        }),
        value: 'light',
        icon: <span role="img">
          <Icon component={IconLight} />
        </span>,
        desc: intl.formatMessage({
          id: `header.color.mode.light`,
        }),
      },
      {
        label: intl.formatMessage({
          id: `header.color.mode.dark`,
        }),
        value: 'dark',
        icon: <span role="img">
          <Icon component={IconDark} />
        </span>,
        desc: intl.formatMessage({
          id: `header.color.mode.dark`,
        }),
      },
    ];
  }, []);

  const onChangeTheme = (theme: IPrefersColorValue) => {
    setPrefersColor(theme)
  };



  return (
    <Tooltip title={intl.formatMessage({
      id: `header.color.mode.${theme || 'auto'}`,
    })}>
      <Select
        value={theme}
        onChange={(value, item) => {
          onChangeTheme(value)
        }}
        style={{ width: 'auto' }}
        suffixIcon={null}
        bordered={false}
        popupMatchSelectWidth={false}
        options={themeConfig}
        optionLabelProp="icon"
        optionRender={(option) => (
          <Space>
            {option.data.icon}
            {option.data.desc}
          </Space>
        )}
      />
    </Tooltip>
  );
};

export default ColorSwitch;

import React, { type FC, type ReactNode } from 'react';

import { Typography } from 'antd';

const { Title } = Typography;
const HeroTitle: FC<{ children: ReactNode }> = ({ children }) => (
  <Title>{children}</Title>
);

export default HeroTitle;

//.dumi/theme/slots/Footer/index.tsx

import React from 'react';
import { Footer } from 'dumi-theme-antd-style';

export default () => {
  return <Footer bottom={"Copyright \xA9 ".concat(new Date().getFullYear().toString())} columns={[]} />;
};

import React from 'react';
import Text from './components/index';
import TextForm from './components/textForm';
import { PageContainer } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageContainer>
    <Text />
    <TextForm />
  </PageContainer>
);

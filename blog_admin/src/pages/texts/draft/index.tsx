import React from 'react';
import Draft from './components/index';
import DraftForm from './components/draftForm';
import { PageContainer } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageContainer>
    <Draft />
    <DraftForm />
  </PageContainer>
);

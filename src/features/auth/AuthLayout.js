import React from 'react';

import { Layout } from 'antd';

const { Content } = Layout;

const AuthLayout = ({ children }) => {
  return (
    <Layout>
      <Content style={{ height: '100vh' }}>{children}</Content>
    </Layout>
  );
};

export default AuthLayout;

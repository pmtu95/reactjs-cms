import React from 'react';

import { Layout, Menu, Spin } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  LogoutOutlined,
  ImportOutlined,
  DownloadOutlined,
  UserOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';

import { connect } from 'react-redux';
import authActions from '../auth/redux/actions';
import history from '../../common/history';

const { Header, Sider, Content } = Layout;

const HomeLayout = ({ children, dispatch, isLoading }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <>
      <Spin spinning={isLoading}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<ImportOutlined />} onClick={() => history.push('/')}>
                Checkin/Checkout
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />} onClick={() => history.push('/user')}>
                User
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />} onClick={() => history.push('/upload')}>
                Upload
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<DownloadOutlined />}
                onClick={() => history.push('/download')}
              >
                Download
              </Menu.Item>
              <Menu.Item
                key="5"
                icon={<AreaChartOutlined />}
                onClick={() => history.push('/report-overview')}
              >
                Report Overview
              </Menu.Item>
              <Menu.Item key="6" icon={<LogoutOutlined />} onClick={logout}>
                Logout
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: 24,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Spin>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.home && state.home.isLoading ? state.home.isLoading : false,
  };
};

export default connect(mapStateToProps)(HomeLayout);

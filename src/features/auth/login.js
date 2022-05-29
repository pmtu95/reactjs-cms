import React from 'react';

import { Row, Col, Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import authActions from './redux/actions';

const Login = ({ dispatch }) => {
  const onFinish = values => {
    dispatch(authActions.login(values));
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100%' }}>
      <Col span={6}>
        <Card title="WEB PORTAL" style={{ width: '100%' }} headStyle={{ textAlign: 'center' }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="/auth/forgotpassword">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="/auth/register">register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default connect()(Login);

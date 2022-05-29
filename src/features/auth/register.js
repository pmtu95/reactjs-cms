import React from 'react';

import { Layout, Row, Col, Card, Form, Input, Button } from 'antd';

import { connect } from 'react-redux';
import authActions from './redux/actions';

const { Content } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Register = ({ dispatch }) => {
  const onFinish = values => {
    dispatch(authActions.register(values));
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Content style={{ height: '100vh' }}>
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col span={6}>
            <Card title="WEB PORTAL" style={{ width: '100%' }} headStyle={{ textAlign: 'center' }}>
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Full name"
                  name="name"
                  rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your user name!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Importing Id"
                  name="importing_id"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Create new user
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default connect()(Register);

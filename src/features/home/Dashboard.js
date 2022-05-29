import React from 'react';
import _ from 'lodash';

import { Row, Col, Card, Table, Button, Modal, Form, Input, Space } from 'antd';

import { connect } from 'react-redux';
import { homeActions } from './redux/actions';
import authActions from '../auth/redux/actions';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Dashboard = ({ dispatch, home }) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState(false);
  const [titleForm, setTitleForm] = React.useState('Add User');
  const [userId, setUserId] = React.useState();
  const [formFields, setFormFields] = React.useState([
    { name: ['name'], value: '' },
    { name: ['username'], value: '' },
    { name: ['password'], value: '' },
    { name: ['importing_id'], value: '' },
  ]);

  React.useEffect(() => {
    dispatch(homeActions.getListUsers());
  }, [dispatch]);

  const showModal = (data) => {
    setVisible(true);
    form.resetFields();
    if (data) {
      setUserId(data.id);
      const newFields = [
        { name: ['name'], value: data.name },
        { name: ['username'], value: data.username },
        { name: ['password'], value: '' },
        { name: ['importing_id'], value: data.importing_id },
      ];
      setFormFields(newFields);
      setTitleForm('Edit User');
    } else {
      setUserId();
      setTitleForm('Add User');
    }
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const onAddUser = (values) => {
    dispatch(authActions.register(values)).then((res) => {
      handleCancel();
      dispatch(homeActions.getListUsers());
    });
  };

  const onEditUser = (values) => {
    const newValues = _.pickBy(values, (v) => v !== '');
    dispatch(homeActions.editUser(userId, newValues)).then((res) => {
      handleCancel();
      dispatch(homeActions.getListUsers());
    });
  };

  const lockUser = (userId) => {
    dispatch(homeActions.lockUser(userId)).then((res) => {
      dispatch(homeActions.getListUsers());
    });
  };

  const unlockUser = (userId) => {
    dispatch(homeActions.unlockUser(userId)).then((res) => {
      dispatch(homeActions.getListUsers());
    });
  };

  const filters = (arr, sortBy) => {
    return _.sortBy(_.uniqBy(arr, 'text'), ['text']);
  };

  return (
    <Row>
      <Col span={24}>
        <Card
          title="User list"
          bordered={false}
          style={{ width: '100%' }}
          extra={
            <Button type="primary" onClick={() => showModal()}>
              Add User
            </Button>
          }
        >
          <Table
            columns={[
              {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                filters:
                  home.users &&
                  home.users.length > 0 &&
                  filters(
                    home.users.map((value) => {
                      return {
                        text: value.username,
                        value: value.username,
                      };
                    }),
                  ),
                onFilter: (value, record) => {
                  return record.username === value;
                },
              },
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                filters:
                  home.users &&
                  home.users.length > 0 &&
                  filters(
                    home.users.map((value) => {
                      return {
                        text: value.name,
                        value: value.name,
                      };
                    }),
                  ),
                onFilter: (value, record) => {
                  return record.name === value;
                },
              },
              {
                title: 'Importing ID',
                dataIndex: 'importing_id',
                key: 'importing_id',
                filters:
                  home.users &&
                  home.users.length > 0 &&
                  filters(
                    home.users.map((value) => {
                      return {
                        text: value.importing_id,
                        value: value.importing_id,
                      };
                    }),
                  ),
                onFilter: (value, record) => {
                  return record.importing_id === value;
                },
              },
              {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <Space size="middle">
                    {record.locked ? (
                      <Button type="link" onClick={() => unlockUser(record.id)}>
                        Unlock
                      </Button>
                    ) : (
                      <Button type="link" onClick={() => lockUser(record.id)}>
                        Lock
                      </Button>
                    )}

                    <Button type="link" onClick={() => showModal(record)}>
                      Edit
                    </Button>
                  </Space>
                ),
              },
            ]}
            dataSource={home.users || []}
            rowKey="id"
          />
          <Modal
            title={titleForm}
            visible={visible}
            okText="Submit"
            cancelText="Cancel"
            onCancel={handleCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  if (titleForm === 'Add User') {
                    form.resetFields();
                    onAddUser(values);
                  } else {
                    onEditUser(values);
                  }
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            <Form
              {...layout}
              form={form}
              initialValues={{ modifier: 'public' }}
              fields={formFields}
            >
              <Form.Item
                label="Name"
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
                rules={
                  titleForm === 'Add User' && [
                    { required: true, message: 'Please input your password!' },
                  ]
                }
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
            </Form>
          </Modal>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    home: state.home,
  };
};
export default connect(mapStateToProps)(Dashboard);

import React from 'react';

import { Row, Col, Card, Form, Select, Button, DatePicker, Input } from 'antd';

import { connect } from 'react-redux';
import { downloadActions } from './redux/actions';

const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const DownloadLayout = ({ dispatch, user }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = {
      type: values.option,
      user_id: user.user_id,
      date_from: values.date ? values.date[0] : '',
      date_to: values.date ? values.date[1] : '',
      yearweek: values.yearweek ? values.yearweek : '',
    };
    dispatch(downloadActions.exportData(formData));
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Row>
      <Col span={24}>
        <Card title="Download" bordered={false} style={{ width: '100%' }}>
          <Form {...layout} form={form} name="control-ref" onFinish={onFinish}>
            <Form.Item
              name="option"
              label="Option"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select an option you want to download" allowClear>
                <Option value="osa">osa</Option>
                <Option value="sos">sos</Option>
                <Option value="weekend">weekend</Option>
                <Option value="prool">prool</Option>
                <Option value="rental">rental</Option>
                <Option value="npd">npd</Option>
                <Option value="tracking">tracking</Option>
                <Option value="procms">procms</Option>
                <Option value="c2a">c2a</Option>
              </Select>
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ type: 'array', required: false }]}>
              <RangePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              name="yearweek"
              label="Yearweek"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input placeholder="yearweek" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth && state.auth.user ? state.auth.user : null,
  };
};
export default connect(mapStateToProps)(DownloadLayout);

import React from 'react';

import { Row, Col, Card, Form, Select, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { importActions, downloadActions } from './redux/actions';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const UploadLayout = ({ dispatch }) => {
  const [form] = Form.useForm();
  const [directory, setDirectory] = React.useState(false);
  const [acceptType, setAcceptType] = React.useState('.xls,.xlsx');
  const [files, setFiles] = React.useState([]);

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onChangeOption = (value) => {
    switch (value) {
      case 'photos': {
        setDirectory(true);
        setAcceptType('.jpg,.jpeg,.png');
        break;
      }
      case 'full': {
        setDirectory(false);
        setAcceptType('.xls,.xlsx');
        break;
      }
      default:
        setDirectory(false);
        setAcceptType('.xls,.xlsx');
        break;
    }
  };

  const onFinish = (values) => {
    const formData = new FormData();
    values.files.forEach((file, i) => {
      formData.append('files[]', file.originFileObj);
    });

    dispatch(importActions.importData(values.option, formData));
    form.resetFields();
  };

  return (
    <Row>
      <Col span={24}>
        <Card title="Upload" bordered={false} style={{ width: '100%' }}>
          <Form
            {...layout}
            name="upload-form"
            initialValues={{ option: 'full' }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="option"
              label="Option"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a option you want to upload data"
                allowClear
                onChange={onChangeOption}
              >
                <Option value="full">Full</Option>
                {/* <Option value="checklists">Checklists</Option>
                <Option value="checklist_items">Checklist Items</Option> */}
                <Option value="photos">Photos</Option>
                {/* <Option value="stocks">Stocks</Option>
                <Option value="shops">Shops</Option>
                <Option value="users">Users</Option> */}
              </Select>
            </Form.Item>
            <Form.Item
              name="files"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Upload
                name="logo"
                listType="picture"
                className="upload-list-inline"
                beforeUpload={(file) => {
                  setFiles([...files, file]);
                  return false;
                }}
                directory={directory}
                accept={acceptType}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                Submit
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
    home: state.home,
  };
};
export default connect(mapStateToProps)(UploadLayout);

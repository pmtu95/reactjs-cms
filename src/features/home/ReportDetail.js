import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Input,
  Space,
  DatePicker,
  Typography,
  Select,
  Menu,
  // Tag,
  Image,
} from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
// import { getReportDetail, exportReportDetail } from './redux/actions';
// import { random as fakerRandom } from 'faker';

const { RangePicker } = DatePicker;
const { Paragraph } = Typography;
const { Option } = Select;
const url = process.env.REACT_APP_API_URL;

const labelCol = {
  span: 24,
};

const filterData = (datas, value, fields) => {
  let filteredData = [];
  fields.forEach((field) => {
    if (filteredData.length === 0) {
      filteredData = datas.filter((data) => {
        if (data.children) {
          data.children = filterData(data.children, value, field);
        }
        return data[field.key]
          ? data[field.key].toString().toLowerCase().includes(value.toLowerCase())
          : '';
      });
    }
  });

  return filteredData;
};

const ReportDetail = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const reportDetailState = useSelector((state) => state.home.reportDetail);
  const loading = useSelector((state) => state.home.loading);

  // useEffect(() => {
  //   dispatch(getReportDetail());
  // }, [dispatch]);

  const tblConfigs = useMemo(() => {
    if (reportDetailState) {
      const firstItem = reportDetailState[0];
      const data = reportDetailState.filter((_, index) => index !== 0);
      const tblData = data.map((item) => {
        let obj = {
          // id: fakerRandom.uuid(),
        };
        item.forEach((val, idx) => {
          obj[firstItem[idx]] = val;
        });

        return obj;
      });

      const columns = firstItem.map((item) => {
        const unique = [...new Set(tblData.map((data) => data[item]))];
        const filters = unique.filter((value) => {
          return value !== null && value !== '';
        });
        return {
          title: item,
          dataIndex: item,
          key: item,
          filters:
            item !== 'Hình ảnh' &&
            filters.length > 0 &&
            filters.map((value) => {
              return {
                text: value,
                value: value,
              };
            }),
          onFilter: (value, record) => record[item].indexOf(value) === 0,
          render: (value) => {
            if (item === 'Hình ảnh') {
              if (value) {
                return <Image src={`${url}${value}`} height={90} width={60} preview={true} />;
              }
            }
            return value;
          },
        };
      });

      return {
        columns,
        data: tblData,
      };
    }
    return [];
  }, [reportDetailState]);

  const onChangeSearch = (values) => {
    let date_from;
    let date_to;

    if (values && values.startenddate) {
      date_from = moment.utc(values.startenddate[0]).format('DD/MM/YYYY');
      date_to = moment.utc(values.startenddate[1]).format('DD/MM/YYYY');
    }

    // dispatch(getReportDetail(date_from, date_to));
  };

  const exportExcel = () => {
    const { startenddate } = form.getFieldsValue();
    let date_from;
    let date_to;
    if (startenddate) {
      date_from = moment.utc(startenddate[0]).format('DD/MM/YYYY');
      date_to = moment.utc(startenddate[1]).format('DD/MM/YYYY');
    }
    // dispatch(exportReportDetail(date_from, date_to));
  };

  return (
    <Row>
      <Col span={24}>
        <Card title="Báo cáo chi tiết" bordered={false} style={{ width: '100%' }}>
          <Row>
            <Col span={24}>
              <Form
                form={form}
                initialValues={{}}
                onValuesChange={() => {}}
                onFinish={onChangeSearch}
              >
                <Row gutter={24}>
                  <Paragraph
                    strong
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    Filters
                  </Paragraph>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="startenddate"
                      label="Ngày bắt đầu/kết thúc"
                      labelCol={labelCol}
                    >
                      <RangePicker
                        style={{ width: '100%' }}
                        disabled={loading}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                  </Col>
                  {/* <Col span={4}>
                    <Form.Item name="bank" label="Ngành hàng" labelCol={labelCol}>
                      <Select
                        showSearch
                        placeholder="Chọn ngành hàng"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={loading}
                      >
                        <Option value="sunsilk">Sunsilk</Option>
                        <Option value="ps">P/S</Option>
                        <Option value="cif">Cif</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="label" label="Nhãn hàng" labelCol={labelCol}>
                      <Select
                        showSearch
                        placeholder="Chọn nhãn hàng"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={loading}
                      >
                        <Option value="sunsilk">Sunsilk</Option>
                        <Option value="ps">P/S</Option>
                        <Option value="cif">Cif</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="sku" label="SKU" labelCol={labelCol}>
                      <Select
                        showSearch
                        placeholder="Chọn SKU"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={loading}
                      >
                        <Option value="sunsilk">Sunsilk</Option>
                        <Option value="ps">P/S</Option>
                        <Option value="cif">Cif</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="warning" label="Mức cảnh báo" labelCol={labelCol}>
                      <Select
                        showSearch
                        placeholder="Chọn mức cảnh báo"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={loading}
                      >
                        <Option value="sunsilk">Sunsilk</Option>
                        <Option value="ps">P/S</Option>
                        <Option value="cif">Cif</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="error" label="Lỗi" labelCol={labelCol}>
                      <Select
                        showSearch
                        placeholder="Chọn lỗi"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={loading}
                      >
                        <Option value="sunsilk">Sunsilk</Option>
                        <Option value="ps">P/S</Option>
                        <Option value="cif">Cif</Option>
                      </Select>
                    </Form.Item>
                  </Col> */}
                </Row>
                {/* <Row gutter={24}>
                  <Col span={4}>
                    <Form.Item name="staffname" label="Tên/Mã nhân viên" labelCol={labelCol}>
                      <Input placeholder="" disabled={loading} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="shopname" label="Tên/Mã cửa hàng" labelCol={labelCol}>
                      <Input placeholder="" disabled={loading} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="shoptype" label="Loại cửa hàng" labelCol={labelCol}>
                      <Select
                        showSearch
                        placeholder="Chọn loại"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={loading}
                      >
                        <Option value="sunsilk">Sunsilk</Option>
                        <Option value="ps">P/S</Option>
                        <Option value="cif">Cif</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="address" label="Địa điểm" labelCol={labelCol}>
                      <Select
                        showSearch
                        placeholder="Chọn địa điểm"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={loading}
                      >
                        <Option value="sunsilk">Sunsilk</Option>
                        <Option value="ps">P/S</Option>
                        <Option value="cif">Cif</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row> */}

                <Row justify="end">
                  <Col>
                    <Form.Item>
                      <Space size="middle">
                        <Button icon={<SearchOutlined />} disabled={loading} htmlType="submit">
                          Tìm kiếm
                        </Button>
                        <Button
                          icon={<DownloadOutlined />}
                          type="primary"
                          disabled={loading}
                          onClick={exportExcel}
                        >
                          Export to Excel
                        </Button>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Table
                className="data-table"
                columns={tblConfigs.columns}
                dataSource={tblConfigs.data}
                rowKey="id"
                loading={loading}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ReportDetail;

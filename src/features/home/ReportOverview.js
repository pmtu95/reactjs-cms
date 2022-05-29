import React, { useEffect, useMemo } from 'react';
import moment from 'moment';
import { Row, Col, Card, Table, Button, Form, Space, DatePicker, Typography, Select } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
// import { getReportOverview, exportReportOverview } from './redux/actions';
// import { random as fakerRandom } from 'faker';

const { RangePicker } = DatePicker;
const { Paragraph } = Typography;
const { Option } = Select;

const labelCol = {
  span: 24,
};

const ReportOverview = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const reportOverviewState = useSelector((state) => state.home.reportOverview);
  const loading = useSelector((state) => state.home.loading);

  // useEffect(() => {
  //   dispatch(getReportOverview());
  // }, [dispatch]);

  const tblConfigs = useMemo(() => {
    if (reportOverviewState) {
      const firstItem = reportOverviewState[0];
      const data = reportOverviewState.filter((_, index) => index !== 0);
      const tblData = data.map((item) => {
        let obj = {
          // id: fakerRandom.uuid(),
        };
        item.forEach((val, idx) => {
          obj[firstItem[idx]] = String(val);
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
            filters.length > 0 &&
            filters.map((value) => {
              return {
                text: value,
                value: value,
              };
            }),
          onFilter: (value, record) => record[item].indexOf(value) === 0,
        };
      });
      return {
        columns,
        data: tblData,
      };
    }
    return [];
  }, [reportOverviewState]);

  const onChangeSearch = (values) => {
    let date_from;
    let date_to;

    if (values && values.startenddate) {
      date_from = moment.utc(values.startenddate[0]).format('DD/MM/YYYY');
      date_to = moment.utc(values.startenddate[1]).format('DD/MM/YYYY');
    }

    // dispatch(getReportOverview(date_from, date_to));
  };

  const exportExcel = () => {
    const { startenddate } = form.getFieldsValue();
    let date_from;
    let date_to;
    if (startenddate) {
      date_from = moment.utc(startenddate[0]).format('DD/MM/YYYY');
      date_to = moment.utc(startenddate[1]).format('DD/MM/YYYY');
    }
    // dispatch(exportReportOverview(date_from, date_to));
  };

  return (
    <Row>
      <Col span={24}>
        <Card title="Báo cáo tóm tắt" bordered={false} style={{ width: '100%' }}>
          <Row>
            <Col span={24}>
              <Form form={form} onFinish={onChangeSearch}>
                <Row gutter={24}>
                  <Col span={24}>
                    <Paragraph
                      strong
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      Filters
                    </Paragraph>
                  </Col>
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
                    <Form.Item label="Mã nhân viên" labelCol={labelCol}>
                      <Select
                        showSearch
                        placeholder="Chọn mã nhân viên"
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
                    <Form.Item label="Mã cửa hàng" labelCol={labelCol}>
                      <Select
                        showSearch
                        placeholder="Chọn mã cửa hàng"
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

              {reportOverviewState ? (
                <Table
                  className="data-table"
                  columns={tblConfigs.columns}
                  dataSource={tblConfigs.data}
                  rowKey="id"
                  loading={loading}
                />
              ) : null}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ReportOverview;

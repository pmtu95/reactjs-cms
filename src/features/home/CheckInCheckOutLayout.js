import React, { useState } from 'react';
import moment from 'moment-timezone';
import _ from 'lodash';

import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Image,
  Space,
  Form,
  Button,
  DatePicker,
  Tabs,
  Switch,
  List as AntList,
  Input,
} from 'antd';
import { Carousel } from 'react-responsive-carousel';
import List from '../../components/List';

import { connect } from 'react-redux';
import { homeActions } from './redux/actions';
import NoImage from '../../images/no-image.png';
const url = process.env.REACT_APP_API_URL;

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Meta } = Card;
const { TextArea } = Input;

const CheckInCheckOutLayout = ({ dispatch, home }) => {
  const { listCheckInCheckOut, checkList, isLoading } = home;
  const [form] = Form.useForm();

  const [date, setDate] = useState([]);
  const [data, setData] = useState([]);

  React.useEffect(() => {
    dispatch(homeActions.getCheckInCheckOut(date));
  }, [dispatch, date]);

  React.useEffect(() => {
    if (isLoading) {
      setData([]);
    } else {
      setData(checkList?.checklist_items);
    }
  }, [isLoading, checkList]);

  const filters = (arr) => {
    return _.sortBy(_.uniqBy(arr, 'text'), ['text']);
  };

  const onFinish = (values) => {
    const { date } = values;
    const newDate = [];
    if (date && date.length > 0) {
      newDate.push(moment.utc(date[0]).tz(moment.tz.guess(true)).format('DD-MM-YYYY'));
    }
    if (date && date.length > 1) {
      newDate.push(moment.utc(date[1]).tz(moment.tz.guess(true)).format('DD-MM-YYYY'));
    }

    setDate(newDate);
  };

  const onChangeTab = (key) => {
    if (Number(key) !== checkList?.id) {
      dispatch(homeActions.getCheckListById(key));
    }
  };

  const onChangePass = (id, checked) => {
    const newData = data.map((d) => {
      if (d.id === id) {
        d = {
          ...d,
          data: {
            ...d.data,
            pass: checked,
          },
        };
      }

      return d;
    });
    setData(newData);
  };

  const onChangeQcNode = (id, e) => {
    const newData = data.map((d) => {
      if (d.id === id) {
        d = {
          ...d,
          data: {
            ...d.data,
            qc_note: e.target.value,
          },
        };
      }

      return d;
    });
    setData(newData);
  };

  const submit = (item) => {
    dispatch(
      homeActions.submitChecklistItem(item.id, {
        pass: item.data.pass,
        qc_note: item.data.qc_note,
      }),
    );
  };

  return (
    <Row>
      <Col span={24}>
        <Card
          title="Check In / Check Out"
          bordered={false}
          style={{ width: '100%' }}
          extra={
            <Form form={form} name="filter" layout="inline" onFinish={onFinish}>
              <Form.Item title="Date" name="date" rules={[{ type: 'array', required: false }]}>
                <RangePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
              </Form.Item>
              <Form.Item shouldUpdate={true}>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          }
        >
          <Row>
            <Col span={24}>
              <Table
                columns={[
                  {
                    title: 'User',
                    dataIndex: 'user',
                    key: 'user',
                    render: (u) => {
                      return <Text>{u.name}</Text>;
                    },
                    filters:
                      listCheckInCheckOut &&
                      listCheckInCheckOut.length > 0 &&
                      filters(
                        listCheckInCheckOut.map((value) => {
                          return {
                            text: value.user.name,
                            value: value.user.name,
                          };
                        }),
                      ),
                    onFilter: (value, record) => {
                      return record.user.name === value;
                    },
                  },
                  {
                    title: 'Shop',
                    dataIndex: 'shop',
                    key: 'shop',
                    render: (v, record) => {
                      const shopName = record.shop !== null ? record.shop.name : '';
                      return (
                        <Space direction="vertical">
                          <Text>{shopName}</Text>
                        </Space>
                      );
                    },
                    filters:
                      listCheckInCheckOut &&
                      listCheckInCheckOut.length > 0 &&
                      filters(
                        listCheckInCheckOut.map((value) => {
                          return {
                            text: value.shop.name,
                            value: value.shop.name,
                          };
                        }),
                      ),
                    onFilter: (value, record) => {
                      return record.shop.name === value;
                    },
                  },
                  {
                    title: 'Note',
                    dataIndex: 'note',
                    key: 'note',
                    render: (v, record) => {
                      const noteCheckIn = record.note !== 'undefined' ? record.note : '';
                      const noteCheckOut =
                        record.user_checkout != null && record.user_checkout.note !== 'undefined'
                          ? record.user_checkout.note
                          : '';
                      return (
                        <Space direction="vertical">
                          <Text>{noteCheckIn}</Text>
                          <Text>{noteCheckOut}</Text>
                        </Space>
                      );
                    },
                  },
                  {
                    title: 'Time',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    render: (v, record) => {
                      const timeCheckin = moment
                        .utc(v)
                        .tz(moment.tz.guess(true))
                        .format('DD-MM-YYYY HH:mm:ss');
                      const timeCheckout =
                        record.user_checkout !== null && record.user_checkout.created_at !== null
                          ? moment
                              .utc(record.user_checkout.created_at)
                              .tz(moment.tz.guess(true))
                              .format('DD-MM-YYYY HH:mm:ss')
                          : '';
                      return (
                        <Space direction="vertical">
                          <Text>{`Checkin: ${timeCheckin}`}</Text>
                          <Text>{`Checkout: ${timeCheckout}`}</Text>
                        </Space>
                      );
                    },
                    filters:
                      listCheckInCheckOut &&
                      listCheckInCheckOut.length > 0 &&
                      filters(
                        listCheckInCheckOut.map((value) => {
                          return {
                            text: moment
                              .utc(value.created_at)
                              .tz(moment.tz.guess(true))
                              .format('DD-MM-YYYY'),
                            value: moment
                              .utc(value.created_at)
                              .tz(moment.tz.guess(true))
                              .format('DD-MM-YYYY'),
                          };
                        }),
                      ),
                    onFilter: (value, record) => {
                      const checkin = moment
                        .utc(record.created_at)
                        .tz(moment.tz.guess(true))
                        .format('DD-MM-YYYY');
                      return checkin === value;
                    },
                  },
                  {
                    title: 'Photos',
                    dataIndex: 'photos',
                    key: 'photos',
                    render: (photo, record) => {
                      return (
                        <Space>
                          {photo.length > 0 && (
                            <Image
                              src={`${url}${photo[0].image}`}
                              height={90}
                              width={60}
                              preview={true}
                            />
                          )}

                          {record.user_checkout.photos &&
                            record.user_checkout.photos.length > 0 && (
                              <Image
                                src={`${url}${record.user_checkout.photos[0].image}`}
                                height={90}
                                width={60}
                                preview={true}
                              />
                            )}
                        </Space>
                      );
                    },
                  },
                ]}
                expandable={{
                  expandedRowRender: (record) => {
                    return (
                      <Tabs defaultActiveKey={record.checklists[0].id} onChange={onChangeTab}>
                        {record.checklists.map((checklist) => (
                          <TabPane tab={checklist.checklist_type} key={checklist.id}>
                            <AntList
                              grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 4,
                                lg: 4,
                                xl: 5,
                                xxl: 5,
                              }}
                              dataSource={data || []}
                              renderItem={(item, index) => {
                                return (
                                  <List.Item key={item.id}>
                                    <Card
                                      className="card"
                                      hoverable
                                      cover={
                                        item.photos.length > 0 ? (
                                          <Carousel
                                            showStatus={false}
                                            showArrows={false}
                                            renderThumbs={() => {
                                              return item.photos.map((image) => (
                                                <img key={image.id} src={image.uri} alt="" />
                                              ));
                                            }}
                                            thumbWidth={40}
                                            onClickThumb={(i, item) => {
                                              console.log(item);
                                            }}
                                          >
                                            {item.photos.map((image) => (
                                              <div key={image.id}>
                                                <Image src={image.uri} width="100%" height={200} />
                                              </div>
                                            ))}
                                          </Carousel>
                                        ) : (
                                          <Image src={NoImage} width="100%" height={200} />
                                        )
                                      }
                                      actions={[
                                        <Button type="primary" onClick={() => submit(item)}>
                                          Submit
                                        </Button>,
                                      ]}
                                    >
                                      <Meta
                                        className="card-meta"
                                        title={item.custom_attributes.stock_name}
                                        description={
                                          <>
                                            {Object.entries(item.data).map(([key, value]) => {
                                              if (key === 'pass' || key === 'qc_note') {
                                                return null;
                                              }

                                              return (
                                                <Row style={{ justifyContent: 'space-between' }}>
                                                  <Text>{`${key} : `}</Text>
                                                  <Text>{`${value}`}</Text>
                                                </Row>
                                              );
                                            })}
                                            <Row style={{ justifyContent: 'space-between' }}>
                                              <Text>Passed:</Text>
                                              <Switch
                                                checked={item.data.pass}
                                                onChange={(checked) =>
                                                  onChangePass(item.id, checked)
                                                }
                                              />
                                            </Row>
                                            <Row>
                                              <div style={{ paddingTop: 8 }}>
                                                <TextArea
                                                  rows={4}
                                                  value={item.data.qc_note}
                                                  onChange={(e) => onChangeQcNode(item.id, e)}
                                                />
                                              </div>
                                            </Row>
                                          </>
                                        }
                                      />
                                    </Card>
                                  </List.Item>
                                );
                              }}
                            />
                          </TabPane>
                        ))}
                      </Tabs>
                    );
                  },
                  onExpand: (expanded, record) => {
                    if (expanded) {
                      dispatch(homeActions.getCheckListById(record.checklists[0].id));
                    }
                  },
                  rowExpandable: (record) => record.checklists && record.checklists.length > 0,
                }}
                dataSource={listCheckInCheckOut || []}
                rowKey={(record) => record.id}
              />
            </Col>
          </Row>
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
export default connect(mapStateToProps)(CheckInCheckOutLayout);

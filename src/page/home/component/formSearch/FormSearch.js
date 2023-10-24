import { React , useEffect, useState } from 'react';
import { Card, Form, Input, Row, Col, Select, Button, InputNumber } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getAllDataAsync } from './Slice'
import { getUsersAsync } from '../datatable/Slice';
import * as constants from '../datatable/Constants';

const { Option } = Select;

function useFormSearch() {
  const { ownerArray, categoryArray, initializing, initOwner, initCategory, loading } = useAppSelector((rootState) => {
    let ownerArray = rootState.homePage.formSearch.ownerArray;
    let categoryArray = rootState.homePage.formSearch.categoryArray;
    let initializing = rootState.homePage.formSearch.initializing;
    let loading = rootState.homePage.table.loading;
    let initOwner = ownerArray.length === 0 ? null : ownerArray[0].id;
    let initCategory = categoryArray.length === 0 ? null : categoryArray[0].id;
    return { ownerArray, categoryArray, initializing, initOwner, initCategory, loading };
  });
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useState({});

  let initialValues = {
    owner: initOwner, 
    category: initCategory, 
    description: null, 
    qty: null, 
    name: null
  };

  // init
  useEffect(() => {
    dispatch(getAllDataAsync());
  }, [dispatch]);

  const [form] = Form.useForm();

  function doPaging({currentPage}) {
    searchParams.currentPage = currentPage;
    setSearchParams(searchParams);
    dispatch(getUsersAsync(searchParams));
  }

  const handleSearch = values => {
    console.log(values)
    values.pageSize = constants.PAGE_SIZE;
    values.currentPage = 0;
    setSearchParams(values);
    dispatch(getUsersAsync(values));
  };

  // const requiredFieldRule = [{ required: true, message: 'Required Field' }];

  const FormSearch = () => (
    initializing ? <div>Loading...</div> :

    <Card bodyStyle={{ padding: "24px 24px 0px 24px"}}>
      <Form form={form} name="product-form" onFinish={handleSearch}
        initialValues={initialValues} >
        <Row gutter={15}>
          <Col span={8}>
            <Form.Item label="Name" name="name" colon={false}>
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Description" name="description" colon={false}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Owner" name="owner" colon={false}>
              <Select>
                {ownerArray.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={8}>
            <Form.Item label="Category" name="category" colon={false}>
              <Select>
                {categoryArray.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* <Form.Item style={{ marginBottom: '24px' }}> */}
            <Form.Item label="Quantity" name="qty" colon={false}>
              <InputNumber min={1} max={100} precision={0}/>
            </Form.Item>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />} disabled={loading}>Search</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )

  return {
    FormSearch,
    doPaging,
  };
}

export default useFormSearch;
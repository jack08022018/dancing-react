import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import 'antd/dist/reset.css';
import './Style.css';
import { Row, Card, Col, Form, Input, Select, Button } from 'antd';
import { UserOutlined, MobileOutlined } from '@ant-design/icons';
import { getStudentDataAsync, classChange } from './Slice';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export default function StudentInfoPage() {
  const { classList, selectedClass, initializing } = useAppSelector((rootState) => {
    let classList = rootState.studentInfo.classList;
    let idClass = rootState.studentInfo.idClass;
    let selectedClass = rootState.studentInfo.classList.filter(s => s.idClass === idClass);
    selectedClass = selectedClass.length > 0 ? selectedClass[0] : null;
    // let selectedClass = rootState.studentInfo.selectedClass;
    let initializing = rootState.studentInfo.initializing;
    return { classList, selectedClass, initializing };
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let initialValues = {
    studentName: selectedClass.name, 
    mobile: selectedClass.mobile,
    class: selectedClass.idClass
  };

  // INIT
  useEffect(() => {
    dispatch(getStudentDataAsync({
      mobile: localStorage.getItem('username'),
      name: 'jack'
    }));
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleClassChange = (value) => {
    console.log(`Selected class ID: ${value}`);
    dispatch(classChange(value));
  };

  return (
    initializing ? <div>Loading...</div> :

    <Row type="flex" justify="center" align="top" 
      className='center-content'
      style={{minHeight: '100vh', background: '#d6d6d6', width: '350px', padding: '2px', textAlign: 'center'}} >
      <Card>
        <Form name="normal_" className="-form"
          initialValues={initialValues}
        >
          <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" className="-form-button" onClick={handleLogout}>Logout</Button>
          </Form.Item>
          <Form.Item label="Họ tên" name="studentName" colon={false} >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} readOnly={true} />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="mobile" colon={false} >
            <Input prefix={<MobileOutlined className="site-form-item-icon" />} readOnly={true} />
          </Form.Item>
          <Form.Item label="Lớp" name="class" colon={false}>
              <Select onChange={handleClassChange} value={selectedClass.idClass}>
                {classList.map((item, index) => (
                  <Option key={index} value={item.idClass}>
                    {item.songTitle}
                  </Option>
                ))}
              </Select>
            </Form.Item>
        </Form>
        <Card type="inner" title='SỐ BUỔI ĐÃ TẬP' key={1} headStyle={{background: 'lightblue'}} >
          <Row gutter={[16, 16]}>
            {selectedClass.data.map((item, index) => (
              <Col span={12} key={index}>
                <Card key={index} bodyStyle={{ textAlign: 'center', color: item.status === 'PRESENT' ? 'red' : 'initial' }}>
                  <div key={index}>{item.learningDate}</div>
                  <div key={index+1}>{item.weekday}</div>
                  <div key={index+2}>{item.startTime}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Card>
    </Row>
  );
};
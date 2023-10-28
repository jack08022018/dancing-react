import 'antd/dist/reset.css';
import './Style.css';
import { Row, Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { loginAsync } from './Slice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (values) => {
    var result = await dispatch(loginAsync(values));
    if (result.payload !== undefined) {
      if(result.payload.roles[0] === 'USER') {
        navigate('/info');
      }
    }
  };
  
  return (
    // isLoginSuccess ? navigate('/info') :
    <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh', with: '100%', background: 'white', padding: '2px'}}>
      <Card>
        <Form
          name="normal_"
          className="-form"
          // initialValues={{
          //   remember: true,
          // }}
          onFinish={login}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
};
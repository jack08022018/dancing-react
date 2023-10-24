import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
// import './Style.css';

const { Sider } = Layout;

export default function SiderMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleSiderMenuClick = action => {
    // console.log(`Current pathname: ${pathname}`);
    navigate(action.key);
  };

  const menuItems = [
    {key: '/', icon: <PieChartOutlined />, label: 'Home'},
    {key: '/about', icon: <DesktopOutlined />, label: 'About'},
    {key: '/user', icon: <UserOutlined />, label: 'User'},
  ]

  return (
    <Sider 
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline" onClick={handleSiderMenuClick} items={menuItems} />
    </Sider>
  );
}

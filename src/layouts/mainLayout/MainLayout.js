import './Style.css';
import { Layout, Breadcrumb } from 'antd';
import { Outlet } from 'react-router-dom';
import SiderMenu from './SiderMenu';
import { useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');

  return (
    pathname === 'login' ? <Outlet />
    :
    <Layout hasSider>
      <SiderMenu />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: 'white', textAlign: 'center' }} >Header</Header>
        <Content style={{ margin: '0 8px' }}>
          <Breadcrumb items={[{ title: pathname === '' ? 'Home' : pathname }]} />
          <div className="site-layout-background" style={{ padding: 10, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

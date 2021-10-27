import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '../lib/auth/hooks'
import { Layout, Menu, Typography } from 'antd';
import {
  PoweroffOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  UserAddOutlined,
  LoginOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const loggedMenu = (props) => {
  return (
    <>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="users" icon={<TeamOutlined />}>
          <Link href='/users'>
            <a>
              Users
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="my-profile" icon={<UserOutlined />}>
          <Link href='/users/me'>
            <a>
              My Profile
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="truc" icon={<FileOutlined />}>
          <Link href='/posts'>
            <a>
              Timeline
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<PoweroffOutlined />}>
          <Link href='/api/auth/logout'>
            <a>
              Logout
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  )
}

const unloggedMenu = (props) => {
  return (
    <>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="login" icon={<LoginOutlined />}>
          <Link href='/auth/login'>
            <a>
              Log In
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="register" icon={<UserAddOutlined />}>
          <Link href='/auth/register'>
            <a>
              Register
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  )
}

const MainLayout = ({ children }) => {

  const user = useUser();

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(!collapsed);
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Title level={2} type='success'>Likebook</Title>
        {user ?
        loggedMenu()
        :
        unloggedMenu()}
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          {/* <PoweroffOutlined style={{ color: 'red', float: 'right' }}/> */}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout

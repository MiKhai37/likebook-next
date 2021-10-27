import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Typography } from 'antd';
import { useUser } from '../../lib/auth/hooks';

const { Title } = Typography;

const Me = () => {

  const user = useUser({ redirectTo: '/auth/login' });

  return (
    <div>
      <Title>My Profile</Title>
      <p>{user?.firstName + ' ' + user?.lastName}</p>
    </div>
  )
}

export default Me

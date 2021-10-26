import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Typography } from 'antd';
import useUser from '../../lib/useUser';

const { Title } = Typography;

const Me = () => {
  const { user } = useUser({ redirectTo: '/auth/login' })

  if (!user || user.isLoggedIn === false) {
    return 'User Auth Loading...'
  }

  return (
    <div>
      <Title>My Profile</Title>
      <p>{user?.data.firstName + ' ' + user?.data.lastName}</p>
    </div>
  )
}

export default Me

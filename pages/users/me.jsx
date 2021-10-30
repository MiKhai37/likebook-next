import React from 'react';
import { Typography } from 'antd';
import { useUser } from '../../lib/auth/hooks';

const { Title } = Typography;

const Me = () => {

  const user = useUser({ redirectTo: '/auth/login' });

  return (
    <>
      <Title>{`${user?.username} (${user?.firstName} ${user?.lastName})`}</Title>
      <img src={user?.avatar} alt='User Avatar' layout='fill'/>
      <Title level={3}>My Friends</Title>
      <Title level={3}>My Posts</Title>
    </>
  )
}

export default Me

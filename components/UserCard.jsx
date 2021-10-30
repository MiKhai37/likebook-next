/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image'; // TODO use next/image, problem with authorized domain
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const UserCard = ({ userId }) => {

  const { data: user } = useSWR(`/api/users/${userId}`, fetcher);

  if (!user) return 'User loading...'

  const extra = 
  <Button>
    <UserAddOutlined />
  </Button>;

  const actions =[
  <Link href={`/users/${user.user._id}`} key='profile'>
    <a>
      <UserOutlined />
    </a>
  </Link>
  ];

  return (
    <>
      <Card hoverable title={user.user.username}
        extra={extra}
        actions={actions}>
        <img src={user.user.avatar} alt='User Avatar' layout='fill'/>
        <p>{user.user.firstName + ' ' + user.user.lastName}</p>
        <p>{`Friends: ${user.user.friends.length}`}</p>
      </Card>
    </>
  )
}

export default UserCard

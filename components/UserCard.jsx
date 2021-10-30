/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image'; // TODO use next/image, problem with authorized domain
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const UserCard = ({ userId }) => {

  const { data: userData } = useSWR(`/api/users/${userId}`, fetcher);
  const user = userData?.data

  if (!userData) return 'User loading...'

  const extra = 
  <Button>
    <UserAddOutlined />
  </Button>;

  const actions =[
  <Link href={`/users/${user?._id}`} key='profile'>
    <a>
      <UserOutlined />
    </a>
  </Link>
  ];

  return (
    <>
      <Card hoverable title={user?.username}
        extra={extra}
        actions={actions}>
        <img src={user?.avatar} alt='User Avatar' layout='fill'/>
        <p>{user?.firstName + ' ' + user?.lastName}</p>
        <p>{`Friends: ${user?.friends.length}`}</p>
      </Card>
    </>
  )
}

export default UserCard

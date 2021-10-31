/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Card, Button, Typography } from 'antd';
import Link from 'next/link';
import Image from 'next/image'; // TODO use next/image, problem with authorized domain
import { UserAddOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';
import useSWR, { useSWRConfig } from 'swr';
import { useUser } from '../lib/auth/hooks';

const { Title } = Typography;


const UserCard = ({ userId }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const me = useUser();
  const { mutate } = useSWRConfig()
  const { data: meFull } = useSWR(`/api/users/${me._id}`);
  const { data: user } = useSWR(`/api/users/${userId}`);

  if (!user || !meFull) return 'User loading...'

  const askFriendship = async () => {

    const body = {
      receiverID: userId,
    }

    try {
      const res = await fetch(`/api/users/requests/send`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      mutate(`/api/users/${userId}`)
      if (res.status !== 200) {
        throw new Error(await res.text());
      };
    } catch (err) {
      console.error('Unexpected error: ', err);
      setErrorMsg(err.message);
    }
  }

  const acceptFriendship = async () => {

    const body = {
      acceptedId: userId,
    }

    try {
      const res = await fetch(`/api/users/requests/accept`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      mutate(`/api/users/${userId}`)
      if (res.status !== 200) {
        throw new Error(await res.text());
      };
    } catch (err) {
      console.error('Unexpected error: ', err);
      setErrorMsg(err.message);
    }
  }

  const extra = 

      meFull.user.friends.includes(user.user._id)
      ?
      <Button>
      <HeartOutlined />
      </Button>
      :
      meFull.user.friendRequests.includes(user.user._id)
      ?
      <Button onClick={acceptFriendship} >
      {'accept'}
      </Button>
      :
      user.user.friendRequests.includes(meFull.user._id)
      ?
      <Button onClick={askFriendship} >
      {'waiting'}
      </Button>
      :
      <Button onClick={askFriendship} >
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
      <Card hoverable title={user.user.username} extra={extra} actions={actions}>
        {errorMsg && <Title level={4} type='danger' className="error">{errorMsg}</Title>}
        <img src={user.user.avatar} alt='User Avatar' layout='fill'/>
        <p>{user.user.firstName + ' ' + user.user.lastName}</p>
        <p>{`Friends: ${user.user.friends.length}`}</p>
      </Card>
    </>
  )
}

export default UserCard

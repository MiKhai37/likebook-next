import React from 'react';
import { Card, Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image'; // TODO use next/image, problem with authorized domain
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';

const UserCard = ({ user }) => {
  return (
    <>
      <Card hoverable title={user.firstName + ' ' + user.lastName}
        extra={<Button><UserAddOutlined /></Button>}
        actions={[<Link href={`/users/${user._id}`} key='profile'><a><UserOutlined /></a></Link>]}>
        <img src={user?.avatar} alt='User Avatar' layout='fill'/>
      </Card>
    </>
  )
}

export default UserCard

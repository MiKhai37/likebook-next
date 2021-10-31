import React from 'react';
import UserCard from '../../components/UserCard';
import { Typography, Row, Col } from 'antd';
import useSWR from 'swr';
import { useUser } from '../../lib/auth/hooks';

const { Title } = Typography;

const Users = () => {
  useUser({ redirectTo: '/auth/login' });
  const { data: users } = useSWR("/api/users");

  if (!users) return "Loading...";

  return (
    <div>
      <Title>Users</Title>
      <Row gutter={[32, 32]}>
          {users.users.map(user => {
            return (
              <Col key={user._id} xs={24} sm={12} lg={6}>
                <UserCard userId={user._id} />
              </Col>
            )
          })}
      </Row>
    </div>
  )
}

export default Users;
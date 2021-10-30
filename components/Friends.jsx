import React from 'react';
import { Typography, Row, Col } from 'antd';
import UserCard from './UserCard';

const { Title } = Typography;

const Friends = ({ friendIds }) => {
  return (
    <>
      <Title level={3}>Friends</Title>
      {friendIds?.map(friendId => {
        return (
          <Col key={friendId} xs={24} sm={12} lg={6}>
            <UserCard userId={friendId} />
          </Col>
        )
      })}
    </>
  )
}

export default Friends

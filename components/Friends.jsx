import React from 'react';
import { Typography, Row, Col } from 'antd';
import UserCard from './UserCard';

const { Title } = Typography;

const Friends = ({ friendIds }) => {
  return (
    <>
      <Row gutter={[32, 32]}>
      {friendIds?.map(friendId => {
        return (
            <Col key={friendId} xs={24} sm={12} lg={6}>
              <UserCard userId={friendId} />
            </Col>
        )
      })}
      </Row>
    </>
  )
}

export default Friends

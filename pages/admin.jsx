import React from 'react';
import useSWR from 'swr';
import { Typography } from 'antd';

const { Title } = Typography

const Admin = () => {
  const { data: users } = useSWR("/api/admin/users");
  const { data: posts } = useSWR("/api/admin/posts");
  const { data: comments } = useSWR("/api/admin/comments");

  if (!users || !posts || !comments) return 'Loading...'

  console.log(comments)

  return (
    <>
      <Title level={1} >Admin Dashboard</Title>
      <Title level={3} >Users</Title>
      <p>{users.users.length} Users</p>
      <Title level={3} >Posts</Title>
      <p>{posts.posts.length} Posts</p>
      <Title level={3} >Comments</Title>
      <p>{comments.comments.length} Comments</p>
    </>
  );
};

export default Admin;

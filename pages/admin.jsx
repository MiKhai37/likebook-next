import React from 'react';
import useSWR from 'swr';
import { Typography } from 'antd';

const { Title } = Typography

const fetcher = (url) => fetch(url).then((res) => res.json());

const Admin = () => {
  const { data: users } = useSWR("/api/admin/users", fetcher);
  const { data: posts } = useSWR("/api/admin/posts", fetcher);
  const { data: comments } = useSWR("/api/admin/comments", fetcher);

  if (!users || !posts || !comments) return 'Loading...'

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

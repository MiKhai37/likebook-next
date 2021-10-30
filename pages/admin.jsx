import React from 'react';
import useSWR from 'swr';
import { Typography } from 'antd';

const { Title } = Typography

const fetcher = (url) => fetch(url).then((res) => res.json());

const Admin = () => {
  const { data: users, error: usersError } = useSWR("/api/admin/users", fetcher);
  const { data: posts, error: postsError } = useSWR("/api/admin/posts", fetcher);
  const { data: comments, error: commentsError } = useSWR("/api/admin/comments", fetcher);

  return (
    <>
      <Title level={1} >Admin Dashboard</Title>
      <Title level={3} >Users</Title>
      <p>{users?.data?.users.length}</p>
      <Title level={3} >Posts</Title>
      <p>{posts?.data?.posts.length}</p>
      <Title level={3} >Comments</Title>
      <p>{comments?.data?.comments.length}</p>
    </>
  );
};

export default Admin;

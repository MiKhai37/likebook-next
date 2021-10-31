/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Typography, Spin } from 'antd';
import { useUser } from '../../lib/auth/hooks';
import useSWR from 'swr';
import PostCard from '../../components/PostCard';
import Friends from '../../components/Friends';

const { Title } = Typography;

const Me = () => {

  useUser({ redirectTo: '/auth/login' });
  const { data: user } = useSWR('/api/auth/user');
  const { data: userPosts } = useSWR(`/api/users/${user?.user._id}/posts`);

  if (!user) return <Spin />;
  if (!userPosts) return <Spin />;

  return (
    <>
      <Title>{`${user.user.username} (${user.user.firstName} ${user.user.lastName})`}</Title>
      <img src={user.user.avatar} alt='User Avatar' layout='fill'/>
      <Title level={3}>My Friends</Title>
      <Friends friendIds={user.user.friends} />
      <Title level={3}>My Posts</Title>
      {userPosts.posts.map(post => {
        return (
          <PostCard key={post._id} postId={post._id} />
        )
      })}
    </>
  )
}

export default Me

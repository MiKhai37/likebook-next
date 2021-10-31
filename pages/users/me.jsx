/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Typography } from 'antd';
import { useUser } from '../../lib/auth/hooks';
import useSWR from 'swr';
import PostCard from '../../components/PostCard';
import Friends from '../../components/Friends';

const { Title } = Typography;

const Me = () => {

  const user = useUser({ redirectTo: '/auth/login' });
  const { data: userFull } = useSWR(`/api/users/${user?._id}`);
  const { data: userPosts } = useSWR(`/api/users/${user?._id}/posts`);
  
  if (!user) return 'loading...';
  if (!userFull) return 'loading...';
  if (!userPosts) return 'loading...';

  console.log(userPosts)

  return (
    <>
      <Title>{`${user.username} (${user.firstName} ${user.lastName})`}</Title>
      <img src={user.avatar} alt='User Avatar' layout='fill'/>
      <Title level={3}>My Friends</Title>
      <Friends friendIds={userFull.user.friends} />
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

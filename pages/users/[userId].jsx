import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Typography, Row, Col } from 'antd';
import PostCard from '../../components/PostCard';
import Friends from '../../components/Friends';
import { useUser } from '../../lib/auth/hooks';

const { Title } = Typography;

const User = () => {
  useUser({ redirectTo: '/auth/login' });
  const router = useRouter()

  const { data: user } = useSWR(`/api/users/${router.query.userId}`);
  const { data: userPosts } = useSWR(`/api/users/${router.query.userId}/posts`);

  if (!user) return "Loading User...";
  if (!userPosts) return "Loading Posts...";

  return (
    <div>
      <Title>{user.user.firstName + ' ' + user.user.lastName}</Title>
      <Title level={3}>Friends</Title>
      <Friends friendIds={user.user.friends} />
      <Title level={3}>Posts</Title>
      {userPosts.posts.map(post => {
        return (
          <PostCard key={post._id} postId={post._id} />
        )
      })}
    </div>
  )
}

export default User

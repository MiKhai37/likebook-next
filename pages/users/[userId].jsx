import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Typography, Row, Col } from 'antd';
import PostCard from '../../components/PostCard';
import { useUser } from '../../lib/auth/hooks';

const { Title } = Typography;

const fetcher = (...args) => fetch(...args).then(res => res.json());

const User = () => {
  useUser({ redirectTo: '/auth/login' });
  const router = useRouter()

  const { error: userError, data: userData } = useSWR(`/api/users/${router.query.userId}`, fetcher);
  const { error: userPostsError, data: userPostsData } = useSWR(`/api/users/${router.query.userId}/posts`, fetcher);


  if (userError) return "An error (user) has occurred.";
  if (!userData) return "Loading User...";

  if (userPostsError) return "An error (posts) has occurred.";
  if (!userPostsData) return "Loading Posts...";

  return (
    <div>
      <Title>{userData?.data?.firstName + ' ' + userData?.data?.lastName}</Title>
      {userPostsData?.data?.posts.map(post => {
        return (
          <PostCard key={post._id} post={post} />
        )
      })}
    </div>
  )
}

export default User

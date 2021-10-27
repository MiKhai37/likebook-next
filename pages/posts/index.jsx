import React from 'react';
import PostCard from '../../components/PostCard'
import { Typography } from 'antd';
import useSWR from 'swr';
import { useUser } from '../../lib/auth/hooks';

const { Title } = Typography;

const fetcher = (url) => fetch(url).then((res) => res.json());

const Posts = () => {
  useUser({ redirectTo: '/auth/login' })
  const { data: postsData, error: postsError } = useSWR('/api/posts', fetcher);

  if (postsError) return "An error (posts) has occurred.";
  if (!postsData) return "Loading Posts...";
  
  return (
    <>
      <Title>Post Timeline</Title>
      {postsData?.data.map(post => {
        return (
          <PostCard key={post._id} post={post} />
        )
      })}
    </>
  )
}

export default Posts

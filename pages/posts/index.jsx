import React from 'react';
import PostCard from '../../components/PostCard'
import { Typography } from 'antd';
import useSWR from 'swr';
import { useUser } from '../../lib/auth/hooks';

const { Title } = Typography;

const Posts = () => {
  useUser({ redirectTo: '/auth/login' })
  const { data: posts } = useSWR('/api/posts');

  if (!posts) return "Loading Posts...";
  
  return (
    <>
      <Title>Post Timeline</Title>
      {posts.posts.map(post => {
        return (
          <PostCard key={post._id} postId={post._id} />
        )
      })}
    </>
  )
}

export default Posts

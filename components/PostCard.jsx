import React, { useState } from 'react';
import { Card, Avatar, Comment, Tooltip, List, Typography } from 'antd'
import { CommentOutlined, LikeOutlined, DislikeOutlined, TaobaoSquareFilled } from '@ant-design/icons';
import useSWR, { useSWRConfig } from 'swr';
import { useUser } from '../lib/auth/hooks';

const { Title } = Typography;

const fetcher = (...args) => fetch(...args).then(res => res.json());

const PostCard = ({ postId }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const { mutate } = useSWRConfig()
  const { data: post } = useSWR(`/api/posts/${postId}`, fetcher);
  const { data: comments } = useSWR(`/api/posts/${postId}/comments`, fetcher);

  if (!post) return 'Post loading...'
  if (!comments) return 'Comments loading...'

  const toggleLikePost = async () => {
    setErrorMsg('');

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      mutate(`/api/posts/${postId}`)
      if (res.status !== 200) {
        throw new Error(await res.text());
      };
    } catch (err) {
      console.error('Unexpected error: ', err);
      setErrorMsg(err.message);
    }
  }

  const toggleLikeComment = async (commentId) => {
    setErrorMsg('');

    try {
      const res = await fetch(`/api/comments/${commentId}/like`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      mutate(`/api/posts/${postId}/comments`)
      if (res.status !== 200) {
        throw new Error(await res.text());
      };
    } catch (err) {
      console.error('Unexpected error: ', err);
      setErrorMsg(err.message);
    }
  }

  const postAction = [
    <span key='comment'>
      <CommentOutlined key="comment" />
      <span> {comments.comments.length}</span>
    </span>,
    <span onClick={toggleLikePost} key='like'>
      <LikeOutlined key="like" />
      <span> {post.post.likes.length}</span>
    </span>
  ];

  return (
    <>
      <Card title={post.post.author.username} extra={<Avatar src={post.post.author.avatar} />}actions={postAction} style={{ margin: '32px'}}>
        {errorMsg && <Title level={4} type='danger' className="error">{errorMsg}</Title>}
        <p>{post.post.textContent}</p>
      <List
        className="comment-list"
        header={`${comments.comments.length} comments`}
        itemLayout='horizontal'
        dataSource={comments.comments}
        renderItem={item => (
          <li>
            <Comment
              actions={[
                <span onClick={() => toggleLikeComment(item._id)} key='like'>
                  <LikeOutlined key="like" />
                  <span> {item.likes.length}</span>
                </span>
              ]}
              author={item.author.username}
              avatar={item.author.avatar}
              content={item.textContent}
            />
          </li>
        )}
      />
      </Card>
    </>
  )
}

export default PostCard

import React, { useState } from 'react';
import { Card, Avatar, Comment, Tooltip, List, Typography } from 'antd'
import { CommentOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import useSWR from 'swr';

const { Title } = Typography;

const fetcher = (...args) => fetch(...args).then(res => res.json());

const PostCard = ({ post }) => {
  const [errorMsg, setErrorMsg] = useState('');

  const { data: commentsData } = useSWR(`/api/posts/${post._id}/comments`, fetcher);


  const toggleLikePost = async () => {
    setErrorMsg('');

    try {
      const res = await fetch(`/api/posts/${post._id}/like`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
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
      <span> {commentsData?.data.comments.length}</span>
    </span>,
    <span onClick={toggleLikePost} key='like'>
      <LikeOutlined key="like" />
      <span> {post.likes.length}</span>
    </span>
  ];

  return (
    <>
      <Card title={post.author.username} extra={<Avatar src={post.author.avatar} />}actions={postAction} style={{ margin: '32px'}}>
        {errorMsg && <Title level={4} type='danger' className="error">{errorMsg}</Title>}
        <p>{post.textContent}</p>
      <List
        className="comment-list"
        header={`${commentsData?.data.comments.length} comments`}
        itemLayout='horizontal'
        dataSource={commentsData?.data.comments}
        renderItem={item => (
          <li>
            <Comment
              actions={[
                <span key='like'>
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

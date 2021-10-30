import React, { useState } from 'react';
import { Card, Avatar, Comment, Tooltip, List, Typography } from 'antd'
import { CommentOutlined, LikeOutlined, DislikeOutlined, TaobaoSquareFilled } from '@ant-design/icons';
import useSWR, { useSWRConfig } from 'swr';

const { Title } = Typography;

const fetcher = (...args) => fetch(...args).then(res => res.json());

const PostCard = ({ postId }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const { mutate } = useSWRConfig()
  const { data: postData } = useSWR(`/api/posts/${postId}`, fetcher);
  const { data: commentsData } = useSWR(`/api/posts/${postId}/comments`, fetcher);

  if (!postData) return 'Post loading...'
  if (!commentsData) return 'Comment loading...'

  console.log(postData);

  const toggleLikePost = async () => {
    setErrorMsg('');

    //mutate(`/api/posts/${postId}`, {...postData, post: post.like}, false )

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
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

  const toggleLikeComment = async (commentId) => {
    setErrorMsg('');

    try {
      const res = await fetch(`/api/comments/${commentId}/like`, {
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
      <span> {postData?.data?.likes?.length}</span>
    </span>
  ];

  return (
    <>
      <Card title={postData?.data?.author?.username} extra={<Avatar src={postData?.data?.author?.avatar} />}actions={postAction} style={{ margin: '32px'}}>
        {errorMsg && <Title level={4} type='danger' className="error">{errorMsg}</Title>}
        <p>{postData?.data?.textContent}</p>
      <List
        className="comment-list"
        header={`${commentsData?.data.comments.length} comments`}
        itemLayout='horizontal'
        dataSource={commentsData?.data.comments}
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

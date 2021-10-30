import React from 'react'
import { Card, Avatar, Comment, Tooltip, List, Typography } from 'antd'
import { CommentOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const PostCard = ({ post }) => {

  const { data: commentsData } = useSWR(`/api/posts/${post._id}/comments`, fetcher);

  const postAction = [
    <span key='comment'>
      <CommentOutlined key="comment" />
      <span> {commentsData?.data.comments.length}</span>
    </span>,
    <span key='like'>
      <LikeOutlined key="like" />
      <span> {post.likes.length}</span>
    </span>
  ];

  return (
    <>
      <Card title={post.author.username} extra={<Avatar src={post.author.avatar} />}actions={postAction} style={{ margin: '32px'}}>
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

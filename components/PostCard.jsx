import React from 'react'
import { Card, Avatar, Comment, Tooltip, List } from 'antd'
import { CommentOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const PostCard = ({ post }) => {

  const { data: commentsData } = useSWR(`/api/posts/${post._id}/comments`, fetcher);

  const commentAction = [
    <LikeOutlined key="like" />,
    <DislikeOutlined key="dislike" />,
  ];

  const postAction = [
    <CommentOutlined key="comment" />,
    <LikeOutlined key="like" />,
    <DislikeOutlined key="dislike" />,
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
              actions={commentAction}
              author={item.author._id}
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

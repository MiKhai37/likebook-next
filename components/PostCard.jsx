import React from 'react'
import { Card, Avatar, Comment, Tooltip, List } from 'antd'
import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const PostCard = ({ post }) => {

  const { data: commentsData } = useSWR(`/api/posts/${post._id}/comments`, fetcher);
  console.log(commentsData)

  

  return (
    <>
      <Card title={post.author._id} extra={<Avatar src={post.author.avatar} />}actions={[
        <CommentOutlined key="comment" />,
        <LikeOutlined key="like" />,
      ]}>
        <p>{post.textContent}</p>
      <List
        className="comment-list"
        header={`${commentsData?.data.comments.length} replies`}
        itemLayout='horizontal'
        dataSource={commentsData?.data.comments}
        renderItem={item => (
          <li>
            <Comment
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

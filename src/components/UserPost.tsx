import React from "react";
import { Card, Tag, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

interface Post {
  id: string;
  title: string;
  description: string;
  status: "draft" | "published" | "archived" | "pending";
  createDate: string;
  updateDate: string;
}

interface PostProps {
  post: Post;
}

const statusColors: Record<string, string> = {
  draft: "default",
  published: "green",
  archived: "red",
  pending: "orange",
};

const UserPost: React.FC<PostProps> = ({ post }) => {
  return (
    <Card style={{ marginBottom: 16, width: "100%", border: "none" }}>
      <Title level={4}>{post.title}</Title>
      <Tag color={statusColors[post.status as keyof typeof statusColors]}>
        {post.status.toUpperCase()}
      </Tag>
      <Paragraph>{post.description}</Paragraph>
      <Text type="secondary">Created: {post.createDate}</Text>
      <br />
      <Text type="secondary">Updated: {post.updateDate}</Text>
    </Card>
  );
};

export default UserPost;

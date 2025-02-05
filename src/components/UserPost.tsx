import React from "react";
import { Card, Tag, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

interface PostProps {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: "draft" | "published" | "archived";
  createDate: string;
  updateDate: string;
}

const statusColors: Record<PostProps["status"], string> = {
  pending: "orange",
  approve: "green",
  reject: "red",
};

const UserPost: React.FC<PostProps> = ({post}) => {
  return (
    <Card style={{ marginBottom: 16, width: "100%", border: "none" }}>
      <Title level={4}>{post.title}</Title>
      <Tag color={statusColors[post.status]}>{post.status.toUpperCase()}</Tag>
      <Paragraph>{post.description}</Paragraph>
      <Text type="secondary">Created: {post.createDate}</Text>
      <br />
      <Text type="secondary">Updated: {post.updateDate}</Text>
    </Card>
  );
};

export default UserPost;
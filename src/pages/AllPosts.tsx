import React, { useState, useEffect } from "react";
import { Card, Typography, Avatar, Space, Button, Modal, Form, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Post {
  id?: string;
  title: string;
  description: string;
  status?: string;
  userId?: number;
  createDate?: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
}

const ApprovedPostsViewer: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const mockUser: User = {
    id: 1,
    name: "John Doe",
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel"
  };

  useEffect(() => {
    fetchApprovedPosts();
  }, []);

  const fetchApprovedPosts = () => {
    axios.get("https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/Post")
      .then((response) => {
        const approvedPosts = response.data.filter((post: Post) => post.status === "approved");
        setPosts(approvedPosts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };

  const handleCreate = () => {
    navigate("/user-posts");
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsModalVisible(true);
  };

  const handleUpdate = (values: Post) => {
    if (editingPost && editingPost.id) {
      axios.put(`https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/Post/${editingPost.id}`, {
        ...editingPost,
        ...values
      })
      .then(() => {
        fetchApprovedPosts();
        setIsModalVisible(false);
      })
      .catch((error) => console.error("Error updating post:", error));
    }
  };

  const handleDelete = (postId?: string) => {
    if (postId) {
      axios.delete(`https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/Post/${postId}`)
        .then(() => {
          fetchApprovedPosts();
        })
        .catch((error) => console.error("Error deleting post:", error));
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>Create Post</Button>}>
          <Space>
            <Avatar src={mockUser.avatar} size="large" />
            <Typography.Title level={4} style={{ margin: 0 }}>
              {mockUser.name}
            </Typography.Title>
          </Space>
        </Card>

        {posts.map((post) => (
          <Card 
            key={post.id} 
            title={post.title}
            extra={
              <Space>
                <Button 
                  icon={<EditOutlined />} 
                  onClick={() => handleEdit(post)}
                />
                <Button 
                  icon={<DeleteOutlined />} 
                  onClick={() => handleDelete(post.id)}
                  danger
                />
              </Space>
            }
          >
            <Typography.Paragraph>
              {post.description}
            </Typography.Paragraph>
          </Card>
        ))}

        <Modal
          title="Edit Post"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            initialValues={editingPost || {}}
            onFinish={handleUpdate}
          >
            <Form.Item 
              name="title" 
              label="Title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              name="description" 
              label="Description"
              rules={[{ required: true, message: 'Please input the description!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Post
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </div>
  );
};

export default ApprovedPostsViewer;
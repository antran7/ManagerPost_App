import React, { useState } from "react";
import { Form, Input, Button, Upload, List } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./UserPostManager.css";

interface Post {
  title: string;
  content: string;
  image?: string;
}

const UserPostManager: React.FC = () => {
  const [form] = Form.useForm();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<number | null>(null);

  const onFinish = (values: Post) => {
    if (editingPost !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editingPost] = values;
      setPosts(updatedPosts);
      setEditingPost(null);
    } else {
      setPosts([...posts, values]);
    }
    form.resetFields();
  };

  const onEdit = (index: number) => {
    setEditingPost(index);
    form.setFieldsValue(posts[index]);
  };

  const onDelete = (index: number) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      {/* Welcome User Text */}
      <h2 className="welcome-text">Welcome User</h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter title!" }]}> 
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item label="Content" name="content" rules={[{ required: true, message: "Please enter content!" }]}> 
          <Input.TextArea placeholder="Enter post content" />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Upload listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingPost !== null ? "Update Post" : "Create Post"}
          </Button>
        </Form.Item>
      </Form>

      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={(post, index) => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} onClick={() => onEdit(index)}>Edit</Button>,
              <Button icon={<DeleteOutlined />} onClick={() => onDelete(index)}>Delete</Button>
            ]}
          >
            <List.Item.Meta title={post.title} description={post.content} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserPostManager;
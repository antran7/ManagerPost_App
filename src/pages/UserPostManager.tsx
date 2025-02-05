import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, List, Tag } from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "./UserPostManager.css";

interface Post {
  id?: string;
  title: string;
  description: string;
  image?: string;
  userId?: number;
  createDate?: string;
  updateDate?: string;
  status?: string;
}

const UserPostManager: React.FC = () => {
  const [form] = Form.useForm();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get("https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/Post")
        .then((response) => {
          const userPosts = response.data.filter(
            (post: Post) => post.userId === userId
          );
          setPosts(userPosts);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [userId]);

  const getCurrentDate = () => dayjs().format("YYYY-MM-DD");

  const onFinish = (values: Post) => {
    if (!userId) {
      console.error("User not found");
      return;
    }

    if (editingPost !== null) {
      const updatedPost = {
        ...values,
        id: posts[editingPost].id,
        userId: posts[editingPost].userId,
        createDate: posts[editingPost].createDate,
        updateDate: getCurrentDate(),
        status: posts[editingPost].status,
      };

      axios
        .put(
          `https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/Post/${updatedPost.id}`,
          updatedPost
        )
        .then((response) => {
          const updatedPosts = [...posts];
          updatedPosts[editingPost] = response.data;
          setPosts(updatedPosts);
          setEditingPost(null);
          form.resetFields();
        })
        .catch((error) => console.error("Error updating post:", error));
    } else {
      const newPost = {
        ...values,
        userId,
        createDate: getCurrentDate(),
        updateDate: getCurrentDate(),
        status: "pending",
      };

      axios
        .post("https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/Post", newPost)
        .then((response) => {
          setPosts([...posts, response.data]);
          form.resetFields();
        })
        .catch((error) => console.error("Error creating post:", error));
    }
  };

  const onEdit = (index: number) => {
    setEditingPost(index);
    form.setFieldsValue(posts[index]);
  };

  const back = () => {
    navigate("/allposts");
  };

  const onDelete = (index: number) => {
    const postId = posts[index].id;
    axios
      .delete(`https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/Post/${postId}`)
      .then(() => setPosts(posts.filter((_, i) => i !== index)))
      .catch((error) => console.error("Error deleting post:", error));
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "approved":
        return "green";
      case "rejected":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <div className="body1">
      <div className="container">
        <h2 className="welcome-text">Welcome User</h2>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title!" }]}
          >
            <Input placeholder="Enter post title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter content!" }]}
          >
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
                <Button icon={<EditOutlined />} onClick={() => onEdit(index)}>
                  Edit
                </Button>,
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(index)}
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {post.title}
                    <Tag color={getStatusColor(post.status)}>{post.status}</Tag>
                  </div>
                }
                description={post.description}
              />
            </List.Item>
          )}
        />
        <button onClick={back}>Back to All Posts</button>
      </div>
    </div>
  );
};

export default UserPostManager;

import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Avatar,
  Space,
  Button,
  Modal,
  List,
} from "antd";
import {
  PlusOutlined,
  LogoutOutlined,
  EyeOutlined,
} from "@ant-design/icons";
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
  const [approvedPosts, setApprovedPosts] = useState<Post[]>([]);
  const [isApprovedModalVisible, setIsApprovedModalVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchApprovedPosts(parsedUser.id);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const fetchApprovedPosts = (userId: number) => {
    axios
      .get("https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/Post")
      .then((response) => {
        const approvedPosts = response.data.filter(
          (post: Post) => post.status === "approved" && post.userId === userId
        );
        setPosts(approvedPosts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };

  const fetchAllApprovedPosts = async () => {
    try {
      const response = await axios.get("https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/Post");
      const approved = response.data.filter((post: Post) => post.status === "approved");
      setApprovedPosts(approved);
      setIsApprovedModalVisible(true);
    } catch (error) {
      console.error("Error fetching approved posts:", error);
    }
  };

  const handleCreate = () => {
    navigate("/user-posts");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card
          extra={
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                Create Post
              </Button>
              <Button type="default" icon={<EyeOutlined />} onClick={fetchAllApprovedPosts}>
                View All Posts
              </Button>
              <Button type="default" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
              </Button>
            </Space>
          }
        >
          <Space>
            <Avatar src={user?.avatar} size="large" />
            <Typography.Title level={4} style={{ margin: 0 }}>
              {user?.name || "Guest User"}
            </Typography.Title>
          </Space>
        </Card>

        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} title={post.title}>
              <Typography.Paragraph>{post.description}</Typography.Paragraph>
            </Card>
          ))
        ) : (
          <Typography.Text>No posts available.</Typography.Text>
        )}

        <Modal
          title="All Posts"
          open={isApprovedModalVisible}
          onCancel={() => setIsApprovedModalVisible(false)}
          footer={null}
        >
          <List
            itemLayout="horizontal"
            dataSource={approvedPosts}
            renderItem={(post) => (
              <List.Item>
                <List.Item.Meta
                  title={<div>{post.title}</div>}
                  description={post.description}
                />
              </List.Item>
            )}
          />
        </Modal>
      </Space>
    </div>
  );
};

export default ApprovedPostsViewer;

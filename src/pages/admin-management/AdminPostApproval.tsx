import { approvePost, rejectPost, getPostsByStatus } from "../../api/postApi";
import { useState, useEffect } from "react";
import { Table, Typography, Spin, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  createDate: string;
  updateDate: string;
}

export default function AdminPostApproval() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPostsByStatus("pending");
        const sortedData = data.sort((a: Post, b: Post) =>
          a.createDate < b.createDate ? -1 : 1
        );
        setPosts(sortedData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleApprove = async (postId: string) => {
    try {
      await approvePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.toString());
      }
    }
  };

  const handleReject = async (postId: string) => {
    try {
      await rejectPost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.toString());
      }
    }
  };

  const columns: ColumnsType<Post> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Author",
      dataIndex: "userId",
      key: "userId",
      render: () => "Ten la",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleApprove(record.id)}>
            Approve
          </Button>
          <Button danger onClick={() => handleReject(record.id)}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: "24px" }}>
      <Typography.Title level={4} style={{ marginBottom: 16 }}>
        Pending Posts
      </Typography.Title>
      <Table columns={columns} dataSource={posts} rowKey="id" />
    </div>
  );
}

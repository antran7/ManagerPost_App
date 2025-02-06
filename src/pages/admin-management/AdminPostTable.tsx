import { Table, Typography, Spin, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deletePost, getAllPosts } from "../../api/postApi";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";

type Post = {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: string;
  createDate: string;
  updateDate: string;
};

export default function AdminPostTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllPosts();
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
  if (loading) return <p>Loading posts...</p>;

  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const columns: ColumnsType<Post> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "Update Date",
      dataIndex: "updateDate",
      key: "updateDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => handleDelete(record.id)}
          onCancel={() => message.error("Click on No")}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ cursor: "pointer" }} />
        </Popconfirm>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;

  return <Table columns={columns} dataSource={posts} rowKey="id" />;
}

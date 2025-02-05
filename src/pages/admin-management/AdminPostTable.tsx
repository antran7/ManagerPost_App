import { Table, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deletePost, getAllPosts } from "../../api/postApi";
import { useState, useEffect } from "react";

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
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      const sortedData = data.sort((a: Post, b: Post) =>
        a.createDate < b.createDate ? -1 : 1
      );
      setPosts(sortedData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      message.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      message.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      message.error("Failed to delete post");
    }
  };

  const columns = [
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
      title: "Action",
      key: "action",
      render: (_, record: Post) => (
        <Popconfirm
          title="Delete the post"
          description="Are you sure to delete this post?"
          onConfirm={() => handleDelete(record.id)}
          onCancel={() => message.error("Cancelled")}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: "#ff4d4f", cursor: "pointer" }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={posts}
      loading={loading}
      rowKey="id"
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
      }}
    />
  );
}

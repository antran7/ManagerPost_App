import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deletePost, getAllPosts } from "../../api/postApi";
import { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm, PopconfirmProps } from "antd";

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
  const confirm: PopconfirmProps["onConfirm"] = (postId) => {
    handleDelete(postId);
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Create Date</TableCell>
            <TableCell>Update Date</TableCell>
            <TableCell>Delete Post</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.description}</TableCell>
              <TableCell>{post.status}</TableCell>
              <TableCell>{post.createDate}</TableCell>
              <TableCell>{post.updateDate}</TableCell>
              <TableCell>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => confirm(post.id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined />{" "}
                </Popconfirm>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

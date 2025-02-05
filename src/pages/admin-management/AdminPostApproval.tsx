import { approvePost, deletePost, getPostsByStatus, rejectPost } from '../../api/postApi';
import { useState, useEffect } from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

type Post = {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: string;
  createDate: string;
  updateDate: string;
};

export default function AdminPostApproval() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPostsByStatus('pending');
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

  // const handleDelete = async (postId: number) => {
  //   try {
  //     await deletePost(postId);
  //     setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //   }
  // };

  const handleApprove = async (postId: number) => {
    try {
      await approvePost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    }catch(error) {
      console.error(error.toString());
    }
  }

  const handleReject = async (postId: number) => {
    try {
      await rejectPost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    }catch(error) {
      console.error(error.toString());
    }
  }

  if (loading) return <CircularProgress />;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 900, margin: 'auto', mt: 3, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Pending Posts</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>Ten la</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.description}</TableCell>
              <TableCell>{new Date(post.createDate).toLocaleDateString()}</TableCell>
              <TableCell>
              <Button 
                  variant="contained" 
                  color="primary" 
                  size="small" 
                  onClick={() => handleApprove(post.id)} 
                  sx={{ mr: 1 }}
                >
                  Approve
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  size="small" 
                  onClick={() => handleReject(post.id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
import React, { useEffect, useState } from "react";
import { TextField, Button, Paper, Typography, Modal, Box } from "@mui/material";
import { createPost } from "../../api/postApi"; 

export default function AdminModalPost() {

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      setUserId(userObject.id);
      console.log(userObject.id)
    }
  }, []);

  const [post, setPost] = useState({    
    userId: "", 
    title: "",
    description: "",
    status: "active",
    createDate: new Date().toISOString().split("T")[0],
    updateDate: new Date().toISOString().split("T")[0],
  });
  useEffect(() => {
    setPost((prevPost) => ({ ...prevPost, userId }));
  }, [userId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPost(post);
      alert("Post created successfully!");
      setPost({
        userId: userId,
        title: "",
        description: "",
        status: "active",
        createDate: new Date().toISOString().split("T")[0],
        updateDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
   const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  return (
  <div>
      
    <Button onClick={handleOpen}>Create New Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Create New Post
      </Typography>
      <form onSubmit={handleSubmit}>
      
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={post.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={post.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Paper>
        </Box>
      </Modal>
  </div>    
  );
}

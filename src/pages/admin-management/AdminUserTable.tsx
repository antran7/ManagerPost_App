import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { message, Popconfirm, PopconfirmProps } from 'antd';
import { deleteUser, getAllUsers } from '../../api/userApi';

type User = {
  id: number;
  name: string;
  password: string;
  email: string;
  createDate: string;
  updateDate: string;
  role: string;
};


export default function AdminUserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getAllUsers();
        const sortedData = data.sort((a: User, b: User) =>
          a.name < b.name ? -1 : 1
        );
        setUsers(sortedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);
  if (loading) return <p>Loading posts...</p>;
  
  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const confirm: PopconfirmProps['onConfirm'] = (userId) => {
    handleDelete(userId);
  };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Create Date</TableCell>
            <TableCell>Update Date</TableCell>
            <TableCell>Delete Post</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>

              <TableCell>{user.createDate}</TableCell>
              <TableCell>{user.updateDate}</TableCell>
              <TableCell>Delete<Popconfirm
                title="Delete the task"
                description="Are you sure to delete this user?"
                onConfirm={() => confirm(user.id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined />  </Popconfirm></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
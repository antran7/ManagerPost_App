import { Table, Spin, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { deleteUser, getAllUsers } from "../../api/userApi";
import type { ColumnsType } from "antd/es/table";

type User = {
  id: string;
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

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
          title="Delete the user"
          description="Are you sure to delete this user?"
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

  return <Table columns={columns} dataSource={users} rowKey="id" />;
}

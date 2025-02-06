import React from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ReadOutlined,
  UserOutlined,
  ClockCircleOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import AdminPostTable from "./AdminPostTable";
import AdminUserTable from "./AdminUserTable";
import AdminPostApproval from "./AdminPostApproval";
import type { MenuProps } from "antd";

const { Content, Sider, Header } = Layout;

export default function AdminPostManagement() {
  const [selectedKey, setSelectedKey] = React.useState("/post/postManagement");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "main-items",
      label: "Main items",
      type: "group",
      children: [
        {
          key: "/usersManagement",
          icon: <UserOutlined />,
          label: "Users Management",
        },
        {
          key: "post",
          icon: <ReadOutlined />,
          label: "Posts Management",
          children: [
            {
              key: "/post/postManagement",
              icon: <EditOutlined />,
              label: "Posts List",
            },
            {
              key: "/post/postApproval",
              icon: <ClockCircleOutlined />,
              label: "Pending Posts",
            },
          ],
        },
      ],
    },
  ];

  let content;
  if (selectedKey === "/usersManagement") {
    content = <AdminUserTable />;
  } else if (selectedKey === "/post/postManagement") {
    content = <AdminPostTable />;
  } else if (selectedKey === "/post/postApproval") {
    content = <AdminPostApproval />;
  } else {
    content = <div>Chọn một mục từ main items</div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: "0 24px",
          background: "#fff",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          danger
        >
          Logout
        </Button>
      </Header>
      <Layout>
        <Sider theme="light" width={200}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
            onClick={({ key }) => setSelectedKey(key)}
          />
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              background: "#fff",
            }}
          >
            {content}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

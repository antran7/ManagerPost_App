import React from "react";
import { Layout, Menu } from "antd";
import {
  ReadOutlined,
  UserOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AdminPostTable from "./AdminPostTable";
import AdminUserTable from "./AdminUserTable";
import AdminPostApproval from "./AdminPostApproval";
import type { MenuProps } from "antd";

const { Content, Sider } = Layout;

export default function AdminPostManagement() {
  const [selectedKey, setSelectedKey] = React.useState("/post/postManagement");

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
  );
}

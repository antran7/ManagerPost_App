import { Layout, Menu } from "antd";
import { UserOutlined, FileTextOutlined } from "@ant-design/icons";
import AdminPostTable from "./AdminPostTable";

const { Header, Content, Sider } = Layout;

const MENU_ITEMS = [
  {
    key: "main",
    label: "Main items",
    type: "group",
    children: [
      {
        key: "postManagement",
        icon: <UserOutlined />,
        label: "User Management",
      },
      {
        key: "orders",
        icon: <FileTextOutlined />,
        label: "Post Management",
      },
    ],
  },
];

export default function AdminPostManagement() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} theme="light">
        <Menu
          mode="inline"
          defaultSelectedKeys={["postManagement"]}
          defaultOpenKeys={["main"]}
          style={{ height: "100%", borderRight: 0 }}
          items={MENU_ITEMS}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          <AdminPostTable />
        </Content>
      </Layout>
    </Layout>
  );
}

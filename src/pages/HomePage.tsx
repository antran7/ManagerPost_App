import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { HomeOutlined, FileTextOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { getAllPosts } from '../api/postApi';
import UserPost from '../components/UserPost';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const items: MenuProps['items'] = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    key: 'my-posts',
    icon: <FileTextOutlined />,
    label: 'My Posts',
  },
];


const HomePage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    const fetchingPost = async () => {
      try {
        const data = await getAllPosts();
        if (data) {
          setUserPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchingPost();
  }, []);

  return (
    <Layout hasSider className='homepage'>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout className='homepage__layout'>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className='homepage__layout__grid'
          >
            {userPosts.map((post, index) => (
              <div key={index} className='homepage__layout__grid-item'>
                <UserPost post={post} />
              </div>
            ))}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
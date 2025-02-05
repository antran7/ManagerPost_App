import { Button, Checkbox, Col, Flex, Form, Input, Row } from 'antd'
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import './HomePage.css'
import React, { useState } from 'react'
import { getAllUsers } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("user") ? true : false;
    });

    const handleFinish = async (values) => {
        try {
            const data = await getAllUsers();
            if (data) {
                const userExists = data.find(user =>
                    user.name === values.username && user.password === values.password
                );

                if (userExists) {
                    console.log("User exists, login successful!");
                    localStorage.setItem("user", userExists);
                } else {
                    console.log("Invalid username or password!");
                }
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    return (
        <>
            <Row className='homepage'>
                <Col span={24} className='homepage__header'>
                    <h2>Welcome to the website</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, maiores repudiandae aliquid quibusdam enim asperiores officiis quasi. Esse dolore a quo commodi facilis, quia sunt suscipit mollitia iste assumenda molestiae!</p>
                </Col>
                <Col span={24} className='homepage__content'>
                    {isLoggedIn ? (
                        <div>
                            <Button>Manage</Button>
                        </div>
                        
                    ) : (
                        <div className='homepage__content-login'>
                            <h3>User Login</h3>
                            <Form onFinish={handleFinish}>
                                <Form.Item name='username'>
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder='Username'
                                    />
                                </Form.Item>
                                <Form.Item name='password'>
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        type='password'
                                        placeholder='Password'
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Flex justify="space-between" align="center">
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>
                                        <a className="forgot-password" href="">
                                            Forgot password
                                        </a>
                                    </Flex>
                                </Form.Item>
                                <Button className='homepage__login' htmlType='submit'>
                                    Login
                                </Button>
                            </Form>
                        </div>
                    )}

                </Col>
            </Row>
        </>
    )
}

export default HomePage

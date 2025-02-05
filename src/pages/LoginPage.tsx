import { Button, Checkbox, Col, Flex, Form, Input, Row } from 'antd'
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import './LoginPage.css'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const handleFinish = async (values) => {
        try {
            const data = await getAllUsers();
            if (data) {
                const userExists = data.find(user =>
                    user.name === values.username && user.password === values.password
                );

                if (userExists) {
                    console.log("User exists, login successful!");
                    localStorage.setItem("user", JSON.stringify(userExists));
                    if (userExists.role === "user") {
                        navigate("/home");
                    }else
                    if (userExists.role === "admin") {
                        navigate("/adminPostManagement");
                    }
                } else {
                    console.log("Invalid username or password!");
                    alert('Invalid username or password!');
                }
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    return (
        <>
            <Row className='loginpage'>
                <Col span={24} className='loginpage__header'>
                    <h2>Welcome to the website</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, maiores repudiandae aliquid quibusdam enim asperiores officiis quasi. Esse dolore a quo commodi facilis, quia sunt suscipit mollitia iste assumenda molestiae!</p>
                </Col>
                <Col span={24} className='loginpage__content'>
                    <div className='loginpage__content-login'>
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
                            <Button className='loginpage__login' htmlType='submit'>
                                Login
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default LoginPage

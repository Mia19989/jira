import { Form, Button, Input } from "antd";
import React, { FormEvent } from "react";
import { useAuth } from "../context/authContext";

// 登录页面
const Login = () => {
  const { login } = useAuth();

  const handleSubmit = (val: {username: string; password: string}) => {
    login(val)
  }

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input type="text" id="username" placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input type="password" id="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </>
  )
};

export default Login;

import { Button, Form, Input } from "antd";
import React, { FormEvent } from "react";
import { LongButton } from ".";
import { useAuth } from "../context/authContext";

// 注册页面
const Register = () => {
  const { register } = useAuth();

  const handleSubmit = (val: {username: string; password: string}) => {
    register(val)
  }

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input type="text" id="username" placeholder="请输入用户名" /></Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input type="password" id="password" placeholder="请输入密码" /></Form.Item>
        <Form.Item>
          <LongButton type="primary" htmlType="submit">注册</LongButton>
        </Form.Item>
      </Form>
    </>
  )
};

export default Register;

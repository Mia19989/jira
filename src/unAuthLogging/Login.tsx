import { Form, Input } from "antd";
import React from "react";
import { LongButton } from ".";
import { useAuth } from "../context/authContext";
import { useAsync } from "../utils/useAsync";

// 登录页面
const Login = ({onError}: {onError: (error: Error) => void}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, {throwOnError: true})

  const handleSubmit = async (val: {username: string; password: string}) => {
    try {
      await run(login(val))
    } catch (err: any) {
      console.log(err)
      onError(err)
    }
  }

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input type="text" id="username" placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input type="password" id="password" placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} type="primary" htmlType="submit">登录</LongButton>
        </Form.Item>
      </Form>
    </>
  )
};

export default Login;

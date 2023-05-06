import { Form, Input, Select } from "antd";
import React from "react";
import { LongButton } from ".";
import { useAuth } from "../context/authContext";
import { useAsync } from "../utils/useAsync";

// 注册页面
const Register = ({onError}: { onError: (error: Error) => void}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, {throwOnError: true})

  const handleSubmit = async ({cpassword, ...val}: {username: string; password: string, cpassword: string, identity: any}) => {
    console.log('--提交的信息', val);
    if (cpassword !== val.password) {
      onError(new Error('请确认两次密码输入的相同'))
      return;
    }
    try {
      await run(register(val))
    } catch(err: any) {
      console.log(err)
      onError(err)
    }
  }

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input type="text" id="username" placeholder="用户名" /></Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input type="password" id="password" placeholder="密码" /></Form.Item>
        <Form.Item name="cpassword" rules={[{ required: true, message: '请输入密码' }]}>
          <Input type="password" id="cpassword" placeholder="确认密码" />
        </Form.Item>

        <Form.Item name="identity" rules={[{ required: true }]}>
          <Select
            placeholder="请选择您的身份"
            allowClear
          >
            <Select.Option value="pm">产品经理</Select.Option>
            <Select.Option value="developer">开发人员</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} type="primary" htmlType="submit">注册</LongButton>
        </Form.Item>
      </Form>
    </>
  )
};

export default Register;

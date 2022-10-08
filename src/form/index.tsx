import { Button, Form, Input, FormInstance } from "antd";
import React, { useRef, Ref, useEffect } from "react";

const Index = () => {
  const formDom: React.Ref<FormInstance<{
    username: string;
    password: string;
}>> | undefined = useRef(null);
  const handleSubmit = (val: {username: string; password: string}) => {
    console.log(val)
    console.log('new ref:', formDom.current)
    const res = formDom.current?.getFieldsValue()
    console.log('res:', res);
  }

  useEffect(() => {
    console.log(formDom.current)
  }, [])

  return (
    <>
      <Form ref={formDom} onFinish={handleSubmit}>
        <Form.Item label="用户名" name="username">
          <Input type="text"></Input>
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input type="password"></Input>
        </Form.Item>
        <Button htmlType="submit">登录</Button>
      </Form>
    </>
  )
};

export default Index;

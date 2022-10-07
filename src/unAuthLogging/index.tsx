import { Button, Card } from "antd";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const UnAuthLogging = () => {
  // 是否注册 默认不注册
  const [isRegister, setIsRegister] = useState<boolean>(false)
  return (
    <>
      <Card>
        {/* 根据是否注册 显示注册或者登录 */}
        {
          isRegister ? <Register /> : <Login />
        }
        {/* 切换注册 登录 */}
        <Button onClick={() => {setIsRegister(!isRegister)}}>
          切换到{isRegister ? '登录' : '注册'}
        </Button>
      </Card>
    </>
  )
}

export default UnAuthLogging;

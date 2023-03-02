import { Button, Card, Divider } from "antd";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Login from "./Login";
import Register from "./Register";
import logo from "../assets/logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
import { ErrorBox } from "../components/lib";

const UnAuthLogging = () => {
  // 是否注册 默认不注册
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>();
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        {/* 根据是否注册 显示注册或者登录 */}
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        <ErrorBox error={error} />
        {
          isRegister ? <Register onError={setError} /> : <Login onError={setError} />
        }
        <Divider />
        {/* 切换注册 登录 */}
        <Button type="link" onClick={() => {setIsRegister(!isRegister)}}>
          {isRegister ? '已经有账号了？直接登录' : '还没有账号？注册新账号'}
        </Button>
      </ShadowCard>
    </Container>
  )
}

const Header = styled.header`
  width: 100%;
  padding: 5rem 0; 
  background: url(${logo}) no-repeat center;
  background-size: 8rem;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  /* background-attachment CSS 属性决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动 */
  /* background-attachment: fixed 背景相对于视口固定 */
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  /* background-size 注意逗号分割设置多重背景 */
  background-size: calc(((100vw - 40rem)/2) - 3.2rem), calc(((100vw - 40rem)/2) - 3.2rem), cover; 
  background-image: url(${left}), url(${right});
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: .3rem;
  box-sizing: border-box;
  box-shadow: rgba(0,0,0,.1) 0 0 10px;
  text-align: center;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

export const LongButton = styled(Button)`
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;  
`

export default UnAuthLogging;

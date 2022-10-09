import React from "react";
import ProjectSys from "./screen/projectList";
import { useAuth } from "./context/authContext";
import { Button } from "antd";
import styled from "@emotion/styled";

// 已经登录 显示登出 和列表信息
const AuthLogging = () => {
  const { logout } = useAuth();

  return (
    <>
      <Container>
        <Header>
          <HeaderLeft>
            <h3>logo</h3>
            <h3>项目</h3>
            <h3>用户</h3>
          </HeaderLeft>
          <HeaderRight>
            <Button onClick={() => logout()}>登出</Button>
          </HeaderRight>
        </Header>
        <Main>
          <ProjectSys />
        </Main>
      </Container>
    </>
  );
};

// 使用grid flex布局的场景区分：
//   1. 维度：flex一维布局 grid二维布局
//   2. 从内容出发？布局出发：
//     内容出发(flex布局：展示的数据数量不固定，希望数据均匀分布在容器中，大小由内容自己决定
//     布局出发(gird布局：先规定网格，网格数量固定，再把内容往里面填充
// 使用grid布局
const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 6rem 1fr;
  grid-template-columns: 20rem 1fr;
  grid-template-areas: 
    "header header header"
    "main main main";
`
// grid-area 给子元素起名
// 网格面的属性设置唯一值，作为其名称，然后可通过 grid-template-areas 放置
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const HeaderRight = styled.div``
const Main = styled.main`grid-area: main;`

export default AuthLogging;

import React, { useState } from "react";
import ProjectSys from "./screen/projectList";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { useAuth } from "./context/authContext";
import { Menu, Dropdown, Button } from "antd";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { resetRoute, useDocumentTitle } from "./utils";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { ProjectScreen } from "./screen/projectScreen";
import ProjectModal from "./screen/projectList/projectModal";
import ProjectPopover from "./components/projectPopover";

// 已经登录 显示登出 和列表信息
const AuthLogging = () => {
  useDocumentTitle('项目列表', false);
  const [modalVisibal, setModalVisibal] = useState(false);

  return (
    <>
      <Container>
        <PageHeader setProjectModalOpen={setModalVisibal} />
        {/* <Button onClick={() => setModalVisibal(true)}>打开</Button> */}
        <Main>
          <Router>
            <Routes>
              <Route path="/projects" element={<ProjectSys setProjectModalOpen={setModalVisibal}/>}></Route>
              <Route path="/projects/:projectId/*" element={<ProjectScreen />}></Route>
              <Route path="*" element={<Navigate to="/projects" replace={true} />}></Route>
            </Routes>
          </Router>
        </Main>
        <ProjectModal open={modalVisibal} onClose={() => setModalVisibal(false)} />
      </Container>
    </>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return <Dropdown overlay={
    <Menu>
      <Menu.Item key={'logout'}>
        <Button type="link" onClick={logout}>登出</Button>
      </Menu.Item>
    </Menu>
  }>
    <Button type="link" onClick={e => e.preventDefault()}>
      Hi, {user?.name}
    </Button>
  </Dropdown>
}

const PageHeader = (props: {setProjectModalOpen: (visible: boolean) => void}) => {
  return (
    <Header spaceBetween>
      <HeaderLeft marginRight>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </ButtonNoPadding>
        <ProjectPopover setProjectModalOpen={props?.setProjectModalOpen} />
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

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
const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`grid-area: main;`

export default AuthLogging;

import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router";
import styled from "@emotion/styled";
import { Menu } from "antd";
import KanbanScreen from "../kanban";
import EpicScreen from "../epic";
import ScheduleScreen from "../schedule";

const useRouteType = () => {
  const type = useLocation().pathname.split('/');

  return type[type.length - 1];
}
export const ProjectScreen = () => {
  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key='kanban'>
            <Link to={'kanban'}>看板</Link>
          </Menu.Item>
          <Menu.Item key='epic'>
            <Link to={'epic'}>任务组</Link>
          </Menu.Item>
          <Menu.Item key='schedule'>
            <Link to={'schedule'}>项目进度</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="kanban" element={<KanbanScreen/>}></Route>
          <Route path="epic" element={<EpicScreen/>}></Route>
          <Route path="schedule" element={<ScheduleScreen/>}></Route>
          <Route path="*" element={<Navigate to="kanban" replace={true} />}></Route>
        </Routes>
      </Main>
    </Container>
  )
};

const Aside = styled.aside`
  display: flex;
  background-color: rgb(244, 245, 247);
`

const Main = styled.div`
  display: flex;
  overflow: hidden;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`
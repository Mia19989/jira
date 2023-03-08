
import React, { useState } from "react";
import { Button, List, Modal } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { ButtonNoPadding, Row, ScreenContainer } from "../../components/lib";
import { useDocumentTitle } from "../../utils";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useProjectInUrl } from "../kanban/utils";
import { useEpicQueryKey, useEpicSearchParams } from "./utils";
import { useTasks } from "../../utils/task";
import { CreateEpic } from "./CreateEpic";
import styled from "@emotion/styled";

const EpicScreen = () => {
  useDocumentTitle('任务组');
  const {data: epics} = useEpics(useEpicSearchParams());
  const {data: currentProjcet} = useProjectInUrl();
  const {data: tasks} = useTasks({projectId: currentProjcet?.id});
  const {mutate: deleteEpic} = useDeleteEpic(useEpicQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteModal = (id: number) => {
    Modal.confirm({
      title: '确定删除该任务组吗?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteEpic({id});
      },
      onCancel() {
        console.log('点击取消');
      },
    });
  }

  return <ScreenContainer>
    <Row spaceBetween={true}>
      <h1>{currentProjcet?.name}任务组</h1>
      <ButtonNoPadding type="link" onClick={() => setEpicCreateOpen(true)}>创建任务组</ButtonNoPadding>
    </Row>
    <Container>
      <List dataSource={epics} itemLayout={"vertical"} renderItem={epic => <List.Item>
        <List.Item.Meta title={<Row spaceBetween={true}>
            <span>{epic.name}</span>
            <Button type="link" onClick={() => confirmDeleteModal(epic.id)}>删除</Button>
          </Row>}
          description={<div>
            <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
            <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
          </div>} 
        />
        <div>
          {tasks?.filter(task => task.epicId === epic.id).map(task =>
            <Link key={task.id} to={`/projects/${currentProjcet?.id}/kanban?editingTaskId=${task.id}`}>
              {task.name}
            </Link>
          )}
        </div>
      </List.Item>} />
    </Container>
    <CreateEpic open={epicCreateOpen} onClose={() => setEpicCreateOpen(false)} />
  </ScreenContainer>
}

export default EpicScreen;

const Container = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

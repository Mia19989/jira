import React from "react";
import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import { useTaskTypes } from "../../utils/taskType";
import { useKanbanQueryKey, useTaskModal, useTaskSearchParams } from "./utils";
import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import styled from "@emotion/styled";
import { Card, Dropdown, MenuProps, Modal } from "antd";
import { CreateTask } from "./CreateTask";
import { Task } from "../../types/task";
import { Mark } from "../../components/Mark";
import { ButtonNoPadding, Row } from "../../components/lib";
import { useDeleteKanban } from "../../utils/kanban";
import { Drag, Drop, DropChild } from "../../components/DragAndDrop";

const TaskTypeIcon = ({id}: {id: number}) => {
  const {data: taskTypes} = useTaskTypes();
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) {
    return null;
  }
  return <img src={name === 'task' ? taskIcon : bugIcon} alt="task-icon" />
}

const TaskCard = ({task}: {task: Task}) => {
  const {startEdit} = useTaskModal();
  const {name: keyword} = useTaskSearchParams();

  return <Card onClick={() => startEdit(task.id)} style={{marginBottom: '0.5rem', cursor: 'pointer'}} key={task.id}>
    <div>
      <Mark name={task.name} keyword={keyword} />
    </div>
    <TaskTypeIcon id={task.typeId} />
  </Card>
}

export const KanbanColumn = React.forwardRef<HTMLDivElement, {kanban: Kanban}>(({kanban, ...props}: {kanban: Kanban}, ref) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);

  return <Container ref={ref} {...props}>
    <Row spaceBetween>
      <h3>{kanban.name}</h3>
      <More kanban={kanban} key={kanban.id} />
    </Row>
    <TasksContainer>
    <Drop type="ROW" direction="vertical" droppableId={String(kanban.id)}>
      <DropChild style={{minHeight: "5px"}}>
        {tasks?.map((task, taskIndex) => <Drag key={task.id} index={taskIndex} draggableId={"task" + task.id}>
          <div>
            <TaskCard key={task.id} task={task} />
          </div>
        </Drag>)}
      </DropChild>
    </Drop>
    <CreateTask kanbanId={kanban.id} />
    </TasksContainer>
  </Container>
})

const More = ({kanban}: {kanban: Kanban}) => {
  const {mutateAsync: deleteKanban} = useDeleteKanban(useKanbanQueryKey());
  
  const items: MenuProps['items'] = [
    {
      label: '删除',
      key: 'delete',
    }
  ];

  const confirmDeleteKanban = (id: number) => {
    Modal.confirm({
      title: '确定删除看板吗?',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        console.log('点击确定删除');
        deleteKanban({id});
      },
      onCancel() {
        console.log('点击取消');
      },
    });
  }

  return <Dropdown menu={{items, 
    onClick: (key) => {
      if (key.key === 'delete') {
        confirmDeleteKanban(kanban.id);
      }
    }}} 
    trigger={['click']}>
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 27rem;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  
  ::-webkit-scrollbar {
    display: none;
  }
`
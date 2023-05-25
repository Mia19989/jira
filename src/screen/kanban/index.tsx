import React, { useEffect, useState } from "react";
import { Tag } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "../../components/lib";
import { useDocumentTitle } from "../../utils";
import { useKanbans, useReorderKanban } from "../../utils/kanban";
import { useReorderTask, useTasks } from "../../utils/task";
import { CreateKanban } from "./CreateKanban";
import { KanbanColumn } from "./KanbanColumn";
import { SearchPanel } from "./SearchPanel";
import { useKanbanQueryKey, useKanbanSearchParams, useProjectInUrl, useTaskQueryKey, useTaskSearchParams } from "./utils";
import { TaskModal } from "./TaskModal";
import { Drag, Drop, DropChild } from "../../components/DragAndDrop";
import { useCallback } from "react";
import { useTaskTypes } from "../../utils/taskType";

const KanbanScreen = () => {
  useDocumentTitle('看板列表');

  const {data: kanbans, isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams());
  const {data: currentProjcet} = useProjectInUrl();
  const {isLoading: taskIsLoading, data: allTasks} = useTasks(useTaskSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;
  const onHandleDragEnd = useDragEnd();
  const [normalTasks, setNormalTasks] = useState(0); // 正常进度任务数量
  const [abnormalTasks, setAbnormalTasks] = useState(0); // 非正常进度任务数量
  const {data: taskTypes} = useTaskTypes();

  const getTaskType = (id: number) => {
    const name = taskTypes?.find(taskType => taskType.id === id)?.name
    if (!name) {
      return false;
    }
    return name === 'task' ? true : false;
  }

  useEffect(() => {
    if (allTasks && allTasks?.length > 0) {
      let count = 0;
      allTasks.map(item => {
        if (getTaskType(item?.typeId)) {
          count++;
        }
      })
      setNormalTasks(count);
      setAbnormalTasks(allTasks.length - count);
    }
  }, [allTasks, taskTypes]);

  return <DragDropContext onDragEnd={onHandleDragEnd}>
    <ScreenContainer>
      <h1>{currentProjcet?.name}看板</h1>
      <FlexContainer>
        <Tag icon={<ClockCircleOutlined />} color="processing" style={{marginRight: '20px', fontSize: '20px', lineHeight: '40px'}}>任务总数: {allTasks?.length}</Tag>
        <Tag icon={<CheckCircleOutlined />} color="success" style={{marginRight: '20px', fontSize: '20px', lineHeight: '40px'}}>正常进度: {normalTasks}</Tag>
        <Tag icon={<MinusCircleOutlined />} color="default" style={{marginRight: '20px', fontSize: '20px', lineHeight: '40px'}}>非正常进度: {abnormalTasks}</Tag>
      </FlexContainer>
      <SearchPanel />
      {
        isLoading ? <Spin size="large" /> :
        <ColumnContainer>
          <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
            <DropChild style={{display: 'flex'}}>
            {kanbans?.map((kanban, index) => <Drag key={kanban.id} draggableId={"kanban" + kanban.id} index={index}>
                <KanbanColumn kanban={kanban} key={kanban.id} />
              </Drag>)
            }
            </DropChild>
          </Drop>
          <CreateKanban />
        </ColumnContainer>
      }
      <TaskModal />
    </ScreenContainer>
  </DragDropContext>
}

export default KanbanScreen;

export const useDragEnd = () => {
  const {data: kanbans} = useKanbans(useKanbanSearchParams());
  const {data: tasks = []} = useTasks(useTaskSearchParams());
  const {mutate: reorderKanban} = useReorderKanban(useKanbanQueryKey());
  const {mutate: reorderTask} = useReorderTask(useTaskQueryKey());

  return useCallback(
    ({source, destination, type}: DropResult) => {
    if (!destination) {
      return;
    }

    if (type === "COLUMN") {
      const fromId = kanbans?.[source.index].id;
      const toId = kanbans?.[destination.index].id;
      const type = destination.index > source.index ? "after" : "before";

      if (!fromId || !toId || fromId === toId) {
        return;
      }
      reorderKanban({fromId, referenceId: toId, type})
    }

    if (type === "ROW") {
      const fromKanbanId = +source.droppableId;
      const toKanbanId = +destination.droppableId;
      if (fromKanbanId === toKanbanId) {
        return;
      }

      const fromTask = tasks?.filter(task => task.kanbanId === fromKanbanId)[source.index];
      const toTask = tasks?.filter(task => task.kanbanId === toKanbanId)[destination.index];
      if (fromTask?.id === toTask?.id) {
        return;
      }

      reorderTask({
        fromKanbanId,
        toKanbanId,
        fromId: fromTask?.id,
        referenceId: toTask?.id,
        type: fromKanbanId === toKanbanId && destination.index > source.index ? "after" : "before"
      })
    }
    }, [kanbans, tasks, reorderKanban, reorderTask]
  )
}

const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`
const FlexContainer = styled.div`
  display: flex;
  height: 40px;
  margin-bottom: 20px;
  line-height: 40px;
`

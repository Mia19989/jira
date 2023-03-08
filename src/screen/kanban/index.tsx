import React from "react";
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

const KanBan = () => {
  useDocumentTitle('看板列表');

  const {data: kanbans, isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams());
  const {data: currentProjcet} = useProjectInUrl();
  const {isLoading: taskIsLoading} = useTasks(useTaskSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;

  const onHandleDragEnd = useDragEnd();

  return <DragDropContext onDragEnd={onHandleDragEnd}>
    <ScreenContainer>
      <h1>{currentProjcet?.name}看板</h1>
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

export default KanBan;

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

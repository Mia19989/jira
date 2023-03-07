import React from "react";
import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "../../components/lib";
import { useDocumentTitle } from "../../utils";
import { useKanbans } from "../../utils/kanban";
import { useTasks } from "../../utils/task";
import { CreateKanban } from "./CreateKanban";
import { KanbanColumn } from "./KanbanColumn";
import { SearchPanel } from "./SearchPanel";
import { useKanbanSearchParams, useProjectInUrl, useTaskSearchParams } from "./utils";

const KanBan = () => {
  useDocumentTitle('看板列表');

  const {data: kanbans, isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams());
  const {data: currentProjcet} = useProjectInUrl();
  const {isLoading: taskIsLoading} = useTasks(useTaskSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading; 

  return <ScreenContainer>
    <h1>{currentProjcet?.name}看板</h1>
    <SearchPanel />
    {
      isLoading ? <Spin size="large" /> : <ColumnContainer>
      {
        kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id} />)
      }
      <CreateKanban />
    </ColumnContainer>
    }
  </ScreenContainer>
}

export default KanBan;

const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`

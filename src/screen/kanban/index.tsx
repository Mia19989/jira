import styled from "@emotion/styled";
import React from "react";
import { ScreenContainer } from "../../components/lib";
import { useDocumentTitle } from "../../utils";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./KanbanColumn";
import { SearchPanel } from "./SearchPanel";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";

const KanBan = () => {
  useDocumentTitle('看板列表');

  // useKanbanSearchParams()
  const {data: kanbans} = useKanbans();
  const {data: currentProjcet} = useProjectInUrl();

  return <ScreenContainer>
    <h1>{currentProjcet?.name}看板</h1>
    <SearchPanel />
    <ColumnContainer>
      {
        kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id} />)
      }
    </ColumnContainer>
  </ScreenContainer>
}

export default KanBan;

const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`

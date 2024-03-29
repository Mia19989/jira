
import React, { useState } from "react";
import { Input } from "antd";
import { useAddKanban } from "../../utils/kanban";
import { Container } from "./KanbanColumn";
import { useKanbanQueryKey, useProjectIdInUrl } from "./utils";

export const CreateKanban = () => {
  const [name, setName] = useState('');
  const projectId = useProjectIdInUrl();
  const {mutateAsync: addKanban} = useAddKanban(useKanbanQueryKey());

  const submit = async () => {
    await addKanban({name, projectId});
    setName('');
  }

  return <Container>
    <Input size="large" placeholder="新建看板名称" value={name}
      onChange={evt => setName(evt.target.value)}
      onPressEnter={submit} />
  </Container>
}
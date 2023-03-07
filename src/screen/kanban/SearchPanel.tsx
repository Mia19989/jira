import { Button, Input } from "antd";
import React from "react";
import { Row } from "../../components/lib";
import { TaskTypeSelect } from "../../components/TaskTypeSelect";
import { UserSelect } from "../../components/UserSelect";
import { useSetUrlSearchParam } from "../../utils/url";
import { useTaskSearchParams } from "./utils";

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  const reset = () => {
    setSearchParams({
      name: undefined,
      typeId: undefined,
      processorId: undefined,
      // tagId: undefined
    })
  }

  return <Row marginBottom={4} marginRight={true}>
    <Input style={{width: '20rem'}} placeholder="任务名" value={searchParams.name} 
      onChange={evt => setSearchParams({name: evt.target.value})} />
    <UserSelect value={searchParams.processorId} defaultOptionName="经办人" 
      onChange={(value: any) => setSearchParams({processorId: value})} />
    <TaskTypeSelect value={searchParams.typeId} defaultOptionName="类型"
      onChange={(value: any) => setSearchParams({typeId: value})} />
    <Button onClick={reset}>清除筛选器</Button>
  </Row>
}
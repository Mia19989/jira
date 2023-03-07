
import React, { useEffect, useState } from "react";
import { Card, Input } from "antd";
import { useAddTask } from "../../utils/task";
import { useProjectIdInUrl, useTaskQueryKey } from "./utils";

export const CreateTask = ({kanbanId}: {kanbanId: number}) => {
  const [name, setName] = useState('');
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false); // 输入框状态
  const {mutateAsync: addTask} = useAddTask(useTaskQueryKey());

  const submit = async () => {
    addTask({name, kanbanId, projectId});
    setInputMode(false);
    setName('');
  }

  /** 切换输入框状态 */
  const toggle = () => setInputMode(!inputMode);

  useEffect(() => {
    if (!inputMode) setName('');
  }, [inputMode])

  if (!inputMode) {
    return <div onClick={toggle} style={{cursor: 'pointer'}}>+创建事务</div>
  }

  return <Card>
    <Input size="large" value={name} placeholder="需要做些什么"
      onChange={evt => setName(evt.target.value)}
      onPressEnter={submit}
      onBlur={toggle}
      autoFocus={true} />
  </Card>
}
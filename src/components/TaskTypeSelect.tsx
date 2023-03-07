import React from "react";
import { useTaskTypes } from "../utils/taskType";
import { IdSelect } from "./id-select";

export const TaskTypeSelect = (props: any) => {
  const {data: taskTypes} = useTaskTypes();

  return (
    <IdSelect options={taskTypes || []} {...props}></IdSelect>
  )
};

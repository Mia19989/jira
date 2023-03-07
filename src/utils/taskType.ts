import { useQuery } from "react-query";
import { TaskType } from "../types/taskType";
import { useHttp } from "./http";

/** 所有的taskType信息 */
export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>(
    ['taskTypes'], 
    () => client('taskTypes')
  );
};
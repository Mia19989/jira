import { useQuery } from "react-query";
import { cleanObject } from ".";
import { Task } from "../types/task";
import { useHttp } from "./http";

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(
    ['tasks', params], 
    () => client('tasks', {data: cleanObject(params || {})})
  );
};
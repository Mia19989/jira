import { useQuery, useMutation, QueryKey } from "react-query";
import { cleanObject } from ".";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { useHttp } from "./http";
import { useAddConfig } from "./useOptimisticOptions";

export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(
    ['kanbans', params], 
    () => client('kanbans', {data: cleanObject(params || {})})
  );
};

/** 创建看板 */
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: Partial<Kanban>) => client(`kanbans`, {
    data: params,
    method: 'POST'
    }),
    useAddConfig(queryKey)
  )
};

/** 创建任务 */
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: Partial<Task>) => client(`tasks`, {
    data: params,
    method: 'POST'
    }),
    useAddConfig(queryKey)
  )
};
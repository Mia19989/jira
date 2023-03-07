import { useQuery, useMutation, QueryKey } from "react-query";
import { cleanObject } from ".";
import { Task } from "../types/task";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./useOptimisticOptions";

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(
    ['tasks', params], 
    () => client('tasks', {data: cleanObject(params || {})})
  );
};

/** 获取对应id的task信息 */
export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(
    ['project', {id}], 
    () => client(`tasks/${id}`),
    {
      enabled: Boolean(id)
    }
  )
}

/** 编辑task */
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: Partial<Task>) => client(`tasks/${params.id}`, {
    data: params,
    method: 'PATCH'
    }),
    useEditConfig(queryKey)
  )
};
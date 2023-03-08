import { useQuery, useMutation, QueryKey } from "react-query";
import { cleanObject } from ".";
import { Task } from "../types/task";
import { useHttp } from "./http";
import { SortProps } from "./kanban";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from "./useOptimisticOptions";

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

/** 删除task */
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(({id}: {id: number}) => client(`tasks/${id}`, {
    method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
};

/** 拖拽task */
export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: SortProps) => client('tasks/reorder', {
    data: params,
    method: 'POST'
  }),
  useReorderTaskConfig(queryKey))
}
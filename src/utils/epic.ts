import { useQuery, useMutation, QueryKey } from "react-query";
import { cleanObject } from ".";
import { Epic } from "../types/epic";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./useOptimisticOptions";

/** 获取所有任务组 */
export const useEpics = (params?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(
    ['epics', params], 
    () => client('epics', {data: cleanObject(params || {})})
  );
};

/** 创建任务组 */
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: Partial<Epic>) => client(`epics`, {
    data: params,
    method: 'POST'
    }),
    useAddConfig(queryKey)
  )
};

/** 删除任务组 */
export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(({id}: {id: number}) => client(`epics/${id}`, {
    method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
};

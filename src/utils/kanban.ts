import { useQuery, useMutation, QueryKey } from "react-query";
import { cleanObject } from ".";
import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./useOptimisticOptions";

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

/** 删除看板 */
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(({id}: {id: number}) => client(`kanbans/${id}`, {
    method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
};

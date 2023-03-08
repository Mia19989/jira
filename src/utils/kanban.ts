import { useQuery, useMutation, QueryKey } from "react-query";
import { cleanObject } from ".";
import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./useOptimisticOptions";

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

export interface SortProps {
  /** 将要重新排序的item */
  fromId: number;
  /** 目标item */
  type: "before" | "after"
  /** 放在目标item的前面or后面 */
  referenceId: number;
  fromKanbanId?: number;
  toKanbanId?: number;
};

/** 拖拽kanban */
export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: SortProps) => {
    console.log('---执行拖拽kanban');
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
}

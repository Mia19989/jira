import { useQuery } from "react-query";
import { cleanObject } from ".";
import { Kanban } from "../types/kanban";
import { useHttp } from "./http";

export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(
    ['kanbans', params], 
    () => client('kanbans', {data: cleanObject(params || {})})
  );
};
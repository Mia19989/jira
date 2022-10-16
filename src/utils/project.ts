import { useEffect } from "react";
import { cleanObject, useDebounce } from ".";
import { Project } from "../screen/projectList/ProjectTable";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();

  useEffect(() => {
    run(client('projects', {data: cleanObject(params || {})}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]) // params发生变化 list更新数据

  return result
}
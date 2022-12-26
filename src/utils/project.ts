import { useEffect } from "react";
import { cleanObject } from ".";
import { Project } from "../screen/projectList/ProjectTable";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();
  // fetchProjects是个回调函数 返回值是执行client 返回一个promise
  const fetchProjects = () => client('projects', {data: cleanObject(params || {})});

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]) // params发生变化 list更新数据

  return result;
};

// 编辑projects中的项目
export const useEditProject = () => {
  // 发送请求 修改project数据
  const { run, ...restResult } = useAsync();
  const client = useHttp();
  
  // 用封装的请求 对project进行修改
  const mutate = (params: Partial<Project>) => {
    const res = client(`projects/${params.id}`, {
      data: cleanObject(params || {}),
      method: 'PATCH'
      });
    return run(res);
  }

  return {
    mutate,
    ...restResult
  }
};

// 增加projects中的项目
export const useAddProject = () => {
  // 发送请求 修改project数据
  const { run, ...restResult } = useAsync();
  const client = useHttp();
  
  // 用封装的请求 对project进行修改
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }

  return {
    mutate,
    ...restResult
  };
};

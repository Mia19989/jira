import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { cleanObject } from ".";
import { Project } from "../screen/projectList/ProjectTable";
import { useHttp } from "./http";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  // const {run, ...result} = useAsync<Project[]>();
  // // fetchProjects是个回调函数 返回值是执行client 返回一个promise
  // const fetchProjects = useCallback(() => client('projects', {data: cleanObject(params || {})}), [client, params]);

  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects
  //   });
  // }, [params, run, fetchProjects]); // params发生变化 list更新数据

  // return result;

  // 使用useQuery替换useAsync
  return useQuery<Project[]>(
    ['projects', params], 
    () => client('projects', {data: cleanObject(params || {})})
  );
};

// 编辑projects中的项目
export const useEditProject = () => {
  // 发送请求 修改project数据
  const client = useHttp();
  // const { run, ...restResult } = useAsync();
  // // 用封装的请求 对project进行修改
  // const mutate = (params: Partial<Project>) => {
  //   const res = client(`projects/${params.id}`, {
  //     data: cleanObject(params || {}),
  //     method: 'PATCH'
  //     });
  //   return run(res);
  // }

  // return {
  //   mutate,
  //   ...restResult
  // }

  const queryClient = useQueryClient();
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    data: params,
    method: 'PATCH'
    }), {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
};

// 增加projects中的项目
export const useAddProject = () => {
  // 发送请求 修改project数据
  const client = useHttp();
  // const { run, ...restResult } = useAsync();

  // // 用封装的请求 对project进行修改
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, {
  //     data: params,
  //     method: 'POST'
  //   }))
  // }

  // return {
  //   mutate,
  //   ...restResult
  // };

  const queryClient = useQueryClient();
  return useMutation((params: Partial<Project>) => client(`projects`, {
    data: params,
    method: 'POST'
    }), {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
};

/** 获取对应id的project信息 */
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery(
    ['project', {id}], 
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id)
    }
  )
}

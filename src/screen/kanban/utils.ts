import { useMemo } from "react";
import { useLocation } from "react-router-dom"
import { useProject } from "../../utils/project";
import { useUrlQueryParams } from "../../utils/url";

/** 获取url上project的id */
export const useProjectIdInUrl = () => {
  const {pathname} = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];

  return Number(id);
}

/** 获取url上对应id的project */
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

/** 获取对应id的kanban的查找参数 */
export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()});
/** 获取对应kanban的请求参数 */
export const useKanbanQueryKey = () => ['kanbans', useKanbanSearchParams()];
/** 获取对应id的task的查找参数 */
export const useTaskSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(() =>({
    projectId,
    name: params.name || undefined,
    typeId: Number(params.typeId) || undefined,
    processorId: Number(params.processorId) || undefined,
    tagId: Number(params.tagId) || undefined
  }), [projectId, params]);
};
/** 获取对应task的请求参数 */
export const useTaskQueryKey = () => ['tasks', useTaskSearchParams()];

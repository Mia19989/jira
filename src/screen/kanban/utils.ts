import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom"
import { useDebounce } from "../../utils";
import { useProject } from "../../utils/project";
import { useTask } from "../../utils/task";
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
  const debouncedName = useDebounce(params.name, 200);
  return useMemo(() =>({
    projectId,
    name: debouncedName,
    typeId: Number(params.typeId) || undefined,
    processorId: Number(params.processorId) || undefined,
    tagId: Number(params.tagId) || undefined
  }), [projectId, params, debouncedName]);
};
/** 获取对应task的请求参数 */
export const useTaskQueryKey = () => ['tasks', useTaskSearchParams()];

/** task弹窗相关状态 */
export const useTaskModal = () => {
  // 编辑task弹窗是否显示
  const [{editingTaskId}, setEditingTaskId] = useUrlQueryParams(['editingTaskId']);

  // 获取对应id的项目信息
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const close = useCallback(() => setEditingTaskId({editingTaskId: undefined}), [setEditingTaskId]);
  const startEdit = useCallback((id: number) => setEditingTaskId({editingTaskId: id}), [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    isLoading,
    close,
    startEdit
  }
};

import { useMemo } from "react";
import { useProject } from "../../utils/project";
import { useUrlQueryParams } from "../../utils/url";

/** 项目列表搜索参数 */
export const useProjectsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(['name', 'personId']);
  // params类型转化成number

  return [
    useMemo(() => ({...params, personId: Number(params.personId) || undefined}), [params]),
    setParams
  ] as const;
};

/** 弹窗相关状态 */
export const useProjectModal = () => {
  // 弹窗是否显示
  const [{projectModalCreate}, setProjectModalCreate] = useUrlQueryParams(['projectModalCreate']);

  // 代表编辑项目modal
  const [{editingProjectId}, setEditingProjectId] = useUrlQueryParams(['editingProjectId']);

  // 获取对应id的项目信息
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId));

  const open = () => setProjectModalCreate({projectModalCreate: true});
  const closeCreate = () => setProjectModalCreate({projectModalCreate: undefined});
  const closeEdit = () => setEditingProjectId({editingProjectId: undefined});
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id});

  return {
    projectModalOpen: projectModalCreate === 'true' || Boolean(editingProjectId),
    editingProject,
    isLoading,
    open,
    closeCreate,
    closeEdit,
    startEdit
  }
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ['projects', params];
};

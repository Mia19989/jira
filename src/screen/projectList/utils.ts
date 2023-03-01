import { useMemo } from "react";
import { useUrlQueryParams } from "../../utils/url";

// 项目列表搜索参数
export const useProjectsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(['name', 'personId']);
  // params类型转化成number

  return [
    useMemo(() => ({...params, personId: Number(params.personId) || undefined}), [params]),
    setParams
  ] as const;
};

/** 弹窗显示的状态 */
export const useProjectModal = () => {
  const [{projectModalCreate}, setProjectModalCreate] = useUrlQueryParams(['projectModalCreate']);

  const open = () => setProjectModalCreate({projectModalCreate: true});
  const close = () => setProjectModalCreate({projectModalCreate: false});

  return {
    projectModalOpen: projectModalCreate === 'true',
    open,
    close
  }
};

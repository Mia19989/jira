import { useProjectIdInUrl } from "../kanban/utils";

/** 获取对应id的epic的查找参数 */
export const useEpicSearchParams = () => ({projectId: useProjectIdInUrl()});
/** 获取对应epic的请求参数 */
export const useEpicQueryKey = () => ['epics', useEpicSearchParams()];
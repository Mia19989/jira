import { QueryKey, useQueryClient } from "react-query";

/** 生成optimistic update 相关的配置 */
export const useConfig = (queryKey: QueryKey , callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      // 从本地项目数据中找到对应的项目
      const previousItems = queryClient.getQueryData(queryKey);
      // 修改数据
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        // 乐观更新 增 删 改 查
        // return old?.map((project) => project.id === target.id ? {...project, ...target} : project) || []
        return callback(target, old);
      })
      return {previousItems}
    },
    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(queryKey, context.previousItems);
    }
  }
}

/** optimistic update 删除 */
export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.filter(item => item?.id !== target.id) || []);
/** optimistic update 编辑 */
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.map(item => item?.id === target.id ? {...item, ...target} : item) || []);
/** optimistic update 新增 */
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.length ? [...old, target] : []);

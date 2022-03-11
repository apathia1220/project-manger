import { useMemo } from "react";
import { useQuery } from "react-query";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";
import { useAsync } from "utils/use-async";
import { useHttp } from '../../utils/http'
import { Project } from "./list";

// 项目列表搜索的参数
export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"]);

    return [
        useMemo(
            () => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]
        ),
        setParam,
    ] as const;
};

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams()
  return ['projects', params]
}
// export const useEditProject = () => {
//     const client = useHttp();
//     const { run, ...res } = useAsync();
//     const mutate = (params: Partial<Project>) => {
//         return run(
//             client(`projects/${params.id}`, {
//                 data: params,
//                 method: "PATCH",
//             })
//         );
//     };

//     return {
//         mutate,
//         ...res
//     };
// }

// export const useAddProject = () => {
//     const client = useHttp();
//     const { run, ...res } = useAsync();
//     const mutate = (params: Partial<Project>) => {
//         return run(
//             client(`projects/${params.id}`, {
//                 data: params,
//                 method: "POST",
//             })
//         );
//     };

//     return {
//         mutate,
//         ...res
//     };
// }

/**
 * 通过id来对特定的任务发送网络请求
 * 返回对应id的数据
 * @param id 
 * @returns 
 */
export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(
      ["project", { id }],
      () => client(`projects/${id}`,{}),
      {
        enabled: Boolean(id),
      }
    );
  };
  

export const useProjectModal = () => {
    // 通过传入指定的key值，从url地址中获取参数，来判断处于什么状态
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
      "projectCreate",
    ]);
  
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
      "editingProjectId",
    ]);
    
    // 传入正在编辑的项目id
    const { data: editingProject, isLoading } = useProject(
      Number(editingProjectId)
    );
  
    const setUrlParams = useSetUrlSearchParam();
  
    const open = () => setProjectCreate({ projectCreate: true });
    const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
    const startEdit = (id: number) =>
      setEditingProjectId({ editingProjectId: id });
  
    return {
      modalOpen: projectCreate === "true" || Boolean(editingProjectId),
      open,
      close,
      startEdit,
      editingProject,
      isLoading,
    };
  };
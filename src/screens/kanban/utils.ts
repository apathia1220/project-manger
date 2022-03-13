import { useCallback, useMemo } from "react"
import { useLocation } from "react-router"
import { useProject } from "screens/project-list/util"
import { useDebounce } from "utils"
import { useTask } from "utils/task"
import { useUrlQueryParam } from "utils/url"

// 返回url中所带的projectId
export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    const id = pathname.match(/project\/(\d+)/)?.[1]

    return Number(id)
}

// 返回对应projectId的project信息
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

// 将当前projectId作为参数，加入到请求kanban的请求参数中
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => {
    const projectId = useProjectIdInUrl();
    const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
    // const debouncedName = useDebounce(param.name, 200);

    return useMemo(
        () => ({
            projectId,
            name: param.name,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,
        }),
        [projectId, param]
    );
};

// 将当前projectId作为参数，加入到请求task的请求参数中
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useTasksModal = () => {
    //获取当前的taskId
    const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
    const { data: editingTask, isLoading } = useTask(Number(editingTaskId))

    const startEdit = useCallback((id: number) => {
        setEditingTaskId({editingTaskId:id})
    }, [setEditingTaskId])

    const close = useCallback(() => {
        setEditingTaskId({editingTaskId:''})
    }, [setEditingTaskId])

    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }
}

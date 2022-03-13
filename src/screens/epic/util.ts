import { useProjectIdInUrl } from "screens/kanban/utils"

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() })

// 将当前projectId作为参数，加入到请求kanban的请求参数中
export const useEpicsQueryKey = () => ['epic', useEpicSearchParams()]
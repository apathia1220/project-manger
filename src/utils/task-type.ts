import { useQuery } from "react-query"
import { TaskType } from "type/task"
import { useHttp } from "./http"

export const useTaskTypes = () => {
    // 获取所有的tasktype信息
    const client = useHttp()

    return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes", {}));
}
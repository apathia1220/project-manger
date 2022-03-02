import { useEffect } from "react"
import { Project } from "screens/project-list/list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?: Partial<Project>) => {
    /**
     * 处理用户搜索的项目名称
     * @param:表示用户输入的搜索内容
     * 
     */
    const {run, ...result} = useAsync<Project[]>()
    // result:包含数据data
    const client = useHttp()

    useEffect(() => {
        /**
         * cleanObject:处理用户的输入
         * client:向服务器发送http请求，请求的地址是第一个参数，请求的第二个参数是经过处理的用户输入的参数，返回值是从服务器请求回来的数据
         * run:处理异步操作，client返回的是一个promise，并且返回的数据也会存在useAsync中的data里面，可以通过hook在任意组件读取
         */
        run(client('projects', {data:cleanObject(param || {})}))
        // 通过将键盘输入的值作为参数传递给服务器，服务器返回与参数相匹配的数据，存入List中
        // List中的项目已经经过param筛选后的
        //users中人的id跟project中的personId是相关联的
      }, [param])
      return result
}
import React, {useState, useEffect} from 'react'
import {List} from './list'
import {SearchPanel} from './search-panel'
import {cleanObject, useMount, useDebounce} from 'utils'
import qs from 'qs'
import { useHttp } from 'utils/http'


const api = process.env.REACT_APP_API_URL

export const ProjectListScreen:React.FC =  () => {
    // 人员信息
    const [users, setUsers] = useState([])
    // 键盘输入的信息
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    // 显示的列表信息
    const [list, setList] = useState([])
    // 过滤后的键盘输入数据
    const debounceParam = useDebounce(param, 200)
    const client = useHttp()

  useEffect(() => {
    client('projects', {data:cleanObject(debounceParam)}).then(setList)
    // 通过将键盘输入的值作为参数传递给服务器，服务器返回与参数相匹配的数据，存入List中
    // List中的项目已经经过param筛选后的
    //users中人的id跟project中的personId是相关联的
  }, [debounceParam])

  useMount(() => {
    client('users', {}).then(setUsers)
  })

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam}/>
            <List list={list} users={users}/>
        </div>
    )
}

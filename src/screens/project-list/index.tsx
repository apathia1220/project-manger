import React, {useState, useEffect} from 'react'
import {List} from './list'
import {SearchPanel} from './search-panel'
import {cleanObject, useMount, useDebounce} from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'


export const ProjectListScreen:React.FC =  () => {
    // 键盘输入的信息
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    
    // debounceParam:经过防抖hook处理后的用户的输入参数
    const debounceParam = useDebounce(param, 200)
    const {isLoading, error, data:list} = useProjects(debounceParam)
    const {data: users} = useUsers()

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users || []} param={param} setParam={setParam}/>
                      {
                      error 
                        ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> 
                         : null
                        }
            <List dataSource={list || []} users={users || []}/>
        </Container>
    )
}



const Container = styled.div`
padding: 3.2rem;
`
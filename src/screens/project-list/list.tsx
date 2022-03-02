import styled from '@emotion/styled'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import {User} from './search-panel'

export interface Project {
    id: string,
    name: string,
    personId: string,
    pin: boolean,
    organization: string,
    created:number
  }
  interface ListProps extends TableProps<Project>{
      /**
       * TableProps是antd中定义的Table的所有的属性的类型
       */
    users: User[]
  }

export const List=  ({ users, ...props} :ListProps) => {
    /**
     * 所有传入的props出了users以外 
     * 所有的跟Table中默认属性相同的都存在props中 
     * 可以结构出来
     */
    return <Table pagination={false} columns={ [
        {
            title:'名称',
            dataIndex:'name',
            sorter:(a,b) => a.name.localeCompare(b.name),
        },
        {
            title:'部门',
            dataIndex:'organization'
        },
        {
            title:'负责人',
            render(value,project) {
                return <span>
                    {users.find(user => user.id === project.personId)?.name || '未知'}
                </span>
            }
        },{
            title:'创建时间',
            render(value,project) {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD'): '无'}
                </span>
            }
        }
    ]} 
    {...props}
    />
   
}


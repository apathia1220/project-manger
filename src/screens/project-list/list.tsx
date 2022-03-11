import styled from '@emotion/styled'
import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { User } from './search-panel'
import { Link } from 'react-router-dom'
import { Project } from 'screens/project'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject } from '../../utils/project'
import { ButtonNoPadding } from 'components/lib'
import { useDispatch } from 'react-redux'
import { projectListActions } from './project-list.slice'
import { useProjectModal, useProjectQueryKey } from './util'

export interface Project {
    id: number,
    name: string,
    personId: number,
    pin: boolean,
    organization: string,
    created: number
}
interface ListProps extends TableProps<Project> {
    /**
     * TableProps是antd中定义的Table的所有的属性的类型
     */
    users: User[],
}

export const List = ({ users, ...props }: ListProps) => {
    /**
     * 所有传入的props出了users以外 
     * 所有的跟Table中默认属性相同的都存在props中 
     * 可以结构出来
     */
    const queryKey = useProjectQueryKey()
    const {mutate}  = useEditProject(queryKey);
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
    // const dispatch = useDispatch()
    const { open, startEdit } = useProjectModal()
    const editProject = (id: number) => () => startEdit(id)
    const {mutate:deleteProject} = useDeleteProject(queryKey)
    const confirmDeleteProject = ({ id}:{id: number}) => {
      Modal.confirm({
        title: '确定删除这个项目？',
        content: '点击确定删除',
        okText: '确定',
        onOk() {
          deleteProject({id})
        }
        })
      }

    return <Table pagination={false} columns={[
        {
            title: <Pin checked={true} disabled={true} />,
            render(value, project) {
                return (
                    <Pin
                        checked={project.pin}
                        onCheckedChange={pinProject(project.id)}
                    />
                );
            },
        },
        {
            title: '名称',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
                return <Link to={'project/' + String(project.id)}>{project.name}</Link>
            }
        },
        {
            title: '部门',
            dataIndex: 'organization'
        },
        {
            title: '负责人',
            render(value, project) {
                return <span>
                    {users.find(user => user.id === project.personId)?.name || '未知'}
                </span>
            }
        }, {
            title: '创建时间',
            render(value, project) {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                </span>
            }
        },
        {
            render(value, project) {
                return <Dropdown overlay={<Menu>
                    <Menu.Item onClick={editProject(project.id)} key={'edit'}>
                        <ButtonNoPadding type='link' onClick={open}>编辑</ButtonNoPadding>
                    </Menu.Item>
                    <Menu.Item key={'delete'}>
                        <ButtonNoPadding type='link' onClick={() => confirmDeleteProject(project)}>删除</ButtonNoPadding>
                    </Menu.Item>
                </Menu>}>
                    <ButtonNoPadding type='link'>...</ButtonNoPadding>
                </Dropdown>
            }
        }
    ]}
        {...props}
    />

}


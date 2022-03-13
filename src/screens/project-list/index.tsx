import React, { useState, useEffect } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useMount, useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { Helmet } from 'react-helmet'
import { useUrlQueryParam } from 'utils/url'
import { useProjectModal, useProjectSearchParams } from './util'
import { ErrorBox, Row, ScreenContainer } from 'components/lib'
import { useDispatch } from 'react-redux'
import { projectListActions } from './project-list.slice'

export const ProjectListScreen = () => {
    // 键盘输入的信息
    const [param, setParam] = useProjectSearchParams()
    // const dispatch = useDispatch()

    // debounceParam:经过防抖hook处理后的用户的输入参数
    // const debounceParam = useDebounce(param, 200)
    const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
    const { open } = useProjectModal()
    const { data: users } = useUsers()
    // useDocumentTitle('项目列表', false)
    return (
        <ScreenContainer>
            <Row between={true}>
                <h1>项目列表</h1>
                <Button onClick={open}>创建项目</Button>
            </Row>

            <SearchPanel users={users || []} param={param} setParam={setParam} />
            <ErrorBox error={error} />
            <List dataSource={list || []} users={users || []} />
        </ScreenContainer>
    )
}

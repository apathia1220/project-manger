import styled from '@emotion/styled'
import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { Container, KanbanColumn } from './kanban-column'
import { useKanbanSearchParams, useProjectInUrl } from './utils'
import { SearchPanel } from "./search-panel";
import { useTasks } from 'utils/task'
import { ScreenContainer } from 'components/lib'
import { Spin } from 'antd'
import { CreateKanban } from './create-kanban'
import { TaskModal } from './task-modal'

export default function KanbanScreen() {
    useDocumentTitle('看板列表')
    const { data: currentProject } = useProjectInUrl()
    // 应该是请求对应id的project的看板和task 但是由于后端接口的数据缺失，为了更好的呈现效果，暂时请求所有的看板和task
    // const { data: kanbans } = useKanbans(useKanbanSearchParams())
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans();

    const { isLoading: taskIsLoading } = useTasks()
    const isLoading = taskIsLoading || kanbanIsLoading

    return (
        <ScreenContainer>
            <h1>{currentProject?.name}看板</h1>
            <SearchPanel />
            {
                isLoading ? <Spin size={'large'} /> : (
                    <ColumnsContainer>
                        {
                            kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id} />)
                        }
                        <CreateKanban />
                    </ColumnsContainer>
                )
            }
            <TaskModal/>
        </ScreenContainer>
    )
}

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
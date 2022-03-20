import styled from "@emotion/styled"
import { Button, Dropdown, Menu } from "antd"
import { ButtonNoPadding, Row } from "components/lib"
import { UserPopover } from "components/user-popover"
import { useAuth } from "context/auth-context"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route } from 'react-router'
import { HashRouter as Router } from 'react-router-dom'
import { Project } from "screens/project"
import { ProjectListScreen } from "screens/project-list"
import { projectListActions, selectProjectModalOpen } from "screens/project-list/project-list.slice"
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopover } from "screens/project-list/project-popover"
import { resetRoute } from "utils"
import { ReactComponent as SoftWareLogo } from './assets/software-logo.svg'

export default () => {
    return <Router>
        <Container>
            <HeaderPage />
            <Main>
                <Routes>
                    <Route path="/project" element={<ProjectListScreen />}></Route>
                    <Route path="/project/:projectId/*" element={<Project />} />
                    <Route path="*" element={<ProjectListScreen />} />
                </Routes>
            </Main>
            <ProjectModal />
        </Container>
    </Router>

}

const HeaderPage = () => {
    const { logout, user } = useAuth()

    return <Header between={true}>
        <HeaderLeft gap={true}>
            <ButtonNoPadding type="link" onClick={resetRoute}>
                <SoftWareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
            </ButtonNoPadding>
            <ProjectPopover />
            <UserPopover />
        </HeaderLeft>
        <HeaderRight>
            <Dropdown overlay={<Menu>
                <Menu.Item key={'logout'}>
                    <Button onClick={logout}>登出</Button>
                </Menu.Item>
            </Menu>}>
                <Button onClick={e => e.preventDefault()}> Hi,{user?.name}</Button>
            </Dropdown>
        </HeaderRight>
    </Header>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`

const Header = styled(Row)`
  padding:3.2rem;
  box-shadow: 0 0 5px 0 rgba(0 ,0,0, 0.1);
  z-index:1;
`

const HeaderRight = styled(Row)``

const HeaderLeft = styled(Row)``

const Main = styled.main`
  display: flex;
  overflow: hidden;
`

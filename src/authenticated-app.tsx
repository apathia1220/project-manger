import styled from "@emotion/styled"
import { Button, Dropdown, Menu } from "antd"
import { Row } from "components/lib"
import { useAuth } from "context/auth-context"
import React from "react"
import { ProjectListScreen } from "screens/project-list"
import {ReactComponent as SoftWareLogo} from './assets/software-logo.svg'

export const AuthenticatedApp = () => {
    const {logout,user} = useAuth()
    return <Container>
                <Header between={true}>
                    <HeaderLeft gap={true}>
                        <SoftWareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
                        <h2>项目</h2>
                        <h2>用户</h2>
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
                <Main>
                    <ProjectListScreen/>
                </Main>
            </Container>
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

const Main = styled.main``

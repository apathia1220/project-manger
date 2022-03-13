import React , {ReactNode, useState}from 'react'
// 引入authProvider中所有定义的方法 login register logout等
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import { useQueryClient } from 'react-query';

interface AuthForm {
    username: string,
    password: string
}

const bootstrapUser = async () => {
    /**
     * 检验本地服务器的Token信息，如果存在Token则在登录的时候将Token作为请求的参数传递给服务器作为服务器验证用户的依据
     */
    let user = null;
    const token = auth.getToken()
    if(token) {
        const data = await http('me', {token})
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<{
    // 定义组件value的值的类型
    user:User | null,
    register: (form:AuthForm) => Promise<void>,
    login: (form:AuthForm) => Promise<void>,
    logout: () => Promise<void>,
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: {children:ReactNode}) => {
    const { data: user, error, isLoading, isError, isIdle, run, setData: setUser } = useAsync<User | null>()
    const queryClient = useQueryClient()
    // 通过登录和注册操作将用户的信息通过setUser存储起来记录登录状态
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => {
        setUser(null)
        queryClient.clear()
    })

    useMount(() => {
        run(bootstrapUser())
    })
    if(isIdle || isLoading){
        return <FullPageLoading/>
    }
    if(isError){
        return <FullPageErrorFallback error={error}/>
    }

    return <AuthContext.Provider children={children} value={{user, login, register, logout}}/>
}

export const useAuth = () => {
    /**
     * 通过useContext可以将上面创建的context中的value的数据获取并且返回，通过调用hook可以在任意组件中获取用户的信息
     */
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须再AuthProvider中使用')
    }
    /**
     * 返回的信息包括Provider中的value里的值
     */
    return context
}
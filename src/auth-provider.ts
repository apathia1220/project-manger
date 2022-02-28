import { User } from "screens/project-list/search-panel"

const api = process.env.REACT_APP_API_URL
const localStorageKey = '__auth_provider_token__'

/**
 * 获取本地存储的用户Token
 */
export const getToken = ()=> window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}: {user:User}) => {
    /*
      将请求返回的用户Token存入到本地服务器中，并返回用户信息
    */
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = (data:{username:string, password:string}) =>{
    /**
     * 进行登录操作 将用户的信息发送给服务器，并且返回用户的信息，存入到
     */
    return fetch(`${api}/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(async response => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        }else{
            return Promise.reject(data)
        }
      })
}

export const register = (data:{username:string, password:string}) =>{
    return fetch(`${api}/register`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(async response => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        }else{
            return Promise.reject(data)
        }
      })
}


/**
 * 登出操作-----清除本地缓存中对应的用户的Token信息
 */
export const logout = async () => window.localStorage.removeItem(localStorageKey)
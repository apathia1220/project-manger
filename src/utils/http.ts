import * as qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'

const api = process.env.REACT_APP_API_URL
interface Config extends RequestInit {
    token ?: string,
    data?:object
}

export const http = async (endpoint: string, {data, token ,headers, ...customConfig}: Config) => {
    /**
     * endpoint:请求的页面，比如/login
     * 默认方法是GET
     * 当传入的customConfig中包含请求的method时会覆盖默认的方法
     */
    const config = {
        methods:'GET',
        headers:{
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig
    }

    if(config.methods?.toUpperCase() === 'GET') {
        // get请求的传参方式
        endpoint += `?${qs.stringify(data)}`
    }else{
        //非get方法传参时将参数存入body中
        config.body = JSON.stringify(data || {})
    }

    return window.fetch(`${api}/${endpoint}`,config)
      .then( async response => {
          if(response.status === 401) {
              auth.logout();
              window.location.reload()
              return Promise.reject({message:'请重新登录！'})
          }
          const data = await response.json()
          if(response.ok){
              return data
          }
           else {
              return Promise.reject(data)
          }
      })
}

export const useHttp = ()=>{
    const {user} = useAuth()
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token:user?.token})
}
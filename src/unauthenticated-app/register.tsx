import { useAuth } from 'context/auth-context'
import React, {FormEvent} from 'react'


export const RegisterScreen = () => {
    const {register, user} = useAuth()
    const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        // 默认是event.currentTarget.elements[0]当作element类型，这个类型上没有value属性
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        /**
         * 将键盘输入的用户信息通过login上传到服务器并且将服务器返回的Token存储到本地
         */
        register({username,password})
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id={"username"}/>
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id={"password"}/>
            </div>
            <button type={'submit'}>注册</button>
        </form>
    )
}
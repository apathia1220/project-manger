import React from "react"
import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"

export const UnauthenticatedApp = () => {
    const [isRgister, setIsRegister] = useState(false)
    return <div>
        {
            isRgister ? <RegisterScreen/> :<LoginScreen/>
        }
        <button onClick={()=> setIsRegister(!isRgister)}>切换到{isRgister ? '登录' : '注册'}</button>
    </div>
}
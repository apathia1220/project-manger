import { Button, Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import React from 'react'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'


export const LoginScreen = ({onError}:{ onError : (error:Error) => void}) => {
    const {login } = useAuth()
    const {run, isLoading} = useAsync()
    const handleSubmit = async (values:{username:string, password:string})=>{
        // 默认是event.currentTarget.elements[0]当作element类型，这个类型上没有value属性
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        /**
         * 将键盘输入的用户信息通过login上传到服务器并且将服务器返回的Token存储到本地
         */
        await run( login(values).catch( (e) => { onError(e) } ) )
        
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required:true, message:'请输入用户名'}]}>
                <Input placeholder={'用户名'} type='text' id={'username'}></Input>
            </Form.Item>
            <Form.Item name={'password'} rules={[{required:true, message:'请输入密码'}]}>
                <Input placeholder={'密码'} type='password' id={'password'}></Input>
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>登录</LongButton>
            </Form.Item>
        </Form>
    )
}
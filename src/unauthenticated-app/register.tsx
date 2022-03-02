import { Button, Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import React from 'react'
import { useAsync } from 'utils/use-async'


export const RegisterScreen = ({onError}:{ onError : (error:Error) => void}) => {
    const {register, user} = useAuth()
    const { run } = useAsync()
    const handleSubmit = async ({cpassword, ...values}:{username:string, password:string, cpassword: string})=>{
        // 默认是event.currentTarget.elements[0]当作element类型，这个类型上没有value属性
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        /**
         * 将键盘输入的用户信息通过login上传到服务器并且将服务器返回的Token存储到本地
         */
        if(cpassword !== values.password){
            onError(new Error('请确认两次输入的密码相同！'))
            return
        }
        await run( register(values).catch( (e) => { onError(e) } ) )
        
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required:true, message:'请输入用户名'}]}>
                <Input placeholder={'用户名'} type='text' id={'username'}/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{required:true, message:'请输入密码'}]}>
                <Input placeholder={'密码'} type='password' id={'password'}/>
            </Form.Item>
            <Form.Item name={'cpassword'} rules={[{required:true, message:'请确认密码'}]}>
                <Input placeholder={'确认密码'} type='password' id={'cpassword'}/>
            </Form.Item>
            <Form.Item>
                <Button type={'primary'} htmlType={'submit'}>注册</Button>
            </Form.Item>
        </Form>
    )
}
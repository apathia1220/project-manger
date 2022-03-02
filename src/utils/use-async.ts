import { useState } from "react"

interface State<D> {
    error:Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState:State<null> = {
    stat:'idle',
    data:null,
    error:null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initalState?:State<D>, initialConfig?:typeof defaultConfig) => {
    const config = { ...defaultConfig,...initialConfig}
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initalState
    })

    const setData = (data:D) => setState({
        data,
        stat:'success',
        error:null
    })

    const setError = (error:Error) => setState({
        error,
        data:null,
        stat:'error'
    })

    /**
     * 运行函数
     * 传入的参数为一个promise，并且promise的值的类型为D
     */
    const run = (promise:Promise<D>) => {
        /**
         * 传入的不是promise类型抛出错误
         */
        if(!promise || !promise.then){
            throw new Error('请传入Promise 类型数据')
        }
        setState({...state, stat:'loading'})
        return promise
        .then(data => {
            setData(data)
            return data
        })
        .catch(error => {
            setError(error)
            if(config.throwOnError){
                return new Promise(error)
            }else{
                return error
            }
        })
    }

    return {
        isLoading:state.stat === 'loading',
        isError:state.stat === 'error',
        isIdle:state.stat === 'idle',
        isSuccess:state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }

}
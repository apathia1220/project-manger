import { useState, useEffect} from 'react'

export const isFalsy = (value: unknown) => value === 0 ? false : !value

// 过滤出路径参数中为空的值
export const cleanObject = (object: any) => {
    const result = {...object}
    Object.keys(result).forEach( key => {
        const value = result[key]
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result
}

// 在组件初次渲染的时候执行的Hook
export const useMount = (callback: ()=> void) =>{
    useEffect(()=>{
        callback()
    },[])
}

// 清除抖动的Hook
export const useDebounce = <V> (value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      // 每次在value变化以后，设置一个定时器
      const timeout = setTimeout(() => setDebouncedValue(value), delay)
      // 每次在上一个useEffect处理完以后再运行
      return () => clearTimeout(timeout);
    }, [value, delay]);
  
    return debouncedValue;
  }

  export const useArray = <T>(initArray: T[]) => {
      const [value, setValue] = useState(initArray);
      return{
          value,
          setValue,
          // 增加的数组成员的类型应该跟初始化的数组的类型是一样的
          add: (item: T) => setValue([...value, item]),
          clear: () => setValue([]),
          removeIndex: (index: number) => {
              const copy = [...value]
              copy.splice(index, 1)
              setValue(copy)
          }
      }
  }
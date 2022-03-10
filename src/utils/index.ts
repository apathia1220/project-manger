import { useState, useEffect, useRef } from 'react'

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === 0 || value === null || value === ''

// 过滤出路径参数中为空的值
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}

// 在组件初次渲染的时候执行的Hook
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

// 清除抖动的Hook
export const useDebounce = <V>(value: V, delay?: number) => {
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
    return {
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

export const useDocumentTitle = (title: string, isKeepOnUnmount: boolean = true) => {
    // 页面刚刚加载时的标题，在index.html中设置的标题
    // 页面加载时：oldTitle === 旧title
    // 页面加载后： oldTitle === 新Title
    //   const oldTitle = document.title
    const oldTitle = useRef(document.title).current
    // useRef 在整个生命周期内返回的对象都不变
    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!isKeepOnUnmount) {
                // 如果不指定依赖，读到的就是旧title
                //判断在组件卸载时，需不需要保留现在标题，如果不保留就将标替设置为初始的标题
                document.title = oldTitle
            }
        }
    }, [isKeepOnUnmount, oldTitle])
}

export const resetRoute = () => {
    window.location.href = window.location.origin
}

// 判断当前页面组件状态，避免组件在被卸载后还有可以给已卸载的组件赋值
export const useMounteRef = () => {
    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })
    return mountedRef
}
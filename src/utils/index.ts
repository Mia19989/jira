import { useEffect, useRef, useState } from "react"

// 清除对象中的空值 null undefined
// 返回值 类型推断
// const isFalsy = (val: unknown) => val === 0 ? false : !val
const isVoid = (val: unknown) => 
  (val === null || val === undefined || val === 0);
export const cleanObject = (object: {[key: string]: unknown}) => {
  const res = {...object}
  // console.log('isFalsy')
  Object.keys(res).forEach(key => {
    if (isVoid(res[key])) {
      // console.log(res[key])
      delete res[key]
    }
  })
  return res
}

// 用泛型规范类型
export const useDebounce = <V>(value: V, delay?: number): any => {
  // value发生变化 -> debouncedValue改变
  // debouncedValue经过debounce处理的value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 有返回值的effect
    // 返回一个函数 清除上一个的timeout
    return () => {clearTimeout(timeout)}
  }, [value, delay])
  
  return debouncedValue;
};

export const useMount = (callback: () => void) => {
  // 忽略下一行eslint警告
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
}

// persons: {name: string, age: number}[]
// {value, clear, removeIndex, add} 
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)

  return {
    value,
    setValue,
    clear: () => {
      setValue([])
    },
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    },
    add: (item: T) => {
      setValue([...value, item])
    }
  }
}

// 设置页面title  参数keepOnUnmount 表示卸载时，是否显示oldTitle
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  // 使用useRef 利用useRef保存oldTitle useRef保存的对象是在整个组件生命周期持续存在
  const oldTitle = useRef(document.title).current;
  // 页面加载时 旧title
  // 页面刷新时 新title

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    if (!keepOnUnmount) { // false 不保持卸载时的title 使用oldTitle
      return function unMounted() {
        document.title = oldTitle;
      }
    }
  }, [keepOnUnmount, oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin; 

/** 
 * 组件是否挂载 - 解决刷新中途退出，列表数据设置的报错
 * 默认还没有被挂载/已经卸载false 反之true 
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    // 组件被卸载
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

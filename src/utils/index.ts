import { useEffect, useState } from "react"

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
  useEffect(callback, [])
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
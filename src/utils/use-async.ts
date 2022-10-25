import { useState } from "react";

interface State<D> {
  // 状态
  stat: 'idle' | 'loading' | 'error' | 'success';
  data: D;
  error: Error | null;
}

// 定义默认状态
const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

// 异步请求
// 泛型
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, ...initialConfig};
  // 设置开始状态
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState
  })


  // 更改数据 函数 
  const setData = (data: D) => {
    setState({
      data,
      stat: 'success',
      error: null
    })
  }

  // 发生错误
  const setError = (error: Error) => {
    setState({
      error,
      stat: 'error',
      data: null
    })
  }

  // 异步请求 
  const run = (promise: Promise<D>) => {
    // 不是promise请求
    if (!promise || !promise.then()) {
      throw new Error('请传入 promise 类型数据')
    }

    // 正在加载
    setState({
      ...state,
      stat: 'loading'
    })

    return promise
    .then(data => {
      setData(data);
      return data;
    })
    .catch(error => {
      // catch会内部'消化'error, 不会向外抛出
      setError(error)
      if (config.throwOnError) {
        return Promise.reject(error)
      }
      return error
    })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    setState,
    setError,
    setData,
    run,
    ...state
  }
}
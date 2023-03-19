import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from ".";

interface State<D> {
  // 状态
  stat: 'idle' | 'loading' | 'error' | 'success';
  data: D | null;
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  // 判断组件是否挂载
  return useCallback((...args: T[]) => mountedRef?.current ? dispatch(...args) : void 0, 
    [dispatch, mountedRef]);
}

// 异步请求
// 泛型
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, ...initialConfig};
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({...state, ...action}), {
    ...defaultInitialState,
    ...initialState
  } as State<D>);

  const safeDispatch = useSafeDispatch(dispatch);

  // useState保存retry
  const [retry, setRetry] = useState(() => () => {});

  // 更改数据 函数 
  const setData = useCallback((data: D) => {
    safeDispatch({
      data,
      stat: 'success',
      error: null
    })
  }, [safeDispatch]);

  // 发生错误
  const setError = useCallback((error: Error) => {
    safeDispatch({
      error,
      stat: 'error',
      data: null
    })
  }, [safeDispatch]);

  // 异步请求 
  const run = useCallback((promise: Promise<D>, retryConfig?: {retry: () => Promise<D>}) => {
    // 不是promise请求
    if (!promise || !promise.then()) {
      throw new Error('请传入 promise 类型数据')
    }

    // 重新跑一遍上次的run(oldPromise)
    setRetry(() => () => {
      console.log('set retry');
      if (retryConfig?.retry) {
        run(retryConfig?.retry(), retryConfig)
      }
    })

    // 正在加载
    safeDispatch({stat: 'loading'});

    return promise
    .then(data => {
      setData(data);
      console.log('run promise,', data);
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
  }, [config.throwOnError, setData, setError, safeDispatch]);

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    // dispatch,
    setError,
    setData,
    run,
    retry,
    ...state
  }
}
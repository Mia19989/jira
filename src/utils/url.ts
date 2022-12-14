import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from ".";
// 返回页面中指定键的参数值

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  return [
    useMemo(() => 
      keys.reduce((pre: { [key in K]: string }, key: K) => {
        return {...pre, [key]: searchParams.get(key) || ''}
      }, {} as { [key in K]: string }), [setSearchParams]),

      (params: Partial<{ [key in K]: unknown }>) => {
        const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit;
        return setSearchParams(o);
      }
  ] as const;
};

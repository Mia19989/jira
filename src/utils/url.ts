import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject, subset } from ".";

// 返回页面中指定键的参数值

// export const useUrlQueryParams = <K extends string>(keys: K[]) => {
//   const [ searchParams, setSearchParams ] = useSearchParams();

//   return [
//     useMemo(() => 
//       keys.reduce((pre: { [key in K]: string }, key: K) => {
//         return {...pre, [key]: searchParams.get(key) || ''}
//       }, {} as { [key in K]: string }), [setSearchParams]),

//       (params: Partial<{ [key in K]: unknown }>) => {
//         const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit;
//         return setSearchParams(o);
//       }
//   ] as const;
// };


/**
 * 返回页面url中，指定键的参数值
 */
 export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    console.log('---测试params', params);
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;

    console.log('---测试处理之后params', o);
    return setSearchParam(o);
  };
};
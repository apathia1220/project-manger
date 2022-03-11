import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils";

/**
 * 返回页面url中，指定键的参数值
 * 返回值[
 *   url中key的值
 *   设置url中的查询参数
 * ]
 */
 export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams();
    const setSearchParams = useSetUrlSearchParam();
  
    return [
      useMemo(
        () =>
          keys.reduce((prev, key) => {
            return { ...prev, [key]: searchParams.get(key) || "" };
          }, {} as { [key in K]: string }),
        [searchParams]
      ),
      (params: Partial<{ [key in K]: unknown }>) => setSearchParams(params),
    ] as const;
  };
  
  // 设置url中搜索的参数
  export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParams] = useSearchParams();
  
    return (params: { [key in string]: unknown }) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    };
  };
  
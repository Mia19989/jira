import { useEffect } from "react";
import { cleanObject } from ".";
import { User } from "../screen/projectList/SearchBar";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useUser = (params?: Partial<User>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<User[]>();

  useEffect(() => {
    run(client('users', {data: cleanObject(params || {})}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return result
}
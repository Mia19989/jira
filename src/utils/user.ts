import { useMutation, useQuery } from "react-query";
import { cleanObject } from ".";
import { User } from "../types/user";
import { useHttp } from "./http";

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(
    ['users', params], 
    () => client('users', {data: cleanObject(params || {})})
  );
};

/** 增加user */
export const useAddUser = () => {
  const client = useHttp();

  return useMutation((params: Partial<User>) => client(`users`, {
    data: params,
    method: 'POST'
    })
  )
};

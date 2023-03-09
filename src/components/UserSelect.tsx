import React from "react";
import { useUsers } from "../utils/user";
import { IdSelect } from "./id-select";

export const UserSelect = (props: any) => {
  const {data: user} = useUsers();

  return (
    <IdSelect options={user || []} {...props}></IdSelect>
  )
};

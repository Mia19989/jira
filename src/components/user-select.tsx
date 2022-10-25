import React from "react";
import { useUser } from "../utils/user";
import { IdSelect } from "./id-select";

export const UserSelect = (props: any) => {
  const {data: user} = useUser();

  return (
    <IdSelect options={user || []} {...props}></IdSelect>
  )
};

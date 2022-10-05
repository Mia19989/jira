import React, { ReactNode } from "react";
import { AuthProvider } from "./authContext";

export const AuthProviders = ({children}: {children: ReactNode}) => {
  return (
  // 需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context
  // 使用provider 读取context的值
    <AuthProvider>
      {children}
    </AuthProvider>
  )
};
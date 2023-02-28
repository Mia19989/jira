import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { AuthProvider } from "./authContext";

export const AppProviders = ({children}: {children: ReactNode}) => {
  return (
  // 需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context
  // 使用provider 读取context的值
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  )
};
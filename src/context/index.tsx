import React, { ReactNode } from "react";
import { AuthProvider } from "./authContext";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({children}: {children: ReactNode}) => {
  const queryClient = new QueryClient();

  return (
  // 需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context
  // 使用provider 读取context的值

    <QueryClientProvider client={queryClient}>
      <AuthProvider>    
        {children}
      </AuthProvider>
    </QueryClientProvider>
   
  )
};
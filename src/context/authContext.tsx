import React, { ReactNode, useState } from "react";
import * as auth from '../auth-provider';
import { FullPageError, FullPageLoading } from "../components/lib";
import { User } from "../screen/projectList/SearchBar";
import { useMount } from "../utils";
import { http } from "../utils/http";
import { useAsync } from "../utils/useAsync";

interface ValParams {
  user: User | null;
  login: (params: UserParams) => Promise<any>;
  register: (params: UserParams) => any;
  logout: () => Promise<void>;
};

// 页面刷新 获取token信息 避免重新登录
// 通过token 获取user信息
const bootstrapUser = async () => {
  let user = null
  const token = auth.getLocalStorageItem()

  // token有值 获取user信息
  if (token) {
    const data = await http('me', {token})
    console.log('有token，请求的data', data)
    user = data.user
  }

  return user
}

const AuthContext = React.createContext<ValParams | undefined>(undefined);
// devtools里展示用 确定context要显示的内容
AuthContext.displayName = 'AuthContext';

interface UserParams {
  username: string;
  password: string;
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  // const [user, setUser] = useState<User | null>(null);
  const {isLoading, isIdle, isError, error, run, data: user, setData: setUser} = useAsync<User | null>()

  const login = (params: UserParams) => auth.login(params).then((user) => {setUser(user);});

  const register = (params: UserParams) => auth.register(params).then(user => {setUser(user)});

  const logout = () => auth.logout().then(() => {setUser(null)});

  useMount(() => {
    run(bootstrapUser())
  })

  // 查看是否登录过的 加载页面
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  // 错误页面 提示错误
  if (isError) {
    return <FullPageError error={error}/>
  }

// 这里为什么导出一个组件  噢噢 导出provider
  return <AuthContext.Provider children={children} value={{user, login, register, logout}}></AuthContext.Provider>
};

// 自定义hook
export const useAuth = () => {
  // useContext接收一个context对象 并返回当前context的当前值
  // 使用hook订阅context中的变化 
  // useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。
  // 仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('必须在AuthProvider中使用context')
  }

  return context;
};

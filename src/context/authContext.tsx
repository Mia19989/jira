import React, { ReactNode, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as auth from '../auth-provider';
import { FullPageError, FullPageLoading } from "../components/lib";
import { User } from "../screen/projectList/SearchBar";
import { useMount } from "../utils";
import { http } from "../utils/http";
import { useAsync } from "../utils/useAsync";
import * as authStore from "../store/auth.slice";

interface ValParams {
  user: User | null;
  login: (params: UserParams) => Promise<any>;
  register: (params: UserParams) => any;
  logout: () => Promise<void>;
};

export interface UserParams {
  username: string;
  password: string;
};

// 页面刷新 获取token信息 避免重新登录
// 通过token 获取user信息
export const bootstrapUser = async () => {
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

// const AuthContext = React.createContext<ValParams | undefined>(undefined);
// // devtools里展示用 确定context要显示的内容
// AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({children}: {children: ReactNode}) => {
  // const [user, setUser] = useState<User | null>(null);
  const {isLoading, isIdle, isError, error, run, data: user, setData: setUser} = useAsync<User | null>()

  // const login = (params: UserParams) => auth.login(params).then((user) => {setUser(user);});
  // const register = (params: UserParams) => auth.register(params).then(user => {setUser(user)});
  // const logout = () => auth.logout().then(() => {setUser(null)});

  const dispatch: (...args: any) => Promise<User> = useDispatch();

  useMount(() => {
    // run(bootstrapUser())
    run(dispatch(authStore.bootstrap()));
  })

  // 查看是否登录过的 加载页面
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  // 错误页面 提示错误
  if (isError) {
    return <FullPageError error={error}/>
  }

  return <>
    {children}
  </>
};

// 自定义hook
export const useAuth = () => {
  // useContext接收一个context对象 并返回当前context的当前值
  // 使用hook订阅context中的变化 
  // useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。
  // 仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context
  // const context = React.useContext(AuthContext);
  // if (!context) {
  //   throw new Error('必须在AuthProvider中使用context')
  // }

  const dispatch: (...args: any) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback((form: UserParams) => dispatch(authStore.login(form)), [dispatch]);
  const register = useCallback((form: UserParams) => dispatch(authStore.register(form)), [dispatch]);
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout
  };
};

// 操控jwt token
import { User } from "./types/user";
const key = '__auth_token__';
const usersKey = "__jira_users__";
const identity = "__auth_identity__";
const apiUrl = process.env.REACT_APP_API_URL;

// 为user设置token
export const setLocalStorageItem = ({user}: {user: User}) => {
  window.localStorage.setItem(key, user.token || '');
  console.log('user', user);
  return user
}

// 获取token
export const getLocalStorageItem = () => window.localStorage.getItem(key);

/** 用户权限localStorage存储 */
const setAuthIdentity = (value?: string) => {
  window.localStorage.setItem(identity, value || 'developer');
}

/** 获取用户权限 */
export const getAuthIdentity = () => window.localStorage.getItem(identity);

/** 添加注册人员的权限 */
const addPermission = async (id: number, identity?: string) => {
  const users = JSON.parse(window.localStorage.getItem(usersKey) || "{}");
  users[id] = {...users[id], identity: identity || "developer"};
  window.localStorage.setItem(usersKey, JSON.stringify(users));
  console.log('--permission修改后', users);
}

// 注册请求
export const register = (data: {username: string; password: string; identity?: string }) => {
  console.log('--regester', data);
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async res => {
    if (res.ok) {
      const {user} = await res.json();
      console.log('---注册成功', user);
      addPermission(user.id, data?.identity);
      setAuthIdentity(data?.identity);
      return setLocalStorageItem({user});
    } else {
      return Promise.reject(await res.json());
    }
  })
}

// 登录请求
export const login = (data: {username: string; password: string}) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (res) => { 
    if (res.ok) {
      const user = await res.json();
      console.log('---登录成功', user);
      const { identity } = user?.user;
      setAuthIdentity(identity);
      return setLocalStorageItem(user);
    } else {
      // 返回错误信息
      return Promise.reject(await res.json())
    }
  })
}

export const logout = async () => window.localStorage.removeItem(key)

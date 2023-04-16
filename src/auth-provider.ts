// 操控jwt token
import { User } from "./types/user";
const key = '__auth_token__'

const apiUrl = process.env.REACT_APP_API_URL;

// 获取token
export const getLocalStorageItem = () => window.localStorage.getItem(key)

// 为user设置token
export const setLocalStorageItem = ({user}: {user: User}) => {
  window.localStorage.setItem(key, user.token || '')
  console.log('user', user);
  return user
}

// 注册请求
export const register = (data: {username: string; password: string}) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async res => {
    if (res.ok) {
      const user = await res.json();
      console.log('---注册成功json token', user);
      return setLocalStorageItem(user);
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
      console.log('---登录成功json token', user);
      return setLocalStorageItem(user);
    } else {
      // 返回错误信息
      return Promise.reject(await res.json())
    }
  })
}

export const logout = async () => window.localStorage.removeItem(key)

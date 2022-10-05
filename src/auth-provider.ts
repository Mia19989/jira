// 操控jwt token
import { User } from "./screen/projectList/SearchBar";
const key = '__auth_token__'

const apiUrl = process.env.REACT_APP_API_URL;

// 获取token
export const getLocalStorageItem = () => window.localStorage.getItem(key)

// 为user设置token
export const setLocalStorageItem = ({user}: {user: User}) => {
  window.localStorage.setItem(key, user.token)
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
      console.log(res.json())
      // 注册 设置token
      return setLocalStorageItem(await res.json())
    } else {
      return Promise.reject(data);
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
      // 注册 设置token 返回一个user
      const data1: User = setLocalStorageItem(await res.json());
      console.log('data1', data1)
      return data1;
    } else {
      return Promise.reject(data)
    }
  })
}

export const logout = async () => window.localStorage.removeItem(key)

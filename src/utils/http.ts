import qs from 'qs';
import * as auth from '../auth-provider';
import { useAuth } from '../context/authContext';
const apiUrl = process.env.REACT_APP_API_URL;

// 封装http请求 使请求中携带token 否则会登陆失败
interface Config extends RequestInit {
  data?: object;
  token?: string;
};

export const http = (endpoint: string, {data, token, headers, ...otherConfig}: Config = {}) => {
  // header携带token
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...otherConfig
  }

  // 判断是get post请求
  if ( config.method === 'GET') {
    // 请求数据在 url中
    endpoint += `?${qs.stringify(data)}`
  } else { // PATCH
    // post请求 请求数据在body中
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async res => {
    if (res.status === 401) {
      // 没有token 登录失败
      console.log('登陆失败，没有token', res)
      // 注销后 重新加载
      auth.logout();
      window.location.reload();
      return Promise.reject({msg: '请重新登录'});
    }
    const data = await res.json();
    if (res.ok) {
      return data
    } else {
      return Promise.reject(data);
    }
  })
};

// 自动携带token的hook
export const useHttp = () => {
  const {user} = useAuth();
  // utility type中的类型 都是用type 规定
  // Parameters是ts中utility type的一种; utility type在泛型中传入类型 对类型做一定的操作
  // Partial Omit等是常用的utility type; Omit对类型中的某些删除掉; Partial把类型中的某些变可选类型
  // 此处typeof 是ts中静态的typeof 提取typeof后面变量的类型
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token});
}

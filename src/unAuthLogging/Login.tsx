import React, { FormEvent } from "react";
import { useAuth } from "../context/authContext";

// 登录页面
const Login = () => {
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    login({username, password})
  }

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">登录</button>
      </form>
    </>
  )
};

export default Login;

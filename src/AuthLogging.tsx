import React from "react";
import ProjectSys from "./screen/projectList";
import { useAuth } from "./context/authContext";
import { Button } from "antd";

// 已经登录 显示登出 和列表信息
const AuthLogging = () => {
  const { logout } = useAuth();

  return (
    <>
      <Button onClick={() => logout}>登出</Button>
      <ProjectSys />
    </>
  );
};

export default AuthLogging;

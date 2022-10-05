import React from 'react';
import { Button } from 'antd';
import AuthLogging from './AuthLogging';
import { useAuth } from './context/authContext';
import UnAuthLogging from './unAuthLogging';
// import ProjectSys from '../src/screen/projectList';
// import { TsReactTest } from '../src/screen/projectList/TryUseArray'
// import Login from './screen/login';

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="App">
      {/* <ProjectSys /> */}
      {/* <TsReactTest /> */}
      {/* <Login /> */}

      {/* 显示登录页面 或者 注册 */}
      {
        user?.token 
        ? (
          <div>
            <Button onClick={() => logout()}>登出</Button>
            <AuthLogging />
          </div>
          ) 
        : <UnAuthLogging />
      }
    </div>
  );
}

export default App;

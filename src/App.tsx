import React from 'react';
import AuthLogging from './AuthLogging';
import UnAuthLogging from './unAuthLogging';
import { useAuth } from './context/authContext';
import { Button } from 'antd';
import Index from './form';
// import ProjectSys from '../src/screen/projectList';
// import { TsReactTest } from '../src/screen/projectList/TryUseArray'
// import Login from './screen/login';

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="App">
      {/* 显示登录页面 或者 注册 */}
      {/* {
        user?.token 
        ? (
          <div>
            <Button onClick={() => logout()}>登出</Button>
            <AuthLogging />
          </div>
          ) 
        : <UnAuthLogging />
      } */}

      <Index></Index>
    </div>
  );
}

export default App;

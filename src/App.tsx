import React from 'react';
import AuthLogging from './AuthLogging';
import UnAuthLogging from './unAuthLogging';
import { useAuth } from './context/authContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {/* 显示登录页面 或者 注册 */}
      {
        user?.token 
        ? <AuthLogging /> : <UnAuthLogging />
      }
    </div>
  );
}

export default App;

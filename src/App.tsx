import React from 'react';
import AuthLogging from './AuthLogging';
import UnAuthLogging from './unAuthLogging';
import { useAuth } from './context/authContext';
import { FullPageError } from './components/lib';
import { ErrorBoundary } from './components/error-boundary';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {/* 显示登录页面 或者 注册 */}
      <ErrorBoundary fullbackRender={FullPageError}>
        {
          user?.token 
          ? <AuthLogging /> : <UnAuthLogging />
        }
      </ErrorBoundary>
    </div>
  );
}

export default App;

import { AuthenticatedApp } from 'authenticated-app';
import ErrorBoundary from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app';
import './App.css';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      {
        /**
         * 根据用户是否登录来判断是进入登录页面还是登录后的页面
         */
        user ? <AuthenticatedApp/> :<UnauthenticatedApp/>
      }
      </ErrorBoundary>
    </div>
  );
}

export default App;

import ErrorBoundary from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
import { useAuth } from 'context/auth-context';
import React from 'react';
import './App.css';

const AuthenticatedApp = React.lazy(() => import("authenticated-app"))
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app"))

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={FullPageErrorFallback}>
          {
            /**
             * 根据用户是否登录来判断是进入登录页面还是登录后的页面
             */
            user ? <AuthenticatedApp /> : <UnauthenticatedApp />
          }
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

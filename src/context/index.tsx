import { ReactNode } from "react";

import React from 'react'
import {AuthProvider} from './auth-context'
import { Provider } from "react-redux";
import { store } from "store";
import { QueryClient, QueryClientProvider } from "react-query";
//提供一个contextProvider组件

/**
 * 全局的Appcontext
 */
export const AppProviders = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
        </Provider>
    )
}
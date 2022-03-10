import { ReactNode } from "react";

import React from 'react'
import {AuthProvider} from './auth-context'
import { Provider } from "react-redux";
import { store } from "store";
//提供一个contextProvider组件

/**
 * 全局的Appcontext
 */
export const AppProviders = ({children}:{children:ReactNode}) => {
    return (
        // <QueryClientProvider>
        <Provider store={store}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </Provider>
        // </QueryClientProvider>
    )
}
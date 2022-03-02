import { ReactNode } from "react";

import React from 'react'
import {AuthProvider} from './auth-context'
//提供一个contextProvider组件

/**
 * 全局的Appcontext
 */
export const AppProviders = ({children}:{children:ReactNode}) => {
    return (
        // <QueryClientProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        // </QueryClientProvider>
    )
}
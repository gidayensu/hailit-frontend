'use client'

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./store";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
export default function Providers ({children, }: {
    children: React.ReactNode;
}) {

    return (
        <Provider store={store}>
            
        
<PersistGate loading={null} persistor={persistor}>
    {() => (
        <ThemeProvider attribute="class" defaultTheme="system">
            {children}
        </ThemeProvider>
    )}
</PersistGate>
        
        </Provider>
    );
}



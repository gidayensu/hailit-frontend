'use client'
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import Loader from "@/components/Shared/Loader";


export default function Providers ({children, }: {
    children: React.ReactNode;
}) {

    return (
        <Provider store={store}>
            
            <PersistGate loading={<Loader color="red"/>}  persistor={persistor}>
            {children}
        </PersistGate>
        </Provider>
    );
}
"use client";
import { injectStore } from "./helper/api/api.helper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux"
import { store } from "./store";
import React, { useState } from "react";
import { ModalProvider } from "./hooks/use-modal";
import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import RegisterProvider from "./registerProvider";
import { AuthProvider } from "./providers/AuthProvider";
const persistor = persistStore(store);
injectStore(store);

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    function getLibrary(provider: any) {
        return new Web3Provider(provider);
    }
    const [queryClient] = useState(() => new QueryClient());
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        {/* <AuthProvider> */}
                            <Web3ReactProvider getLibrary={getLibrary}>
                                <ModalProvider>
                                    <RegisterProvider>
                                        {children}
                                    </RegisterProvider>
                                </ModalProvider>
                            </Web3ReactProvider>
                        {/* </AuthProvider> */}
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                className={'text-center'}
            />
        </>
    )
};
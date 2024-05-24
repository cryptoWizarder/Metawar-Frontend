'use client'
import { useContext, useReducer } from 'react';
import { createContext } from 'react';
import { StateActions } from './actions';
import { StateActionsInterface, StateContextInterface } from './interfaces';

export const StateContext = createContext<{
    state: StateContextInterface;
    actions: StateActionsInterface;
} | null>(null);

export const reducer = (
    state: StateContextInterface,
    action: StateActions,
): StateContextInterface => {
    switch (action.type) {
        case 'SET_REGISTER_STATE':
            return {
                ...state,
                loginState: action.payload,
            };
        case 'SET_MODAL_OPEN':
            return {
                ...state,
                modalOpen: action.payload,
            };
    }
}

export const StateContextProvider: React.FC<{
    children: React.ReactElement;
}> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        modalOpen: false,
        loginState: 'login',
    });

    return (
        <StateContext.Provider
            value={{
                state,
                actions: {
                    setLoginState: (state) => dispatch({ type: 'SET_REGISTER_STATE', payload: state }),
                    setOpenModal: (state) => dispatch({ type: 'SET_MODAL_OPEN', payload: state }),
                },
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(StateContext);

    if (!context) throw new Error('useAppState must be used within a StateContextProvider');

    return context;
};

export interface StateContextInterface {
    loginState?: 'login' | 'validate' | 'logout' | undefined;
    modalOpen: boolean;
}

export interface StateActionsInterface {
    setLoginState: (state: StateContextInterface['loginState']) => void;
    setOpenModal: (state: boolean) => void;
}
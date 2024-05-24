export interface SetOpenModalAction {
    type: 'SET_MODAL_OPEN';
    payload: boolean;
}

export interface SetRegisterStateAction {
    type: 'SET_REGISTER_STATE';
    payload: 'login' | 'validate' | 'logout' | undefined;
}

export type StateActions =
    | SetRegisterStateAction
    | SetOpenModalAction;
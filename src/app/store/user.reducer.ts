import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IUser, Nullable } from '../interfaces/api.interfaces';

export interface IAppState {
  token: string;
  wallet: string;
  user: Nullable<IUser>;
}

const INITIAL_STATE: IAppState = {
  token: '',
  wallet: '',
  user: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUser(state, action: PayloadAction<Nullable<IUser>>) {
      state.user = action.payload;
    },
    setWallet(state, action: PayloadAction<string>) {
      state.wallet = action.payload;
    },
    resetUser(state) {
      state.user = null;
      state.token = '';
      state.wallet = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUser, resetUser, setWallet } = appSlice.actions;

export default appSlice.reducer;
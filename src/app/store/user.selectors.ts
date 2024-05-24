import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '.';

export const selectUserRoot = createSelector(
  (state: RootState) => state,
  (state) => state.user,
);

export const selectToken = createSelector(selectUserRoot, (state) => state.token);
export const selectUser = createSelector(selectUserRoot, (state) => state.user);
export const selectWallet = createSelector(selectUserRoot, (state) => state.wallet);
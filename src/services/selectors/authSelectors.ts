import { RootState } from '../store';

export const getUser = (state: RootState) => state.auth.user;
export const getAuthLoading = (state: RootState) => state.auth.loading;
export const getAuthError = (state: RootState) => state.auth.error;

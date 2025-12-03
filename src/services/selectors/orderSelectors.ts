import { RootState } from '../store';

export const getOrderNumber = (state: RootState) => state.order.orderNumber;
export const getOrderLoading = (state: RootState) => state.order.loading;
export const getOrderError = (state: RootState) => state.order.error;

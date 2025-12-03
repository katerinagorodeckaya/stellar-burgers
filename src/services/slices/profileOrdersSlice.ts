import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TProfileOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  wsConnected: boolean;
};

const initialState: TProfileOrdersState = {
  orders: [],
  loading: false,
  error: null,
  wsConnected: false
};

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    wsConnect: (state, action: PayloadAction<string>) => {},
    wsDisconnect: (state) => {},
    wsConnecting: (state) => {
      state.wsConnected = true;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    wsMessage: (state, action: PayloadAction<{ orders: TOrder[] }>) => {
      state.orders = action.payload.orders;
    },
    wsClose: (state) => {
      state.wsConnected = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке истории заказов';
      });
  }
});

export const {
  wsConnect: wsProfileConnect,
  wsDisconnect: wsProfileDisconnect,
  wsConnecting: wsProfileConnecting,
  wsError: wsProfileError,
  wsMessage: wsProfileMessage,
  wsClose: wsProfileClose
} = profileOrdersSlice.actions;

export default profileOrdersSlice.reducer;

export const profileOrdersWsActions = {
  wsConnect: profileOrdersSlice.actions.wsConnect.type,
  wsDisconnect: profileOrdersSlice.actions.wsDisconnect.type,
  wsSendMessage: undefined,
  onOpen: profileOrdersSlice.actions.wsConnecting.type,
  onClose: profileOrdersSlice.actions.wsClose.type,
  onError: profileOrdersSlice.actions.wsError.type,
  onMessage: profileOrdersSlice.actions.wsMessage.type
};

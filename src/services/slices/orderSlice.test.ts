import orderReducer, { createOrder, clearOrder } from './orderSlice';

describe('orderSlice reducer', () => {
  const initialState = {
    orderNumber: null,
    loading: false,
    error: null
  };

  it('should return the initial state', () => {
    const state = orderReducer(initialState, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({
      orderNumber: null,
      loading: true,
      error: null
    });
  });

  it('should handle createOrder.fulfilled', () => {
    const orderNumber = 12345;
    const action = {
      type: createOrder.fulfilled.type,
      payload: orderNumber
    };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({
      orderNumber,
      loading: false,
      error: null
    });
  });

  it('should handle createOrder.rejected', () => {
    const errorMessage = 'Failed to create order';
    const action = {
      type: createOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({
      orderNumber: null,
      loading: false,
      error: errorMessage
    });
  });

  it('should handle createOrder.rejected with default message', () => {
    const action = {
      type: createOrder.rejected.type,
      error: {}
    };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({
      orderNumber: null,
      loading: false,
      error: 'Ошибка при создании заказа'
    });
  });

  it('should handle clearOrder action', () => {
    const stateWithOrder = {
      orderNumber: 12345,
      loading: false,
      error: null
    };

    const state = orderReducer(stateWithOrder, clearOrder());

    expect(state).toEqual(initialState);
  });

  it('should clear error when clearing order', () => {
    const stateWithError = {
      orderNumber: null,
      loading: false,
      error: 'Some error'
    };

    const state = orderReducer(stateWithError, clearOrder());

    expect(state).toEqual(initialState);
  });
});

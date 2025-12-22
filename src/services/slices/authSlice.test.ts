import authReducer, {
  register,
  login,
  logout,
  getUser,
  updateUser
} from './authSlice';
import { TUser } from '@utils-types';

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null
  };

  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  it('should return the initial state', () => {
    const state = authReducer(initialState, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  describe('register thunk', () => {
    it('should handle register.pending', () => {
      const action = { type: register.pending.type };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: null,
        loading: true,
        error: null
      });
    });

    it('should handle register.fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: mockUser,
        loading: false,
        error: null
      });
    });

    it('should handle register.rejected', () => {
      const errorMessage = 'Registration failed';
      const action = {
        type: register.rejected.type,
        error: { message: errorMessage }
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: null,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('login thunk', () => {
    it('should handle login.pending', () => {
      const action = { type: login.pending.type };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: null,
        loading: true,
        error: null
      });
    });

    it('should handle login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: mockUser,
        loading: false,
        error: null
      });
    });

    it('should handle login.rejected', () => {
      const errorMessage = 'Login failed';
      const action = {
        type: login.rejected.type,
        error: { message: errorMessage }
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: null,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('logout thunk', () => {
    it('should handle logout.fulfilled', () => {
      const stateWithUser = {
        user: mockUser,
        loading: false,
        error: null
      };

      const action = { type: logout.fulfilled.type };
      const state = authReducer(stateWithUser, action);

      expect(state).toEqual({
        user: null,
        loading: false,
        error: null
      });
    });
  });

  describe('getUser thunk', () => {
    it('should handle getUser.pending', () => {
      const action = { type: getUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: null,
        loading: true,
        error: null
      });
    });

    it('should handle getUser.fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: mockUser,
        loading: false,
        error: null
      });
    });

    it('should handle getUser.rejected', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Error' }
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: null,
        loading: false,
        error: 'Error'
      });
    });
  });

  describe('updateUser thunk', () => {
    it('should handle updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: null,
        loading: true,
        error: null
      });
    });

    it('should handle updateUser.fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: mockUser,
        loading: false,
        error: null
      });
    });

    it('should handle updateUser.rejected', () => {
      const errorMessage = 'Update failed';
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
        user: null,
        loading: false,
        error: errorMessage
      });
    });
  });
});

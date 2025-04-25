// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  error: null,
  loading: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
      state.isSignupModalOpen = false;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    openSignupModal: (state) => {
      state.isSignupModalOpen = true;
      state.isLoginModalOpen = false;
    },
    closeSignupModal: (state) => {
      state.isSignupModalOpen = false;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isLoginModalOpen = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isSignupModalOpen = false;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const {
  openLoginModal,
  closeLoginModal,
  openSignupModal,
  closeSignupModal,
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout
} = authSlice.actions;

// Async actions
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any valid-looking email/password
    if (credentials.email && credentials.password && credentials.email.includes('@')) {
      const user = {
        email: credentials.email,
        name: credentials.email.split('@')[0]
      };
      
      // In a real app, you would store the token from your API
      localStorage.setItem('auth_token', 'demo_token');
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch(loginSuccess(user));
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  } catch (error) {
    dispatch(loginFailure(error.message || 'Login failed'));
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate the input
    if (userData.email && userData.password && userData.confirmPassword) {
      if (userData.password !== userData.confirmPassword) {
        return dispatch(signupFailure('Passwords do not match'));
      }
      
      if (!userData.email.includes('@')) {
        return dispatch(signupFailure('Invalid email format'));
      }
      
      if (userData.password.length < 6) {
        return dispatch(signupFailure('Password must be at least 6 characters'));
      }
      
      const user = {
        email: userData.email,
        name: userData.email.split('@')[0]
      };
      
      localStorage.setItem('auth_token', 'demo_token');
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch(signupSuccess(user));
    } else {
      dispatch(signupFailure('All fields are required'));
    }
  } catch (error) {
    dispatch(signupFailure(error.message || 'Signup failed'));
  }
};

export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem('auth_token');
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (token && user) {
    dispatch(loginSuccess(user));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  dispatch(logout());
};

export default authSlice.reducer;
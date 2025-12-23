// src/state/slices/authSlice.ts

import type { StoreApi } from 'zustand';
import type { RootState, AuthSlice } from '@/src/state/types';

export const createAuthSlice = (
  set: StoreApi<RootState>['setState'],
  get: StoreApi<RootState>['getState'],
): AuthSlice => ({
  user: null,
  isAuthenticated: false,

  setUser: user => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  updateUser: updates => {
    set(state => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
});


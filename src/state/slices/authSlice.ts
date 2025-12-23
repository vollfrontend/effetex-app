// src/state/slices/authSlice.ts

import type { StoreApi } from 'zustand';
import type { RootState, AuthSlice } from '@/src/state/types';

export const createAuthSlice = (
  set: StoreApi<RootState>['setState'],
  get: StoreApi<RootState>['getState'],
): AuthSlice => ({
  user: null,


  setUser: user => {
    set((state) => ({
      user,
      settings: { ...state.settings, isAuthenticated: !!user },
    }));
  },

  logout: () => {
    set((state) => ({
      user: null,
      settings: { ...state.settings, isAuthenticated: false },
    }));
  },

  updateUser: updates => {
    set(state => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
});


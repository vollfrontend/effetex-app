// src/state/slices/authSlice.ts

import type { StateCreator } from 'zustand';
import type { RootState, AuthSlice } from '@/src/state/types';

export const createAuthSlice: StateCreator<
  RootState,
  [],
  [],
  AuthSlice
> = set => ({
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


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  name: string | null;
  role: string | null;
  isVerified: boolean | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  name: null,
  role: null,
  isVerified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; role: string; isVerified: boolean }>) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isVerified = action.payload.isVerified;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = null;
      state.role = null;
      state.isVerified = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

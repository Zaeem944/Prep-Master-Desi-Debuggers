import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  name: string | null;
  role: string | null;
  isVerified: boolean | null;
  email: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  name: null,
  role: null,
  isVerified: false,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; role: string; isVerified: boolean , email: string}>) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isVerified = action.payload.isVerified;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = null;
      state.role = null;
      state.isVerified = null;
      state.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

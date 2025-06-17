import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";
const status: any = Cookies.get("consultant-login-status");

const initialState: any = {
  isLoggedIn: status? JSON.parse(status): false,
  user: null,
  reload: false,
}

const authReducer = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoggin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    }
  },
})

export const { setLoggin, setUser, setReload } = authReducer.actions
export default authReducer.reducer
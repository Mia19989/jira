import { createSlice } from "@reduxjs/toolkit";
import { User } from "../screen/projectList/SearchBar";
import * as auth from "../auth-provider";
import { bootstrapUser, UserParams } from "../context/authContext";
import { AppDispatch, RootState } from ".";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    }
  }
})

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (from: UserParams) => (dispatch: AppDispatch) => auth.login(from).then(user => dispatch(setUser(user)));
export const register = (form: UserParams) => (dispatch: AppDispatch) => auth.register(form).then(user => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) => bootstrapUser().then((user) => dispatch(setUser(user)));
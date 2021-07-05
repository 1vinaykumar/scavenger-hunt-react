import { createContext } from "react";

export const commonAPIState = {
  loading: false,
  success: false,
  failed: false,
};

export const initialState = {
  error: null,
  user: {
    ...commonAPIState,
    details: null,
  },
  notifications: {
    list: [],
  },
  auth: {
    login: commonAPIState,
    loggedIn: false,
    token: "",
    role: "",
  },
  branches: {
    list: [],
    ...commonAPIState,
  },
  servingBranches: {
    list: [],
    ...commonAPIState,
  },
};

export const store = createContext(initialState);

export default store;

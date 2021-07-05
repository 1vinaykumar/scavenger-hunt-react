import * as types from "./actionTypes";
import { commonAPIState, initialState } from "./store";

export const reducer = (state, action) => {
  if (action.type === types.GET_BRANCHES_LOADING) {
    return {
      ...state,
      branches: {
        ...commonAPIState,
        loading: true,
      },
    };
  } else if (action.type === types.GET_BRANCHES_SUCCESS) {
    return {
      ...state,
      branches: {
        ...commonAPIState,
        success: true,
        list: action.payload,
      },
    };
  } else if (action.type === types.GET_BRANCHES_FAILED) {
    return {
      ...state,
      branches: {
        ...commonAPIState,
        failed: true,
      },
      error: action.payload,
    };
  } else if (action.type === types.GET_SERVING_BRANCHES_LOADING) {
    return {
      ...state,
      servingBranches: {
        ...commonAPIState,
        loading: true,
      },
    };
  } else if (action.type === types.GET_SERVING_BRANCHES_SUCCESS) {
    return {
      ...state,
      servingBranches: {
        ...commonAPIState,
        success: true,
        list: action.payload,
      },
    };
  } else if (action.type === types.GET_SERVING_BRANCHES_FAILED) {
    return {
      ...state,
      servingBranches: {
        ...commonAPIState,
        failed: true,
      },
      error: action.payload,
    };
  } else if (action.type === types.LOGIN_LOADING) {
    return {
      ...state,
      auth: {
        ...state?.auth,
        login: {
          ...commonAPIState,
          loading: true,
        },
        loggedIn: false,
      },
    };
  } else if (action.type === types.LOGIN_SUCCESS) {
    return {
      ...state,
      auth: {
        ...state?.auth,
        login: {
          ...commonAPIState,
          success: true,
        },
        loggedIn: true,
        token: action?.payload?.token ?? "",
        role: action?.payload?.role ?? "",
      },
    };
  } else if (action.type === types.LOGIN_FAILED) {
    return {
      ...state,
      auth: {
        ...state?.auth,
        login: {
          ...commonAPIState,
          failed: true,
        },
        loggedIn: false,
      },
      error: action.payload,
    };
  } else if (action.type === types.GET_USER_LOADING) {
    return {
      ...state,
      user: {
        ...commonAPIState,
        loading: true,
      },
    };
  } else if (action.type === types.GET_USER_SUCCESS) {
    const newList = [];
    [...state.notifications.list, ...action.payload.notifications].forEach(
      (item) => {
        if (!newList.find((item1) => item1._id === item._id))
          newList.push(item);
      }
    );
    return {
      ...state,
      user: {
        ...commonAPIState,
        success: true,
        details: action.payload,
      },
      notifications: {
        ...state.notifications,
        list: newList,
      },
    };
  } else if (action.type === types.GET_USER_FAILED) {
    return {
      ...state,
      user: {
        ...commonAPIState,
        failed: true,
      },
      error: action.payload,
    };
  } else if (action.type === types.LOGOUT) {
    return initialState;
  } else if (action.type === types.NOTIFICATION_RECEIVED) {
    if (
      state.notifications.list.find((item) => item._id === action.payload._id)
    ) {
      return state;
    } else {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: [...state?.notifications?.list, action.payload],
        },
      };
    }
  } else {
    return state;
  }
};

export default reducer;

import { useHistory } from "react-router-dom";
import { action, types } from "../state";
import httpService from "./httpService";
import useAppState from "./useAppState";

function useAPI() {
  const { dispatch } = useAppState();
  const history = useHistory();

  const login = (userDetails) => {
    dispatch(action(types.LOGIN_LOADING));
    httpService
      .post("/users/login", userDetails)
      .then((response) => {
        window.localStorage.setItem("loginToken", response.data.token);
        window.localStorage.setItem("role", response.data?.role?.toString());
        dispatch(action(types.LOGIN_SUCCESS, response.data));
        history.push(response.data.role === "USER" ? "/user" : "/admin");
        getUser(userDetails.userName);
      })
      .catch((error) => {
        dispatch(action(types.LOGIN_FAILED, error));
      });
  };

  const logout = () => {
    window.localStorage.removeItem("loginToken");
    window.localStorage.removeItem("role");
    dispatch(action(types.LOGOUT));
    history.push("/");
  };

  const getUser = (userName) => {
    dispatch(action(types.GET_USER_LOADING));
    httpService
      .get("/users/" + userName)
      .then((response) => {
        dispatch(action(types.GET_USER_SUCCESS, response.data));
      })
      .catch((error) => {
        dispatch(action(types.GET_USER_FAILED, error));
      });
  };

  const getBranches = () => {
    dispatch(action(types.GET_BRANCHES_LOADING));
    httpService
      .get("/branches")
      .then((response) => {
        dispatch(action(types.GET_BRANCHES_SUCCESS, response.data));
      })
      .catch((error) => {
        dispatch(action(types.GET_BRANCHES_FAILED, error));
      });
  };

  const getServingBranches = (details) => {
    dispatch(action(types.GET_SERVING_BRANCHES_LOADING));
    httpService
      .post("/branches/servingBranches", details)
      .then((response) => {
        dispatch(action(types.GET_SERVING_BRANCHES_SUCCESS, response.data));
      })
      .catch((error) => {
        dispatch(action(types.GET_SERVING_BRANCHES_FAILED, error));
      });
  };

  return { login, logout, getUser, getBranches, getServingBranches };
}

export default useAPI;

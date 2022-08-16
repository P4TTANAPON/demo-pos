import {
  LOGIN_FAILED,
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGOUT,
  server,
} from "../constants";
import { LoginResult } from "../types/auth-result.type";
import { User } from "../types/user.type";
import { httpClient } from "../utils/HttpClient";
import { HistoryProp } from "../types/history.type";

export const setLoginFetchingToState = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginSuccessToState = (payload: LoginResult) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setLoginFailedToState = (payload: string) => ({
  type: LOGIN_FAILED,
  payload,
});

export const setLoginLogoutToState = () => ({
  type: LOGOUT,
});

export const logout = (history: any) => {
  return (dispatch: any) => {
    localStorage.removeItem(server.TOKEN_KEY);
    localStorage.removeItem(server.REFRESH_TOKEN_KEY);
    dispatch(setLoginLogoutToState());
    history.push("/login");
  };
};

export const login = (user: User, history: HistoryProp) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoginFetchingToState());
      const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
      if (result.data.result === "ok") {
        const { token, refreshToken } = result.data;
        localStorage.setItem(server.TOKEN_KEY, token);
        localStorage.setItem(server.REFRESH_TOKEN_KEY, refreshToken);

        dispatch(setLoginSuccessToState(result.data));
        history.push("/stock");
      } else {
        dispatch(setLoginFailedToState("Invalid account"));
      }
    } catch (error) {
      dispatch(setLoginFailedToState(JSON.stringify(error)));
    }
  };
};

export const handleReLogin = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem(server.TOKEN_KEY);
    const refreshToken = localStorage.getItem(server.REFRESH_TOKEN_KEY);

    if (token) {
      dispatch(
        setLoginSuccessToState({
          token,
          result: "ok",
          refreshToken: refreshToken!,
        })
      );
    }
  };
};
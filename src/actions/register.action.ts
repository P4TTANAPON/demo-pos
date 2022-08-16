import {
  REGISTER_FAILED,
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
  server,
} from "../constants";
import { RegisterResult } from "../types/auth-result.type";
import { User } from "../types/user.type";
import { httpClient } from "../utils/HttpClient";

export const setRegisterFetchingToState = () => ({
  type: REGISTER_FETCHING,
});

export const setRegisterSuccessToState = (payload: RegisterResult) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const setRegisterFailedToState = (payload: string) => ({
  type: REGISTER_FAILED,
  payload,
});

export const register = (user: User) => {
  return async (dispatch: any) => {
    try {
      dispatch(setRegisterFetchingToState());
      const result = await httpClient.post<RegisterResult>(
        server.REGISTER_URL,
        user
      );
      if (result.data.result === "ok") {
        dispatch(setRegisterSuccessToState(result.data));
      } else {
        dispatch(setRegisterFailedToState("invalid"));
      }
    } catch (e) {
        dispatch(setRegisterFailedToState(JSON.stringify(e)));
    }
  };
};

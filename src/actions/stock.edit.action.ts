import {
  server,
  STOCK_EDIT_FAILED,
  STOCK_EDIT_FETCHING,
  STOCK_EDIT_SUCCESS,
} from "../constants";
import { httpClient } from "../utils/HttpClient";

export const setStateStockToSuccess = (payload: any) => ({
  type: STOCK_EDIT_SUCCESS,
  payload,
});

const setStateStockToFetching = () => ({
  type: STOCK_EDIT_FETCHING,
});

const setStateStockToFailed = () => ({
  type: STOCK_EDIT_FAILED,
});

export const updateProduct = (formData: any, history: any) => {
  return async (dispatch: any) => {
    await httpClient.put(server.PRODUCT_URL, formData);
    history.goBack();
  };
};

export const getProductById = (id: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setStateStockToFetching());
      let result = await httpClient.get(`${server.PRODUCT_URL}/id/${id}`);
      dispatch(setStateStockToSuccess(result.data));
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setStateStockToFailed());
    }
  };
};

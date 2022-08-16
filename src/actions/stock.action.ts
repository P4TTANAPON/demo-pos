import {
  server,
  STOCK_FAILED,
  STOCK_FETCHING,
  STOCK_SUCCESS,
} from "../constants";
import { HistoryProp } from "../types/history.type";
import { Product } from "../types/product.type";
import { httpClient } from "../utils/HttpClient";

export const setStockFetchingToState = () => ({
  type: STOCK_FETCHING,
});

export const setStockSuccessToState = (payload: Product[]) => ({
  type: STOCK_SUCCESS,
  payload,
});

export const setStockFailedToState = (payload: string) => ({
  type: STOCK_FAILED,
  payload,
});

export const loadStock = () => {
  return async (dispatch: any) => {
    dispatch(setStockFetchingToState());
    await doLoadStock(dispatch);
  };
};

const doLoadStock = async (dispatch: any) => {
  try {
    const result = await httpClient.get<Product[]>(server.PRODUCT_URL);
    dispatch(setStockSuccessToState(result.data));
  } catch (e) {
    dispatch(setStockFailedToState("Failed"));
  }
};

export const addProduct = (formData: any, history: HistoryProp) => {
  return async (dispatch: any) => {
    await httpClient.post(server.PRODUCT_URL, formData);
    history.goBack();
  };
};

export const deleteProduct = (id: any) => {
  return async (dispatch: any) => {
    dispatch(setStockFetchingToState());
    await httpClient.delete(`${server.PRODUCT_URL}/id/${id}`);
    await doLoadStock(dispatch);
  };
};

export const getProductByKeyword = (keyword: string) => {
  return async (dispatch: any) => {
    dispatch(setStockFetchingToState());

    if (keyword) {
      let result = await httpClient.get(
        `${server.PRODUCT_URL}/name/${keyword}`
      );
      dispatch(setStockSuccessToState(result.data));
    } else {
      doLoadStock(dispatch);
    }
  };
};

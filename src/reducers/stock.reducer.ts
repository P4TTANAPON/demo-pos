import {
  STOCK_CLEAR,
  STOCK_FAILED,
  STOCK_FETCHING,
  STOCK_SUCCESS,
} from "../constants";
import { Product } from "../types/product.type";

export interface StockState {
  result: Product[];
  isFetching: boolean;
  isError: boolean;
}

const initialState: StockState = {
  result: [],
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }: any): StockState => {
  switch (type) {
    case STOCK_FETCHING:
      return { ...state, isFetching: true, isError: false, result: [] };
    case STOCK_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };
    case STOCK_FAILED:
      return { ...state, isFetching: false, isError: true, result: [] };

    default:
      return state;
  }
};

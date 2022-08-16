import {
    server,
    TRANSACTION_FAILED,
    TRANSACTION_FETCHING,
    TRANSACTION_SUCCESS,
  } from "../constants";
  import { TransactionResponse } from "../types/transaction.type";
  import { httpClient } from "../utils/HttpClient";
  
  const setStateTransactionToSuccess = (payload: TransactionResponse) => ({
    type: TRANSACTION_SUCCESS,
    payload: payload,
  });
  
  const setStateTransactionToFetching = () => ({
    type: TRANSACTION_FETCHING,
  });
  
  const setStateTransactionToFailed = () => ({
    type: TRANSACTION_FAILED,
  });
  
  export const getTransactions = () => {
    setStateTransactionToFetching();
    return (dispatch: any) => {
      httpClient
        .get<TransactionResponse>(server.TRANSACTION_URL)
        .then((result) => {
          dispatch(setStateTransactionToSuccess(result.data));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setStateTransactionToFailed());
        });
    };
  };
import { server, SHOP_UPDATE_ORDER, SHOP_UPDATE_PAYMENT } from "../constants";
import { httpClient } from "../utils/HttpClient";

const setStateShoptoUpdateOrder = (payload: any) => ({
  type: SHOP_UPDATE_ORDER,
  payload: payload,
});

const doUpdateOrder = (dispatch: any, orderLines: any) => {
  let totalPrice = 0;
  let taxAmt = 0;
  for (let item of orderLines) {
    totalPrice += item.price * item.qty;
  }
  taxAmt = totalPrice * 0.07;

  dispatch(
    setStateShoptoUpdateOrder({
      orderLines,
      totalPrice,
      taxAmt,
    })
  );
};

export const addOrder = (item: any) => {
  return (dispatch: any, getState: any) => {
    let orderLines = getState().shopReducer.mOrderLines;
    let index = orderLines.indexOf(item);
    if (index === -1) {
      item.qty = 1;
      orderLines.unshift(item);
    } else {
      orderLines[index].qty++;
    }

    doUpdateOrder(dispatch, orderLines);
  };
};

export const removeOrder = (product: any) => {
  return (dispatch: any, getState: any) => {
    let orderLines = getState().shopReducer.mOrderLines;
    var foundIndex = orderLines.indexOf(product);

    orderLines.map((item: any) => {
      if (item.product_id === product.product_id) {
        item.qty = 1;
      }
    });
    orderLines.splice(foundIndex, 1);

    doUpdateOrder(dispatch, orderLines);
  };
};

export const submitPayment = (data: any) => {
  return (dispatch: any, getState: any) => {
    httpClient.post(server.TRANSACTION_URL, data).then(() => {
      // Clear payment
      getState().shopReducer.mOrderLines = [];
      dispatch({
        type: SHOP_UPDATE_PAYMENT,
        payload: {
          isPaymentMade: false,
          given: 0,
        },
      });
    });
  };
};

export const togglePaymentState = () => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: SHOP_UPDATE_PAYMENT,
      payload: {
        isPaymentMade: !getState().shopReducer.mIsPaymentMade,
        given: !getState().shopReducer.mGiven,
      },
    });
  };
};
import { SHOP_UPDATE_ORDER, SHOP_UPDATE_PAYMENT } from "../constants";

export interface ShopState {
  mOrderLines: any[];
  mTotalPrice: number;
  mTaxAmt: number;
  mIsPaymentMade: boolean;
  mGiven: number;
}

const initialState: ShopState = {
  mOrderLines: [],
  mTotalPrice: 0,
  mTaxAmt: 0,
  mIsPaymentMade: false,
  mGiven: 0,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SHOP_UPDATE_ORDER:
      return {
        ...state,
        mOrderLines: payload.orderLines,
        mTotalPrice: payload.totalPrice,
        mTaxAmt: payload.taxAmt,
      };
    case SHOP_UPDATE_PAYMENT:
      return {
        ...state,
        mIsPaymentMade: payload.isPaymentMade,
        mGiven: payload.given,
      };
    default:
      return state;
  }
};
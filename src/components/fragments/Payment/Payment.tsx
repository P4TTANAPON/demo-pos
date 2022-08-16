import { useDispatch, useSelector } from "react-redux";
import { TransactionRequest } from "../../../types/transaction.type";
import * as shopActions from "./../../../actions/shop.action";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { RootReducer } from "../../../reducers";
import { Box } from "@mui/system";

export default (props: any) => {
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  const dispatch = useDispatch();

  const isMustChanged = (values: any) => {
    try {
      return values.given > shopReducer.mTotalPrice;
    } catch (err) {
      return false;
    }
  };

  const updateChange = (given: any, setFieldValue: any) => {
    let change = given - shopReducer.mTotalPrice;
    if (change > 0) {
      setFieldValue("change", change);
    } else {
      setFieldValue("change", 0);
    }
  };

  const onClickGiven = (newValue: any, oldValue: any, setFieldValue: any) => {
    const newGiven = newValue + oldValue;
    setFieldValue("given", newGiven);
    updateChange(newGiven, setFieldValue);
  };

  const onClickExact = (setFieldValue: any) => {
    setFieldValue("given", shopReducer.mTotalPrice);
    updateChange(0, setFieldValue);
  };

  const onClickSubmit = (values: any) => {
    let trans: TransactionRequest = {
      subtotal: 0,
      discount: 0,
      shipping_cost: 0,
      tax_percent: 0,
      total: shopReducer.mTotalPrice,
      paid: values.given,
      change: values.change,
      order_list: props.order,
      payment_type: "cash",
      payment_detail: "full",
      staff_id: "x",
      seller_id: "sr0001",
      buyer_id: "by0000",
      comment: "x",
    };

    dispatch(shopActions.submitPayment(trans));
  };

  const showForm = ({ values, setFieldValue }: any) => {
    return (
      <Form>
        {isMustChanged(values) && (
          <Field
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            component={TextField}
            name="change"
            type="text"
            label="Change"
            InputProps={{
              style: { fontSize: 35, marginBottom: 20 },
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">THB</InputAdornment>
              ),
            }}
          />
        )}

        <Field
          readonly
          variant="outlined"
          fullWidth
          component={TextField}
          name="given"
          type="text"
          label="Given"
          InputProps={{
            style: { fontSize: 35, color: "green" },
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">THB</InputAdornment>
            ),
          }}
        />

        <div style={{ marginTop: 32 }}>
          <Grid container spacing={1} p={1}>
            <Grid item xs>
              <Button
                sx={{ height: 100, fontSize: 20 }}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(1000, values.given, setFieldValue)}
              >
                ฿1,000
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                sx={{ height: 100, fontSize: 20 }}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(500, values.given, setFieldValue)}
              >
                ฿500
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                sx={{ height: 100, fontSize: 20 }}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(100, values.given, setFieldValue)}
              >
                ฿100
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={1} p={1}>
            <Grid item xs>
              <Button
                sx={{ height: 100, fontSize: 20 }}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(50, values.given, setFieldValue)}
              >
                ฿50
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                sx={{ height: 100, fontSize: 20 }}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(20, values.given, setFieldValue)}
              >
                ฿20
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                sx={{ height: 100, fontSize: 20 }}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onClickGiven(10, values.given, setFieldValue)}
              >
                ฿10
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={1} p={1}>
            <Grid item xs>
              <Button
                sx={{ height: 100, fontSize: 20, padding: 1 }}
                fullWidth
                variant="contained"
                color="info"
                onClick={() => setFieldValue("given", 0)}
              >
                CLR
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                sx={{ height: 100, fontSize: 20 }}
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => onClickExact(setFieldValue)}
              >
                EXACT
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                sx={{ height: 100, fontSize: 20 }}
                fullWidth
                disabled={values.given < shopReducer.mTotalPrice}
                variant="outlined"
                color="primary"
                onClick={() => onClickSubmit(values)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Form>
    );
  };

  return (
    <Box p={2}>
      <Formik onSubmit={(values) => {}} initialValues={{ given: 0 }}>
        {(props) => showForm(props)}
      </Formik>
    </Box>
  );
};
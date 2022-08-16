import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarsIcon from "@mui/icons-material/Stars";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../../reducers";
import * as shopActions from "./../../../actions/shop.action";
import * as stockActions from "./../../../actions/stock.action";
import { imageUrl } from "./../../../constants";
import Payment from "./../../fragments/Payment/Payment";
import classes from "./ShopPage.styles";

export default (props: any) => {
  const shopReducer = useSelector((state: RootReducer) => state.shopReducer);
  const stockReducer = useSelector((state: RootReducer) => state.stockReducer);
  const dispatch = useDispatch();
  const renderPayment = () => {
    return (
      <div style={{ maxHeight: 710 }}>
        <Payment order={JSON.stringify(shopReducer.mOrderLines)} />
      </div>
    );
  };

  const isSelectedItem = (product: any) => {
    let index = shopReducer.mOrderLines.indexOf(product);
    return index !== -1;
  };

  const renderOrderRows = () => {
    const { mOrderLines } = shopReducer;

    return mOrderLines.map((item) => (
      <ListItem button divider sx={{ height: 100 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Image Order  */}
          <img
            alt="to be done"
            src={`${imageUrl}/images/${item.image}`}
            style={{ height: 50, width: 50 }}
          />

          {/* Name Order  */}
          <Typography
            color="textSecondary"
            component="p"
            sx={{ flexGrow: 1, marginLeft: 1, marginRight: 1 }}
          >
            {item.name}
          </Typography>

          {/* Price and Qty Order  */}
          <Typography align="right" color="textPrimary">
            <NumberFormat
              value={item.price}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"฿"}
            />
            <br />X {item.qty}.
            <br />
            <DeleteOutlineIcon
              onClick={() => dispatch(shopActions.removeOrder(item))}
            />
          </Typography>
        </Box>
      </ListItem>
    ));
  };

  const renderProductRows = () => {
    const { result } = stockReducer;
    return (
      <Container sx={{ height: "80vh", overflowY: "scroll", padding: 1 }}>
        <Grid container spacing={1}>
          {result !== null &&
            result.map((item, i) => (
              <Grid
                key={i}
                item
                xs={3}
                onClick={() => dispatch(shopActions.addOrder(item))}
                style={{ cursor: "pointer" }}
              >
                <Card elevation={5}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height={120}
                      image={`${imageUrl}/images/${item.image}`}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography noWrap gutterBottom>
                        {item.name}
                      </Typography>
                      <Grid
                        container
                        sx={{
                          height: 24,
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div style={{ flexGrow: 1 }}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            D{item.product_id} / ฿{item.price}
                          </Typography>
                        </div>
                        {isSelectedItem(item) && (
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Typography
                              style={{ marginRight: 4 }}
                              variant="body1"
                              color="textPrimary"
                            >
                              X{item.qty}
                            </Typography>

                            <StarsIcon sx={classes.star} />
                          </div>
                        )}
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    );
  };

  useEffect(() => {
    dispatch(stockActions.loadStock());
  }, []);

  return (
    <Grid container spacing={2} sx={{ height: "80vh" }}>
      {/* Left section */}
      <Grid item xs={8} sx={{ backgroundColor: "#707070" }}>
        {shopReducer.mIsPaymentMade ? renderPayment() : renderProductRows()}
      </Grid>

      {/* Right section */}
      <Grid
        item
        xs={4}
        sx={{
          padding: 1,
          height: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper sx={{ padding: 1 }} elevation={1}>
          {/* Tax section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Tax 7%</Typography>
            <Typography variant="h6" color="red">
              <NumberFormat
                value={shopReducer.mTaxAmt}
                displayType={"text"}
                decimalScale={2}
                thousandSeparator={true}
                prefix={"฿"}
              />
            </Typography>
          </Box>

          {/* Total section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Total</Typography>
            <Typography variant="h4" color="primary">
              <NumberFormat
                value={shopReducer.mTotalPrice}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={"฿"}
              />
            </Typography>
          </Box>

          {shopReducer.mTotalPrice > 0 && !shopReducer.mIsPaymentMade && (
            <Button
              fullWidth
              sx={{ marginBottom: 2, marginTop: 10 }}
              variant="contained"
              color="primary"
              onClick={() => dispatch(shopActions.togglePaymentState())}
            >
              <Typography variant="h4">Payment</Typography>
            </Button>
          )}
        </Paper>

        <Paper
          elevation={1}
          sx={{
            height: "100%",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {shopReducer.mOrderLines.length > 0 ? (
            <List component="nav" aria-label="mailbox folders">
              {renderOrderRows()}
            </List>
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/images/waiting_for_sale.png`}
              style={{ height: 300, width: 300 }}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
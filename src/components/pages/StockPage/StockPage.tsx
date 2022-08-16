import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootReducer } from "../../../reducers";
import * as stockActions from "./../../../actions/stock.action";
import { imageUrl } from "./../../../constants";
import StockCard from "./../../fragments/StockCard/StockCard";
import { useDebounce, useDebounceCallback } from "@react-hook/debounce";

export default (props: any) => {
  const stockReducer = useSelector((state: RootReducer) => state.stockReducer);
  const dispatch = useDispatch();

  const [openMy, setOpenMy] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [value, setValue] = useDebounce("", 1000);
  // const [value, setValue] = useState<string>("");

  useEffect(() => {
    dispatch(stockActions.getProductByKeyword(value));
  }, [value]);

  useEffect(() => {
    dispatch(stockActions.loadStock());
  }, []);

  const handleDeleteConfirm = () => {
    dispatch(stockActions.deleteProduct(selectedProduct.product_id));
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCloseMy = () => {
    setOpenMy(false);
  };

  const showMyDialog = () => {
    return (
      <Dialog
        open={openMy}
        onClose={handleCloseMy}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMy}>Disagree</Button>
          <Button onClick={handleCloseMy} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showDialog = () => {
    if (selectedProduct === null) {
      return "";
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => {}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <img
            src={`${imageUrl}/images/${
              selectedProduct.image
            }?dummy=${Math.random()}`}
            style={{ width: 100, borderRadius: "5%" }}
          />
          <br />
          Confirm to delete the product? : {" " + selectedProduct.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted product.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // const ImageIcon = () => (
  //   <img src="https://www.codemobiles.com/biz/images/cm_logo.svg?ref=10" />
  // );

  return (
    <Box>
      {/* Summary Icons */}
      <Grid container style={{ marginBottom: 16 }} spacing={7}>
        <Grid item lg={3} md={6}>
          <StockCard
            icon={AddShoppingCartIcon}
            title="TOTAL"
            subtitle="112 THB"
            color="#00a65a"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={NewReleasesIcon}
            title="EMPTY"
            subtitle="9 PCS."
            color="#f39c12"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={AssignmentReturnIcon}
            title="RETURN"
            subtitle="1 PCS."
            color="#dd4b39"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={StarIcon}
            title="LOSS"
            subtitle="5 PCS."
            color="#00c0ef"
          />
        </Grid>
      </Grid>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          width: 400,
          marginBottom: 2,
        }}
      >
        <input type="text" hidden />
        <InputBase
          onChange={(e) => {
            setValue(e.target.value);
            e.stopPropagation();
            e.preventDefault();
          }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search product name"
          inputProps={{ "aria-label": "search product name" }}
        />
        <SearchIcon />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="add"
          component={Link}
          to="/stock/create"
        >
          <AddIcon />
        </IconButton>

        {/* <button type="button" onClick={() => setOpenMy(true)}>
          show my dialog
        </button> */}
      </Paper>

      {showMyDialog()}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Created</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockReducer.result.map((item: any) => (
              <TableRow hover key={item.product_id} sx={{ padding: 0 }}>
                {/* Id */}
                <TableCell component="th" scope="row">
                  <Typography variant="body1">{item.product_id}</Typography>
                </TableCell>

                {/* Image */}
                <TableCell align="left">
                  <img
                    src={`${imageUrl}/images/${
                      item.image
                    }?dummy=${Math.random()}`}
                    style={{ width: 70, height: 70, borderRadius: "5%" }}
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1">{item.name}</Typography>
                </TableCell>
                {/* Price */}
                <TableCell align="right">
                  <Typography variant="body1">
                    <NumberFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix={"฿"}
                    />
                  </Typography>
                </TableCell>
                {/* Stock */}
                <TableCell align="right">
                  <Typography variant="body1">
                    <NumberFormat
                      value={item.stock}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={0}
                      fixedDecimalScale={true}
                    />
                  </Typography>
                </TableCell>
                {/* Create */}
                <TableCell align="right">
                  <Typography>
                    <Moment format="DD/MM/YYYY">{item.created}</Moment>
                  </Typography>
                </TableCell>

                {/* Actions */}
                <TableCell align="left">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <IconButton
                      aria-label="edit"
                      size="large"
                      onClick={() => {
                        props.history.push("/stock/edit/" + item.product_id);
                      }}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => {
                        setSelectedProduct(item);
                        setOpenDialog(true);
                      }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showDialog()}
    </Box>
  );
};

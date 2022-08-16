import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { RootReducer } from "../../../reducers";
import { StockEditState } from "../../../reducers/stock.edit.reducer";
import { Product } from "../../../types/product.type";
import * as stockEditActions from "./../../../actions/stock.edit.action";
import { imageUrl } from "./../../../constants";

export default () => {
  const match = useRouteMatch<any>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isReady, setIsReady] = React.useState(false);
  // const stockEditReducer = useSelector(
  //   (state: RootReducer) => state.stockEditReducer
  // );

  const stockEditReducer = useSelector(
    ({ stockEditReducer }: RootReducer) => stockEditReducer
  );

  useEffect(() => {
    let id = match.params.id;
    dispatch(stockEditActions.getProductById(id));
    setTimeout(() => setIsReady(true), 100);
  }, []);

  const showForm = ({ values, setFieldValue }: any) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              Edit Product
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="Name"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="price"
              type="number"
              label="Price"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="stock"
              type="number"
              label="Stock"
            />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
              <img
                src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                style={{ width: 25, height: 20 }}
              />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                Add Picture
              </span>
              <input
                type="file"
                onChange={(e: any) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
                name="image"
                click-type="type1"
                className="picupload"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Edit
            </Button>
            <Button
              fullWidth
              component={Link}
              to="/stock"
              color="info"
              variant="outlined"
            >
              Cancl
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 100 }} />;
    } else if (values.image) {
      return (
        <img
          src={`${imageUrl}/images/${values.image}`}
          style={{ height: 100 }}
        />
      );
    }
  };

  const initialValues: Product = { name: "Loading...", stock: 10, price: 90 };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={
          stockEditReducer.result ? stockEditReducer.result : initialValues
        }
        onSubmit={(values: any, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("product_id", values.product_id);
          formData.append("name", values.name);
          formData.append("price", values.price);
          formData.append("stock", values.stock);
          if (values.file) {
            formData.append("image", values.file);
          }
          dispatch(stockEditActions.updateProduct(formData, history));
        }}
      >
        {isReady ? (props) => showForm(props) : null}
      </Formik>
    </div>
  );
};

/* eslint-disable import/no-anonymous-default-export */
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SxProps } from "@mui/system";
import { useHistory } from "react-router-dom";
import { User } from "../../../types/user.type";
import axios from "axios";
import { RootReducer } from "../../../reducers";
import * as registerActions from "../../../actions/register.action";
import { Alert } from "@mui/material";

const classes: any = {
  root: { display: "flex", justifyContent: "center", alignItems: "center" },
  submitBtn: { marginTop: 4 },
  canelBtn: { marginTop: 2 },
};

type RegisterProps = {};
export default (props: RegisterProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const registerReducer = useSelector(
    (state: RootReducer) => state.registerReducer
  );

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }: any) => {
    return (
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={handleChange}
          value={values.password}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          sx={classes.submitBtn}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Create
        </Button>
        <Button
          sx={classes.canelBtn}
          onClick={() => history.goBack()}
          type="button"
          fullWidth
          variant="outlined"
        >
          Cancel
        </Button>

        {/* Error Alert */}
        {registerReducer.isError && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            There is something wrong!
          </Alert>
        )}
      </form>
    );
  };

  const initialValue: User = { username: "", password: "" };
  return (
    <Box sx={classes.root}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Register
          </Typography>
          <Formik
            initialValues={initialValue}
            onSubmit={async (values, { setSubmitting }) => {
              dispatch(registerActions.register(values));
              setSubmitting(false);
            }}
          >
            {showForm}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Formik, FormikProps } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { server } from "../../../constants";
import { LoginResult } from "../../../types/auth-result.type";
import { User } from "../../../types/user.type";
import { httpClient } from "../../../utils/HttpClient";
import * as loginActions from "../../../actions/login.action";
import { RootReducer } from "../../../reducers";
import { HistoryProp } from "../../../types/history.type";

type LoginProps = {
  history: HistoryProp;
};

export default (props: LoginProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginReducer = useSelector((state: RootReducer) => state.loginReducer);

  const classes: any = {
    root: { display: "flex", justifyContent: "center", alignItems: "center" },
    submitBtn: { marginTop: 4 },
    canelBtn: { marginTop: 2 },
  };

  useEffect(() => {
    // loginActions.isLoggedIn() && props.history.push("/stock");
  }, []);

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }: FormikProps<User>) => {
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
          Sign In
        </Button>

        {/* <button onClick={() => props.history.push("/shop")}> Test</button> */}
        {isSubmitting && <CircularProgress style={{ marginTop: 10 }} />}
        <Grid container>
          <Link component={RouterLink} to="/register" variant="body2">
            Don't have an account? Register
          </Link>
        </Grid>

        {/* Error Alert */}
        {loginReducer.isError && (
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
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Login
          </Typography>
          <Formik
            initialValues={initialValue}
            onSubmit={async (values, { setSubmitting }) => {
              dispatch(loginActions.login(values, history));
              setSubmitting(false);
            }}
          >
            {(props) => showForm(props)}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};
import { Container, GlobalStyles } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import * as React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ReportPage from "./components/pages/ReportPage";
import ShopPage from "./components/pages/ShopPage";
import StockCreatePage from "./components/pages/StockCreatePage";
import StockEditPage from "./components/pages/StockEditPage";
import StockPage from "./components/pages/StockPage";
import TransactionPage from "./components/pages/TransactionPage";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "./reducers";
import { handleReLogin } from "./actions/login.action";
import * as loginActions from "./actions/login.action";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const theme = createTheme({
  palette: {
    background: {
      default: "#CFD2D6",
    },
  },
});

type AppProps = {};
export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const loginReducer = useSelector((state: RootReducer) => state.loginReducer);

  React.useEffect(() => {
    dispatch(loginActions.handleReLogin());
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Protected Route
  type CommonRouteProps = RouteProps & {
    component: React.FC;
  };
  const SecuredRoute = ({
    component: Component,
    ...rest
  }: CommonRouteProps) => (
    <Route
      {...rest}
      render={(props) =>
        // ternary condition
        loginReducer.result?.token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  // Login Route
  const LoginRoute = ({ component: Component, ...rest }: any) => (
    <Route
      {...rest}
      render={(props) =>
        loginReducer.result?.token ? (
          <Redirect to="/stock" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <Router
        basename={process.env.REACT_APP_IS_PRODUCTION === "1" ? "/demo" : ""}
      >
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/* Header */}
          {loginReducer.result?.token && (
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
          )}
          {loginReducer.result?.token && (
            <Menu open={open} handleDrawerClose={handleDrawerClose} />
          )}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
            }}
          >
            <Container>
              <DrawerHeader />
              <Switch>
                {/* Pages Define */}
                <LoginRoute path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <SecuredRoute path="/shop" component={ShopPage} />
                <SecuredRoute
                  exact={true}
                  path="/stock"
                  component={StockPage}
                />
                <SecuredRoute
                  path="/stock/create"
                  component={StockCreatePage}
                />
                <SecuredRoute
                  path="/stock/edit/:id"
                  component={StockEditPage}
                />
                <SecuredRoute path="/report" component={ReportPage} />
                <SecuredRoute path="/transaction" component={TransactionPage} />
                <Redirect exact={true} path="/" to="/login" />
                <Route path="/">
                  <NotFound />
                </Route>
              </Switch>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

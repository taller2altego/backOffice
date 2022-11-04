import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { Provider } from "react-redux";
import store from "../redux/store/store"
import Grid from '@mui/material/Grid';

const HomePage = lazy(() => import("../pages/Home.jsx"));
const LoginPage = lazy(() => import("../pages/Login.jsx"));

const AppRoutes = () => {
  return (
    <>
      <Provider store={store}>
      <Router>
        <Suspense fallback={<Grid container direction="row" justifyContent="center" alignItems="center" style={{ minHeight: "500px" }}>
          <RingLoader color="#673ab7" size={130} />
        </Grid>}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
          </Routes>
        </Suspense>
      </Router>
      </Provider>
    </>
  );
};

export default AppRoutes;
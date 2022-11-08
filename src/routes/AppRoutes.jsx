import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import Grid from '@mui/material/Grid';

const HomePage = lazy(() => import("../pages/Home.jsx"));
const LoginPage = lazy(() => import("../pages/Login.jsx"));
const Cotizacion = lazy(() => import("../pages/Cotizacion.jsx"));

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<Grid container direction="row" justifyContent="center" alignItems="center" style={{ minHeight: "500px" }}>
          <RingLoader color="#673ab7" size={130} />
        </Grid>}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/cotizacion" element={<Cotizacion />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default AppRoutes;

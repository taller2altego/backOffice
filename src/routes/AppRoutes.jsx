import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import Grid from '@mui/material/Grid';
import DenouncesPage from "../pages/Denounces.jsx";

const ChargeFonds = lazy(() => import("../pages/ChargeFonds.jsx"));
const HomePage = lazy(() => import("../pages/Home.jsx"));
const LoginPage = lazy(() => import("../pages/Login.jsx"));
const AdminReg = lazy(() => import("../pages/AdminReg.jsx"));
const Quotes = lazy(() => import("../pages/Quotes.jsx"));
const DetailQuote = lazy(() => import("../pages/DetailQuote.jsx"));
const Metrics = lazy(() => import("../pages/UsersMetrics"));
const TestQuote = lazy(() => import("../pages/TestQuote.jsx"));
const DetailUser = lazy(() => import("../pages/DetailUser.jsx"));

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Suspense
          fallback={
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ minHeight: "500px" }}>
              <RingLoader color="#673ab7" size={130} />
            </Grid>
          }>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/admin-register" element={<AdminReg />} />
            <Route exact path="/quotes" element={<Quotes />} />
            <Route exact path="/detail-quotes/:id" element={<DetailQuote />} />
            <Route exact path="/users-metrics" element={<Metrics />} />
            <Route exact path="/test-quotes/:id" element={<TestQuote />} />
            <Route exact path="/denounces-user/:id" element={<DenouncesPage />} />
            <Route exact path="/detail-user/:id" element={<DetailUser  />} />
            <Route exact path="/chargeToUser" element={<ChargeFonds />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default AppRoutes;

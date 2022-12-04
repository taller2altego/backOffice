import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetricsComponent from "../components/metrics/Metrics";
import NavBar from "../components/NavBar";
import { setState } from "../utils/setState";

const Metrics = () => {
    const currentUserData = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setState(navigate, dispatch)
    }, []);

    return (
        <>
            <div>
                <NavBar username={currentUserData.name} />
            </div>
            <div style={{ marginLeft: "3%" }}>
                <MetricsComponent navigate={navigate} />
            </div>
            <Typography
                variant="h4"
                gutterBottom
                component="div"

            >
                Usuarios
            </Typography>
            <Grid container >
                <Grid item xs={6} >
                    <iframe src="https://app.datadoghq.com/graph/embed?token=299e7b73ea9c6ece31e4cf62e8fe78527ea6ff57ae01704ef0875c5fa3d1fa73&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                    <iframe src="https://app.datadoghq.com/graph/embed?token=ecded759a70f6d0cab5ace760ee8083bf090a0b7ad6df9151780b92ddb4f4bf4&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                    <iframe src="https://app.datadoghq.com/graph/embed?token=292442170344743e6f7d807ab33f2b0193966fe0fa8f9fbc562c77517897aa07&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                </Grid>
                <Grid item xs={6} >
                    <iframe src="https://app.datadoghq.com/graph/embed?token=e32f15f603a700655ed71d11bcc6b9bbd6d893d3b02f428792ced096fef2a2e0&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                    <iframe src="https://app.datadoghq.com/graph/embed?token=b76e7d1c61d2eac094705dfe05ef3e911ffa8a2382bfea6d9a2f7f97ab4e981d&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                    <iframe src="https://app.datadoghq.com/graph/embed?token=91cf80d5a93575107073c1a303e2463669a711338b2d2f4a139a8d3f408dc0a8&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                </Grid>
            </Grid>
        </>
    )
}

export default Metrics;
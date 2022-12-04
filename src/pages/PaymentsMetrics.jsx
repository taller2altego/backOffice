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
                Transacciones
            </Typography>
            <Grid container >
                <Grid item xs={6} >
                    <iframe src="https://app.datadoghq.com/graph/embed?token=f4424e8a60dc447af33ad1910d9828d1e8148925c61b9ee005b6103fdb116407&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                </Grid>
                <Grid item xs={6} >
                    <iframe src="https://app.datadoghq.com/graph/embed?token=85ce870390663e396afb2c0cd294eab5b38a656135ebcf9525e2354342c4860c&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                </Grid>
            </Grid>
        </>
    )
}

export default Metrics;
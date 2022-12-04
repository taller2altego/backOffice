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
                Viajes
            </Typography>
            <Grid container >
                <Grid item xs={6} >
                    <iframe src="https://app.datadoghq.com/graph/embed?token=7132d8d3d8cb09dbf6a5daea74d3cf8be900751883040b122194af2a85f50b0d&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                </Grid>
                <Grid item xs={6} >
                    <iframe src="https://app.datadoghq.com/graph/embed?token=2b21800b44742e041c95c76eadd49ba95ef77723871605cbfdb91bbb91bc6122&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                </Grid>
            </Grid>
        </>
    )
}

export default Metrics;
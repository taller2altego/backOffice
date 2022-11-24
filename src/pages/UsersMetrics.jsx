import { Grid } from "@mui/material";
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
            <Grid container >
                <Grid item xs={6} >
                    <iframe src="https://app.datadoghq.com/graph/embed?token=6ff377bba2143be3eafb553576f0795035fb8501efb27a2fe7c561f0045ad555&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                    <iframe src="https://app.datadoghq.com/graph/embed?token=8f09696848881188a3e5dca5b5db4e4c541e77909c397e2d438066b6fe3cf73e&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                    <iframe src="https://app.datadoghq.com/graph/embed?token=44b67a01fabd43b3eb00add3b6851772dd6a91e6b94df0acf72ead28ff54cb5a&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                </Grid>
                <Grid item xs={6} >
                    <iframe src="https://app.datadoghq.com/graph/embed?token=47b48975f7bdc0397a7e8c391bbfd3a53ae3757761acd95885a230d45fb0f57b&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                    <iframe src="https://app.datadoghq.com/graph/embed?token=c4fa4386d7def252121fa68defef634f2b7808e2b3aff605366c11ba40c3af4f&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                    <iframe src="https://app.datadoghq.com/graph/embed?token=3423047ed97d7fb43901de7cab17902fd74924016951f6dff7bf6fc1fd675f0c&height=300&width=600&legend=true" width="600" height="300" frameborder="0"></iframe>
                </Grid>
            </Grid>
        </>
    )
}

export default Metrics;
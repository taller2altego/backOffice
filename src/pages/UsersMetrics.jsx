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
            <div style={{ marginTop: "8%", marginLeft: "3%" }}>
                <MetricsComponent navigate={navigate} />
            </div>
        </>
    )
}

export default Metrics;
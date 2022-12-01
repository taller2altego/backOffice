import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Location } from "react-router-dom";
import HistoryQuotes from "../components/quotes/historyQuotes";
import NavBar from "../components/NavBar";
import { setState } from "../utils/setState";

const Quotes = (props) => {
    const currentUserData = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setState(navigate, dispatch)
    }, []);

    return (
        <>
            <NavBar username={currentUserData.name} />
            <HistoryQuotes navigate={navigate} />
        </>
    )
}

export default Quotes;
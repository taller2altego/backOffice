import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import DetailQuoteComponent from "../components/quotes/detailQuote";
import NavBar from "../components/NavBar";
import { setState } from "../utils/setState";

const DetailQuote = () => {
	const currentUserData = useSelector((store) => store.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const location = useLocation();

	useEffect(() => {
		setState(navigate, dispatch)
	}, []);

	return (
		<>
			<div>
				<NavBar username={currentUserData.name} />
			</div>
			<div style={{ marginTop: "8%", marginLeft: "3%" }}>
				<DetailQuoteComponent id={location.state.id} navigate={navigate} />
			</div>
		</>
	)
}

export default DetailQuote;
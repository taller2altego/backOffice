import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import DetailUser from "../components/users/detailUsers";
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
			<div style={{ marginTop: "2%", marginLeft: "2%" }}>
				<DetailUser id={location.state.id} navigate={navigate} />
			</div>
		</>
	)
}

export default DetailQuote;
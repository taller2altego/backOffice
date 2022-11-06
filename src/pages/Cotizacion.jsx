import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import VariablesCot from "../components/variablesCot";
import { config } from "../Constants";
import { get } from "../utils/requests";
import { setState } from "../utils/setState";

const Cotizacion = () => {
    const currentUserData = useSelector((store) => store.user);
    const [cotizaciones, setCotizaciones] = useState    ("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAll = async (token) => {
          const result = await get(
            `${config.API_URL}/fees`,
            token
          );
        console.log(result)
        };
        if (sessionStorage.getItem("token")) {
          const token = sessionStorage.getItem("token");
          setState(navigate, dispatch);
          fetchAll(token);
        }else{
          setState(navigate, dispatch);
        }
      }, []);

    return(
        <>
            <NavBar username={currentUserData.name}/>
            <VariablesCot style={{ top: "9%" }} />
        </>
    )
}

export default Cotizacion
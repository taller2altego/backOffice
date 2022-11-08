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
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      setState(navigate, dispatch)
      }, []);

    return(
        <>
            <NavBar username={currentUserData.name}/>
            <VariablesCot />
        </>
    )
}

export default Cotizacion
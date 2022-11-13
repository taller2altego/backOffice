import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { get } from "../utils/requests";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setState } from "../utils/setState";
import { config } from "../Constants";
import CustomizedMenus from "./microcomponents/desplegable.jsx"

import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InfoIcon from '@mui/icons-material/Info';

export default function DataTable() {
  const [users, setUsers] = useState([]);

  const currentUserData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "First name", width: 300 },
    { field: "lastname", headerName: "Last name", width: 300 },
    { field: "email", headerName: "Email", width: 530 },
    { field: "phoneNumber", headerName: "Phone Number", width: 130 },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      renderCell: () => {
        const options = [
          { name: 'Vista detallada', renderIcon: () => <InfoIcon /> },
          { name: 'Bloquear', renderIcon: () => <RemoveCircleOutlineIcon /> },
          { name: 'Borrar', renderIcon: () => <DeleteIcon /> },
        ];
        return <CustomizedMenus options={options} />;
      },
    },
  ];

  useEffect(() => {
    const fetchAll = async (token) => {
      const result = await get(
        `${config.API_URL}/users`,
        token
      );
      setUsers(result.data.data);
    };
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setState(navigate, dispatch);
      fetchAll(token);
    } else {
      setState(navigate, dispatch);
    }
  }, []);

  return (
    <div style={{ margin: "0px", padding: "0px", height: "92vh", width: "100%" }}>
      <NavBar username={currentUserData.name} />
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

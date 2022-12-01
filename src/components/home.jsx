import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { get, patch } from "../utils/requests";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setState } from "../utils/setState";
import { config } from "../Constants";
import CustomizedMenus from "./microcomponents/desplegable.jsx"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import InfoIcon from '@mui/icons-material/Info';



export default function DataTable() {
  const [users, setUsers] = useState([]);

  const currentUserData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(0);

  const goToDetails = id => () => {
		navigate(`/detail-user/${id}`, { state: { id } });
	};

  const goToDenounces = (id, isBlocked, email, driverId) => () => {
		navigate(`/denounces-user/${id}`,  {state:{ id, isBlocked, email, driverId }});
	};
  
  const block = (id, isBlocked, email) => () => {
    const token = sessionStorage.getItem('token');
    return patch(`${config.API_URL}/users/${id}`, token, { isBlocked: !isBlocked, email }).then(setRefresh(!refresh))
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "First name", width: 300 },
    { field: "lastname", headerName: "Last name", width: 300 },
    { field: "email", headerName: "Email", width: 530 },
    { field: "phoneNumber", headerName: "Phone Number", width: 130 },
    { field: "status", headerName: "Estado", width: 130 },
    { field: "reportsCount", headerName: "Denuncias", width: 170 },

    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      renderCell: (params) => { 
        const driverId = params.row.drivers.length > 0 && params.row.drivers[0].id;
        const options = [
          { name: 'Ver detallada', renderIcon: () => <InfoIcon />, callback: goToDetails(params.id) },
          { name: 'Ver denuncias', renderIcon: () => <FormatListNumberedIcon />, callback: goToDenounces(params.row.id , params.row.isBlocked, params.row.email, driverId)},
          { name: 'Block/Unblock', renderIcon: () => <RemoveCircleOutlineIcon />, callback: block(params.row.id, params.row.isBlocked, params.row.email) }
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
      ).then(({ data: { data } }) => {
        return data.map((user) => {
          if (user.isBlocked){
            return {
              ...user,
              status: "Inactivo"
            }
          }else{
            return {
              ...user,
              status: "Activo"
            }
          }
        })

      });
      setUsers(result);
    };
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setState(navigate, dispatch);
      fetchAll(token);
    } else {
      setState(navigate, dispatch);
    }
  }, [ refresh ]);

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

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { get } from "../utils/requests";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setState } from "../utils/setState";
import { config } from "../Constants";

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
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          return prompt(JSON.stringify(thisRow, null, 4));
        };

        return <Button onClick={onClick}>Detalle</Button>;
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

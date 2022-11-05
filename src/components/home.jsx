import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { get } from "../utils/requests";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

export default function DataTable() {
  const [users, setUsers] = useState([]);
  const currentUserData = useSelector((store) => store.user);
  console.log(currentUserData);

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

        return <Button onClick={onClick}>Edit</Button>;
      },
    },
  ];

  useEffect(() => {
    const fetchAll = async (token) => {
      const result = await get(
        `https://altego-fiuber-apigateway.herokuapp.com/users`,
        token
      );
      setUsers(result.data.data);
    };
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      fetchAll(token);
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <NavBar username={currentUserData.name} />
      <DataGrid
        style={{ top: "9%" }}
        rows={users}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

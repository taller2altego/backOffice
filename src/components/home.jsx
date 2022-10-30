import React , { useEffect, useState }from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { get } from "../utils/requests";


export default function DataTable() {
  const [users, setUsers] = useState([])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 130 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api = params.api;
          const thisRow= {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
  
          return prompt(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>Edit</Button>;
      }
  },
  ];

  useEffect (() => {
    const fetchAll = async (token) => {
      const result = await get(`https://altego-fiuber-apigateway.herokuapp.com/users`,token)
      setUsers(result.data.data) 
    }
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token')
      fetchAll(token)
    }

  },[])

  useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[5]}
        checkboxSelection
      /> 
    </div>
  );
}

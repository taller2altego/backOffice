import { Input, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { post } from "../utils/requests";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slices/userSlice";
import { get } from "../utils/requests";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("n@s.com");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignIn = () => {
    return post(`https://altego-fiuber-apigateway.herokuapp.com/login`, {
      email: email,
      password: password,
    }).then(async (info) => {
      const {
        data: { id, token },
      } = info;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", id.toString());
      get(
        `https://altego-fiuber-apigateway.herokuapp.com/users/${id}`,
        token
      ).then((res) => {
        console.log("res = ") 
        console.log(res.data)
        dispatch(
          setUserData({
            name: res.data.name,
            lastname: res.data.lastname,
            phoneNumber: Number(res.data.phoneNumber),
            email: res.data.email,
            isDriver: res.data.isDriver,
          })
        );
        navigate("/");
      });
    });
  };

  return (
    <div
      className="App"
      align="center"
      style={{ backgroundColor: "grey", height: "100vh" }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <form
        className="form"
        style={{
          backgroundColor: "#eee9e9",
          width: 400,
          height: 300,
          borderRadius: 20,
        }}
      >
        <Grid
          container
          spacing={2}
          align="center"
          sx={{ borderColor: "grey.500" }}
        >
          <Grid item xs={16}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              align="center"
            >
              ADMIN LOGIN
            </Typography>
          </Grid>
          <Grid item xs={16}>
            <Input
              labelText="Email"
              value={email}
              id="email"
              formControlProps={{
                fullWidth: true,
              }}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </Grid>
          <Grid item xs={16}>
            <Input
              labelText="Password"
              value={password}
              id="password"
              formControlProps={{
                fullWidth: true,
              }}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </Grid>

          <Grid item xs={16}>
            <Button onClick={() => onSignIn()}>Log in</Button>
          </Grid>
        </Grid>
      </form>
      <h3>
        Esta pagina es solo utilizable por administradores de usuario. En caso
        de no poseer una cuenta perdir la creacion de la misma al superadmin.
      </h3>
    </div>
  );
}

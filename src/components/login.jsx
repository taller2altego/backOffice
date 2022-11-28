import { Input, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { post } from "../utils/requests";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setState } from "../utils/setState";
import { config } from "../Constants";
import InstantMessage from '../components/Error';

export default function Login() {
  const [email, setEmail] = useState("admin@fiuber.com");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")){
      navigate("/")
    }
  }, []);

  const onSignIn = () => {
    return post(`${config.API_URL}/login?isBackoffice=true`, {
      email: email,
      password: password,
    }).then((info) => {
      const {
        data: { id, token },
      } = info;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", id.toString());
      setState(navigate, dispatch)
      navigate("/")
      }).catch((err) => {
        setError(true)
      })
    }

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
      {error ? <InstantMessage message="Error al intentar ingresar" setState={setError} /> : ``}
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

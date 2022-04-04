import React from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Button,
  Paper,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { login, register } from "../api/index.js";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Login() {
  const history = useHistory();
  const [form, setForm] = React.useState(initialState);
  const [isRegistering, setIsRegistering] = React.useState(false);

  const switchMode = () => {
    setForm(initialState);
    setIsRegistering((prevIsRegistering) => !prevIsRegistering);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      register(form).then(
        () => {
          // history.push('/profile');
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      login(form).then(
        () => {
          history.push("/profile");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <Paper
        elevation={0}
        style={{
          padding: "1.8%",
          display: "grid",
          textAlign: "center",
          verticalAlign: "middle",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">
          {isRegistering ? "Join us" : "Welcome back"}
        </Typography>
        <Grid item>
          {isRegistering && (
            <TextField
              margin="normal"
              required
              label="Username"
              name="username"
              onChange={handleChange}
              autoFocus
            />
          )}
        </Grid>
        <Grid item>
          <TextField
            margin="normal"
            required
            name="email"
            label="Email address"
            onChange={handleChange}
            type="email"
          />{" "}
        </Grid>
        <Grid item>
          <TextField
            margin="normal"
            required
            name="password"
            label="Password"
            onChange={handleChange}
            type="password"
          />{" "}
        </Grid>
        <Grid item>
          {isRegistering && (
            <TextField
              margin="normal"
              required
              name="confirmPassword"
              label="Confirm password"
              onChange={handleChange}
              type="password"
            />
          )}
        </Grid>
        <Grid item>
          <Button
            disableElevation
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            {isRegistering ? "Register" : "Login"}
          </Button>
        </Grid>
        <Grid item>
          <Button style={{ paddingLeft: "0px" }} onClick={switchMode}>
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Join us"}
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

import React from "react";
import { useHistory } from "react-router-dom";
import {
  Alert,
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
  const [failMsg, setFailMsg] = React.useState("");
  const [succMsg, setSuccMsg] = React.useState("");

  const switchMode = () => {
    setForm(initialState);
    setIsRegistering((prevIsRegistering) => !prevIsRegistering);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      register(form).then(
        () => {
          setSuccMsg("Registration successful.");
          history.go("/profile");
        },
        (error) => {
          setFailMsg("Please try again.");
        }
      );
    } else {
      login(form).then(
        () => {
          setSuccMsg("Login successful.");
          history.go("/profile");
        },
        (error) => {
          setFailMsg("Please try again.");
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
        {failMsg.length > 0 && (
          <Grid item>
            <Alert severity="error">{failMsg}</Alert>
          </Grid>
        )}
        {succMsg.length > 0 && (
          <Grid item>
            <Alert severity="success">{succMsg}</Alert>
          </Grid>
        )}
      </Paper>
    </Grid>
  );
}

import React from "react";
import {
  Container,
  Button,
  Paper,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { register, login } from '../actions/user';

const initialState = { username: "", email: "", password: "", confirmPassword: "" };

export default function Login() {
  const [form, setForm] = React.useState(initialState);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const switchMode = () => {
    setForm(initialState);
    setIsRegistering((prevIsRegistering) => !prevIsRegistering);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      dispatch(register(form, history));
    } else {
      dispatch(login(form, history));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <Typography variant="h3">
          {isRegistering ? "Join us" : "Welcome back"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} sm={8} md={5}>
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
            <TextField
              margin="normal"
              required
              name="email"
              label="Email address"
              onChange={handleChange}
              type="email"
            />
            <TextField
              margin="normal"
              required
              name="password"
              label="Password"
              onChange={handleChange}
              type="password"
            />
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            {isRegistering ? "Register" : "Login"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isRegistering
                  ? "Already have an account? Login"
                  : "Don't have an account? Join us"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

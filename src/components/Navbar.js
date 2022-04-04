import * as React from "react";
import { Tab, Button, Tabs, Typography, Toolbar, Box, AppBar } from "@mui/material";
import { Link, useRouteMatch } from "react-router-dom";
import { getCurrentUser, logout } from "../api/index.js";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar elevation={0} sx={{ bgcolor: "#EDD8D8" }} position="static">
          <Toolbar>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
              sensiAnalyzer
            </Typography>
            <NavTabs />
          </Toolbar>
        </AppBar>
      </Box>
  );
}

function NavTabs() {
  const history = useHistory();
  const user = getCurrentUser();
  const routeMatch = useRouteMatch([
    "/ingredients",
    "/login",
    "/profile",
    "/",
  ]);
  const currentTab = routeMatch?.path;
  const logOutUser = () => {
    logout();
    history.go("/");
  };
  return (
    <>
    <Tabs value={currentTab}>
      <Tab label="Home" value="/" to="/" component={Link} />
      <Tab label="Ingredients" value="/ingredients" to="/ingredients" component={Link} />
      {user && <Tab label="Profile" value="/profile" to="/profile" component={Link} />}
      {!user && <Tab label="Login" value="/login" to="/login" component={Link} />}
    </Tabs>
      {user && <Button onClick={logOutUser} disableElevation>LOG OUT</Button> }
    </>
  );
}

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useRouteMatch } from "react-router-dom";
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
  const routeMatch = useRouteMatch([
    "/ingredients",
    "/login",
    "/register",
    "/",
  ]);
  const currentTab = routeMatch?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Home" value="/" to="/" component={Link} />
      <Tab label="Ingredients" value="/ingredients" to="/ingredients" component={Link} />
      <Tab label="Login" value="/login" to="/login" component={Link} />
      <Tab label="Register" value="/register" to="/register" component={Link} />
    </Tabs>
  );
}

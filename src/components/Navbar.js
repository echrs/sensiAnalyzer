import * as React from "react";
import { Tab, Button, Tabs, Typography, Toolbar, Box, AppBar } from "@mui/material";
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
  const user = null;
  const routeMatch = useRouteMatch([
    "/ingredients",
    "/login",
    "/profile",
    "/",
  ]);
  const currentTab = routeMatch?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Home" value="/" to="/" component={Link} />
      <Tab label="Ingredients" value="/ingredients" to="/ingredients" component={Link} />
      {user && <Tab label="Profile" value="/profile" to="/profile" component={Link} />}
      {user ? (
        <Button disableElevation>LOG OUT</Button> 
      ) : (
        <Tab label="Login" value="/login" to="/login" component={Link} />
      )}
    </Tabs>
  );
}

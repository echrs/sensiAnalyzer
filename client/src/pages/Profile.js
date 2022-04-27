import React from "react";
import { Chip, Stack, Grid, Paper, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { getCurrentUser } from "../api/index.js";

export default function Profile() {
  const user = getCurrentUser();
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

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
        <Typography variant="h3">Hi {user.username}!</Typography>
        <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="VIEW SAVED PRODUCTS" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="ADJUST FILTERS" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
        {/* <Stack direction="row" spacing={1}>
          <Chip label="Deletable" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
        </Stack> */}
      </Paper>
    </Grid>
  );
}

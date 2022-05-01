import React from "react";
import { Chip, Stack, Grid, Paper, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { getCurrentUser } from "../api/index.js";
import SettingsIcon from '@mui/icons-material/Settings';

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
          minWidth: "50%",
          minHeight: "50%",
          padding: "1.8%",
          display: "grid",
          textAlign: "center",
          verticalAlign: "middle",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">Hi {user.username}!</Typography>
        <Typography sx={{}}>Filters</Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
        <Typography sx={{}}>Saved products</Typography>

        

        {/* <Stack direction="row" spacing={1}>
          <Chip label="Deletable" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
        </Stack> */}
      </Paper>
    </Grid>
  );
}

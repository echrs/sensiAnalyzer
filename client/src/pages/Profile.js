import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

import { getCurrentUser } from "../api/index.js";
import Filters from "../components/Filters.js";
import SavedProducts from "../components/SavedProducts.js";

export default function Profile() {
  const user = getCurrentUser();

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
          maxWidth: "50%",
          minWidth: "50%",
          minHeight: "50%",
          padding: "1.8%",
          display: "grid",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            verticalAlign: "middle",
            alignItems: "center",
            justifyContent: "center",
          }}
          variant="h3"
        >
          Hi {user.username}!
        </Typography>
        <Filters />
        <SavedProducts />
      </Paper>
    </Grid>
  );
}

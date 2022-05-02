import * as React from "react";
import { Typography } from "@mui/material";
import { getCurrentUser } from "../api/index.js";
export default function SavedProducts() {
  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          verticalAlign: "middle",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        SAVED PRODUCTS
      </Typography>
    </>
  );
}

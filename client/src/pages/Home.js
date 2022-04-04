import React from "react";
import {
  Grid,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormControl,
  OutlinedInput,
  Button,
} from "@mui/material";

export default function Home() {
  return (
    <Grid
      spacing={1}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <Grid item>
        <Typography variant="h2">
          Sensitive skin? We are here to help.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h2">
          Select what you *don’t* want in your product.
        </Typography>
      </Grid>
      <Grid item>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="End"
            labelPlacement="end"
          />
          <FormControlLabel
            value="end"
            color="white"
            control={<Checkbox />}
            label="End"
            labelPlacement="end"
          />
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="End"
            labelPlacement="end"
          />
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="End"
            labelPlacement="end"
          />
        </FormGroup>
      </Grid>
      <Grid item>
        <FormControl sx={{ width: "90ch" }}>
          <OutlinedInput
            style={{background: "#ffffff"}}
            multiline
            minRows={10}
            placeholder="Paste your ingredients here..."
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Button disableElevation variant="contained">
          Go!
        </Button>
      </Grid>
    </Grid>
  );
}

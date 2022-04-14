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
  const [text, setText] = React.useState("");

  const analyze = () => {
    var arr = text.ingredientsText.split(',').map(a => a.split('|'));
    arr = arr[0].map(a => a.trim());
    arr = arr.map(a => a.replace(/\./g, ''));
    debugger;
  };

  const handleChange = (e) =>
    setText({ ...text, [e.target.name]: e.target.value });

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
            value="Fragrances"
            control={<Checkbox />}
            label="Fragrances"
          />
          <FormControlLabel
            value="Alcohols"
            control={<Checkbox />}
            label="Alcohols"
          />
          <FormControlLabel
            value="Parabens"
            control={<Checkbox />}
            label="Parabens"
          />
          <FormControlLabel
            value="Essential oils"
            control={<Checkbox />}
            label="Essential oils"
          />
        </FormGroup>
      </Grid>
      <Grid item>
        <FormControl sx={{ width: "90ch" }}>
          <OutlinedInput
            name="ingredientsText"
            style={{ background: "#ffffff" }}
            multiline
            minRows={10}
            placeholder="Paste your ingredients here..."
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          type="submit"
          onClick={analyze}
          disableElevation
          variant="contained"
        >
          Go!
        </Button>
      </Grid>
    </Grid>
  );
}

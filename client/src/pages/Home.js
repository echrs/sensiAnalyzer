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
  const filters = [
    { name: "Fragrances" },
    { name: "Alcohols" },
    { name: "Parabens" },
    { name: "Essential oils" },
  ];

  const [text, setText] = React.useState("");
  const [checkedState, setCheckedState] = React.useState(
    new Array(filters.length).fill(false)
  );

  const analyze = () => {
    var arr = text.ingredientsText.split(",").map((a) => a.split("|"));
    arr = arr[0].map((a) => a.trim());
    arr = arr.map((a) => a.replace(/\./g, ""));
    debugger;
  };

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    debugger;
  };

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
          {filters.map(({ name }, index) => {
            return (
              <FormControlLabel
                key={index}
                value={name}
                control={
                  <Checkbox
                    checked={checkedState[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                }
                label={name}
              />
            );
          })}
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

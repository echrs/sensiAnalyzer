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
import { parabens, alcohols, fragrances, surfactants } from "./Categories";

export default function Home() {
  const [text, setText] = React.useState("");

  const [filters, setFilters] = React.useState([
    { name: "Fragrances", checked: false, ingredients: fragrances, found: false },
    { name: "Alcohols", checked: false, ingredients: alcohols, found: false },
    { name: "Parabens", checked: false, ingredients: parabens, found: false },
    { name: "Surfactants", checked: false, ingredients: surfactants, found: false },
  ]);

  const analyze = () => {
    if (text.length > 0) {
      var arr = text.ingredientsText.split(/[,\\/|]/);
      arr = arr.map((a) => a.replace(/\./g, ""));
      arr = arr.map((a) => a.trim());
      arr = arr.map((a) => a.toLowerCase());
      var checkedFilters = filters.map((f, idx) => (f.checked ? idx : "")).filter(String);
      //todo
      var found = arr.some(a => filters[1].ingredients.includes(a));
      debugger;
    }
  };

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (position) => {
    let updatedFilters = filters.map((filter, index) => {
      if (index === position) {
        return { ...filter, checked: !filter.checked };
      }
      return filter;
    });

    setFilters(updatedFilters);
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
                    checked={filters[index].checked}
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

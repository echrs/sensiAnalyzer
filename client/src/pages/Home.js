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
  Modal,
  Box
} from "@mui/material";
import { parabens, alcohols, fragrances, surfactants } from "./Categories";

export default function Home() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [txt, setTxt] = React.useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [text, setText] = React.useState("");

  const [filters, setFilters] = React.useState([
    { name: "Fragrances", checked: false, ingredients: fragrances, found: false },
    { name: "Alcohols", checked: false, ingredients: alcohols, found: false },
    { name: "Parabens", checked: false, ingredients: parabens, found: false },
    { name: "Surfactants", checked: false, ingredients: surfactants, found: false },
  ]);

  const analyze = () => {
    if (text) {
      let arr = text.ingredientsText.split(/[,\\/|]/);
      arr = arr.map((a) => a.replace(/\./g, ""));
      arr = arr.map((a) => a.trim());
      arr = arr.map((a) => a.toUpperCase());
      let updatedFilters = filters.map((filter) => {
            return { ...filter, found: arr.some(a => filter.ingredients.includes(a)) };
      })
      setFilters(updatedFilters);
      let flagged = filters.some((filter) => filter.checked && filter.found);
      if(flagged) {
        setTxt("Oops"); 
        handleOpenModal();}
      else {
        setTxt("Yay"); 
        handleOpenModal();
      }
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
    <>
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
    <Modal
    open={openModal}
    onClose={handleCloseModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {txt}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
  </Modal>
  </>
  );
}

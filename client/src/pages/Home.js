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
  Box,
} from "@mui/material";
import { Context } from "../Context";

export default function Home() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [txt, setTxt] = React.useState("");
  const [flag, setFlag] = React.useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    borderRadius: "4px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [inputText, setInputText] = React.useState("");

  const { visibleFilterCtx } = React.useContext(Context);
  const [filters, setFilters] = visibleFilterCtx;

  const analyze = () => {
    if (inputText) {
      let arr = inputText.split(/[,\\/|]/);
      arr = arr.map((a) => a.replace(/\./g, ""));
      arr = arr.map((a) => a.trim());
      arr = arr.map((a) => a.toUpperCase());
      let updatedFilters = filters.map((filter) => {
        return {
          ...filter,
          found: arr.some((a) => filter.ingrList.includes(a)),
        };
      });
      setFilters(updatedFilters);
      let flagged = updatedFilters.filter(
        (filter) => filter.checked && filter.found
      );
      // :)
      if (flagged.length > 0) {
        switch (flagged.length) {
          case 1:
            setTxt(
              `Oh no! Your product contains ${flagged[0].name.toLowerCase()}.`
            );
            break;
          case 2:
            setTxt(
              `Oh no! Your product contains ${flagged[0].name.toLowerCase()} and ${flagged[1].name.toLowerCase()}.`
            );
            break;
          case 3:
            setTxt(
              `Oh no! Your product contains ${flagged[0].name.toLowerCase()}, ${flagged[1].name.toLowerCase()} and ${flagged[2].name.toLowerCase()}.`
            );
            break;
          case 4:
            setTxt(
              `Oh no! Your product contains ${flagged[0].name.toLowerCase()}, ${flagged[1].name.toLowerCase()}, ${flagged[2].name.toLowerCase()} and ${flagged[3].name.toLowerCase()}.`
            );
            break;
          case 5:
            setTxt(
              `Oh no! Your product contains ${flagged[0].name.toLowerCase()}, ${flagged[1].name.toLowerCase()}, ${flagged[2].name.toLowerCase()}, ${flagged[3].name.toLowerCase()} and ${flagged[4].name.toLowerCase()}.`
            );
            break;
          case 6:
            setTxt(
              `Oh no! Your product contains ${flagged[0].name.toLowerCase()}, ${flagged[1].name.toLowerCase()}, ${flagged[2].name.toLowerCase()}, ${flagged[3].name.toLowerCase()}, ${flagged[4].name.toLowerCase()} and ${flagged[5].name.toLowerCase()}.`
            );
            break;
          default:
            setTxt("Oops!");
            break;
        }
        setFlag(true);
        handleOpenModal();
      } else {
        setFlag(false);
        setTxt("Good news! This product should be good for you.");
        handleOpenModal();
      }
    }
  };

  const saveProduct = () => {
    handleCloseModal();
  };

  const resetAll = () => {
    setInputText("");
    let resetFilters = filters.map((item) => {
      return {
        ...item,
        checked: false,
        found: false,
      };
    });
    setFilters(resetFilters);
    handleCloseModal();
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
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
              name="ingredientsInputText"
              style={{ background: "#ffffff" }}
              multiline
              minRows={10}
              placeholder="Paste your ingredients here..."
              value={inputText}
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
          {flag && (
            <Button
              onClick={resetAll}
              disableElevation
              variant="contained"
              sx={{ marginTop: "2%" }}
            >
              TRY AGAIN?
            </Button>
          )}
          {!flag && (
            <Button
              onClick={saveProduct}
              disableElevation
              variant="contained"
              sx={{ marginTop: "2%" }}
            >
              SAVE
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
}

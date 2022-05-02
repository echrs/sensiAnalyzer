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
  TextField,
  Alert
} from "@mui/material";
import { Context } from "../Context";
import { getCurrentUser, addProduct } from "../api/index";

export default function Home() {
  const user = getCurrentUser();
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setFailMsg("");
    setSuccMsg("");
    setInputArr([]);
    setProdName("");
    setInputText("");
    let resetFilters = filters.map((item) => {
      return {
        ...item,
        checked: false,
        found: false,
      };
    });
    setFilters(resetFilters);
  };
  const [txt, setTxt] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const [failMsg, setFailMsg] = React.useState("");
  const [succMsg, setSuccMsg] = React.useState("");
  const [inputArr, setInputArr] = React.useState([]);
  const [prodName, setProdName] = React.useState("");

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

  const { visibleFilterCtx, allProductCtx } = React.useContext(Context);
  const [filters, setFilters] = visibleFilterCtx;

  const [products, setProducts, fetchProducts] = allProductCtx;

  const analyze = () => {
    if (inputText) {
      let arr = inputText.split(/[,\\/|]/);
      arr = arr.map((a) => a.replace(/\./g, ""));
      arr = arr.map((a) => a.trim());
      arr = arr.map((a) => a.toUpperCase());
      setInputArr(arr);
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
      if (flagged.length > 0) {
        let str = "";
        flagged.forEach((item, index) => {
          if (index + 1 === flagged.length) {
            str = str.concat(item.name.toLowerCase());
          } else {
            str = str.concat(item.name.toLowerCase() + ", ");
          }
        });
        setTxt(`Oh no! Your product contains ${str}.`);
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
    addProduct({
      name: prodName,
      ingrList: inputArr,
      userId: user.userId,
    }).then(
      () => {
        setSuccMsg("Product saved successfully.");
        setTimeout(() => handleCloseModal(), 1000);
        fetchProducts();
      },
      (error) => {
        setFailMsg("Please try again.");
        setTimeout(() => handleCloseModal(), 1000);
      }
    );
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleProdNameChange = (e) => {
    setProdName(e.target.value);
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
              onClick={handleCloseModal}
              disableElevation
              variant="contained"
              sx={{ marginTop: "2%" }}
            >
              TRY AGAIN?
            </Button>
          )}
          {!flag && (
            <>
              <Grid item>
                <TextField
                  margin="normal"
                  required
                  label="Product name"
                  name="name"
                  autoFocus
                  variant="standard"
                  onChange={handleProdNameChange}
                />
              </Grid>
              <Button
                onClick={saveProduct}
                disableElevation
                variant="contained"
                sx={{ marginTop: "2%" }}
              >
                SAVE
              </Button>
              <Button
                onClick={handleCloseModal}
                disableElevation
                variant="contained"
                sx={{ marginTop: "2%", marginLeft: "3%" }}
              >
                CANCEL
              </Button>
              {failMsg.length > 0 && (
                <Grid item>
                  <Alert sx={{ marginTop: "2%" }} severity="error">{failMsg}</Alert>
                </Grid>
              )}
              {succMsg.length > 0 && (
                <Grid item>
                  <Alert sx={{ marginTop: "2%" }} severity="success">{succMsg}</Alert>
                </Grid>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

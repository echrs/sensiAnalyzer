import React from "react";
import {
  IconButton,
  Box,
  Modal,
  TextField,
  Button,
  Chip,
  Stack,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Alert,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  getCurrentUser,
  addFilter,
  deleteFilter,
  updateFilter,
} from "../api/index.js";
import { Context } from "../Context";

const initialState = {
  name: "",
  ingrList: "",
  userId: "",
  visibility: false,
  isDefault: false,
};

export default function Profile() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsAdd(false);
    setFailMsg("");
    setSuccMsg("");
    setFormEdit(initialState);
    setIdx();
  };
  const [failMsg, setFailMsg] = React.useState("");
  const [succMsg, setSuccMsg] = React.useState("");

  const [isAdd, setIsAdd] = React.useState(false);
  const [formEdit, setFormEdit] = React.useState(initialState);
  const [formAdd, setFormAdd] = React.useState(initialState);

  const user = getCurrentUser();
  const { allFilterCtx } = React.useContext(Context);
  const [filters, setFilters, fetchFilters] = allFilterCtx;
  const [idx, setIdx] = React.useState();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAdd) {
      let form = formAdd;
      form.userId = user.userId;
      if (form.ingrList.length > 0) {
        form.ingrList = prepIngrList(form.ingrList);
      }
      setFormAdd(form);
      addFilter(form).then(
        () => {
          setSuccMsg("Filter added successfully.");
          fetchFilters();
          setTimeout(() => handleCloseModal(), 1000);
        },
        (error) => {
          setFailMsg("Please try again.");
          setTimeout(() => handleCloseModal(), 1000);
        }
      );
    } else {
      if (idx >= 0) {
        if (formEdit.ingrList.length > 0) {
          formEdit.ingrList = prepIngrList(formEdit.ingrList);
        }
        let data = { name: formEdit.name, ingrList: formEdit.ingrList };
        await updateFilter(data, filters[idx]._id);
        setSuccMsg("Filter edited successfully.");
        fetchFilters();
        setTimeout(() => handleCloseModal(), 1000);
      }
    }
  };

  const handleChange = (e) => {
    if (isAdd) setFormAdd({ ...formAdd, [e.target.name]: e.target.value });
    else setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const prepIngrList = (ingrList) => {
    let updatedIngrList = ingrList.split(/[,\\/|]/);
    updatedIngrList = updatedIngrList.map((a) => a.replace(/\./g, ""));
    updatedIngrList = updatedIngrList.map((a) => a.trim());
    updatedIngrList = updatedIngrList.map((a) => a.toUpperCase());
    return updatedIngrList;
  }

  const addNewFilter = () => {
    handleOpenModal();
    setIsAdd(true);
  };

  const removeFilter = async (e, index) => {
    if (index >= 0) {
      await deleteFilter(filters[index]._id);
      fetchFilters();
    }
  };

  const editFilter = (e, index) => {
    handleOpenModal();
    let modifiedFilters = filters.map((filter, idx) => {
      if (idx === index) {
        return { ...filter, ingrList: filter.ingrList.join(', ').toLowerCase() };
      }
      return filter;
    });
    setFormEdit(modifiedFilters[index]);
    setIdx(index);
  };

  const setVisibility = async (e, index, value) => {
    if (index >= 0) {
      let data = { visibility: value };
      await updateFilter(data, filters[index]._id);
      fetchFilters();
    }
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
        <Typography
          sx={{
            textAlign: "center",
            verticalAlign: "middle",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          FILTERS{" "}
          <IconButton
            sx={{ paddingBottom: "8px" }}
            size="small"
            aria-label="Add"
            onClick={addNewFilter}
          >
            <AddIcon />
          </IconButton>
        </Typography>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            textAlign: "left",
            alignItems: "left",
          }}
        >
          {filters.map(({ name, isDefault, visibility }, idx) => {
            return (
              <ListItem key={idx}>
                <ListItemText primary={name} />
                <ListItemSecondaryAction>
                  {!isDefault && (
                    <>
                      <IconButton
                        edge="end"
                        aria-label="Delete"
                        onClick={(e) => removeFilter(e, idx)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="Edit"
                        onClick={(e) => editFilter(e, idx)}
                      >
                        <SettingsIcon />
                      </IconButton>
                    </>
                  )}
                  {!visibility && (
                    <IconButton
                      edge="end"
                      aria-label="VisibleNot"
                      onClick={(e) => setVisibility(e, idx, true)}
                    >
                      <VisibilityOffIcon />
                    </IconButton>
                  )}
                  {visibility && (
                    <IconButton
                      edge="end"
                      aria-label="Visible"
                      onClick={(e) => setVisibility(e, idx, false)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
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
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {isAdd && "Add filter"}
              {!isAdd && "Edit filter"}
            </Typography>
            <Grid item>
              <TextField
                margin="normal"
                required
                label="Name"
                name="name"
                defaultValue={formEdit.name}
                onChange={handleChange}
                autoFocus
                variant="standard"
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                required
                label="Ingredient list"
                name="ingrList"
                defaultValue={formEdit.ingrList}
                helperText="For example: Benzene, azelaic acid"
                onChange={handleChange}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button
                disableElevation
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: "2%", marginBottom: "2%" }}
              >
                Save
              </Button>
            </Grid>
            {failMsg.length > 0 && (
              <Grid item>
                <Alert severity="error">{failMsg}</Alert>
              </Grid>
            )}
            {succMsg.length > 0 && (
              <Grid item>
                <Alert severity="success">{succMsg}</Alert>
              </Grid>
            )}
          </Box>
        </Modal>
      </Paper>
    </Grid>
  );
}

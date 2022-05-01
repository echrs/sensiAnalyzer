import React from "react";
import {
  IconButton,
  Box,
  Modal,
  Chip,
  Stack,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getCurrentUser } from "../api/index.js";
import { Context } from "../Context";

export default function Profile() {
  //modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsAdd(false);
  }
  const [isAdd, setIsAdd] = React.useState(false);

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

  //profile
  const user = getCurrentUser();
  const { filterCtx } = React.useContext(Context);
  const [filters, setFilters] = filterCtx;

  const addFilter = () => {
    handleOpenModal();
    setIsAdd(true);
  }

  const deleteFilter = (e, index) => {
  }

  const editFilter = (e, index) => {
    handleOpenModal();
  }

  const setVisibility = (e, index, value) => {

  }

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
            onClick={addFilter}
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
                      <IconButton edge="end" aria-label="Delete" onClick={(e) => deleteFilter(e, idx)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="Edit" onClick={(e) => editFilter(e, idx)}>
                        <SettingsIcon />
                      </IconButton>
                    </>
                  )}
                  {visibility && (
                    <IconButton edge="end" aria-label="VisibleNot" onClick={(e) => setVisibility(e, idx, false)}>
                      <VisibilityOffIcon />
                    </IconButton>
                  )}
                  {!visibility && (
                    <IconButton edge="end" aria-label="Visible" onClick={(e) => setVisibility(e, idx, true)}>
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

        </Box>
      </Modal>
        {/* <Stack direction="row" spacing={1}>
          <Chip label="Deletable" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
        </Stack> */}
      </Paper>
    </Grid>
  );
}

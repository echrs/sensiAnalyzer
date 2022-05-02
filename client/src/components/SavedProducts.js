import * as React from "react";
import {
  Typography,
  Accordion,
  IconButton,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Context } from "../Context";
import { deleteProduct } from "../api/index.js";

export default function SavedProducts() {
  const { allProductCtx } = React.useContext(Context);
  const [products, setProducts, fetchProducts] = allProductCtx;

  const removeProduct = async (e, index) => {
    if (index >= 0) {
      await deleteProduct(products[index]._id);
      fetchProducts();
    }
  };

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          verticalAlign: "middle",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2%",
        }}
      >
        SAVED PRODUCTS
      </Typography>
      {products.map(({ name, ingrListStr }, idx) => {
        return (
          <Accordion key={idx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid>
                <Grid item>
                  <Typography>{ingrListStr}</Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="row-reverse">
                    <Grid item>
                      <IconButton
                        sx={{ marginRight: "2%" }}
                        edge="end"
                        aria-label="Delete"
                        onClick={(e) => removeProduct(e, idx)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}

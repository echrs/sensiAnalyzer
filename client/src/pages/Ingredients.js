import * as React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { fetchAllIngredients } from "../api/index.js";
import MUIDataTable from "mui-datatables";

function createData(RATING, NAME, DESCRIPTION) {
  return {
    RATING,
    NAME,
    DESCRIPTION,
  };
}

export default function CollapsibleTable() {
  const [data, setData] = React.useState([]);
  const rows = [];

  React.useEffect(() => {
    fetchAllIngredients().then((resp) => {
      setData(resp.data);
    });
  }, []);

  data.forEach((item) => {
    rows.push(createData(item.rating, item.name, item.description));
  });

  const columns = ["RATING", "NAME", "DESCRIPTION"];
  const options = {
    print: "false",
    download: "false",
    filterType: "checkbox",
    selectableRows: "none",
    elevation: 0,
  };
  return (
    <Container>
      <Paper
        elevation={0}
        style={{
          padding: "1.8%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          sx={{ marginBottom: "-5%" }}
        >
          Ingredient list
        </Typography>
        <MUIDataTable
          title={""}
          data={rows}
          columns={columns}
          options={options}
        />
      </Paper>
    </Container>
  );
}

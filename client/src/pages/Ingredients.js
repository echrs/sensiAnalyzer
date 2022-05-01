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

export default function Ingredients() {
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

  const columns = [
    {
      name: "RATING",
      options: {
        filter: true,
      },
    },
    {
      name: "NAME",
      options: {
        filter: false,
      },
    },
    {
      name: "DESCRIPTION",
      options: {
        filter: false,
      },
    },
  ];
  const options = {
    print: false,
    download: false,
    filterType: "checkbox",
    selectableRows: "none",
    elevation: 0,
    viewColumns: false
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
          sx={{ marginBottom: "-1%" }}
        >
          Look up ingredients
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

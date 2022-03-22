const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("Connected."))
  .catch((err) => console.log(err));

app.use("/ingredient", require("./routes/ingredient"));
app.use("/user", require("./routes/user"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

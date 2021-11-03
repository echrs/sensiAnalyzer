const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const axios = require('axios');
// const cheerio = require('cheerio');

// axios.get('https://www.paulaschoice.com/ingredient-dictionary').then(({ data }) => {
//   const $ = cheerio.load(data);
//   console.log($(".name.ingredient-name > a").html());
// });
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
const router = require("express").Router();
let Ingredient = require("../models/ingredient");

router.route("/").get((req, res) => {
  Ingredient.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

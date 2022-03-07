const router = require("express").Router();
let Ingredient = require("../models/ingredient.model");

router.route("/").get((req, res) => {
  Ingredient.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Ingredient.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

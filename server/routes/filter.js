const router = require("express").Router();
let Filter = require("../models/filter");

router.route("/add").post(async (req, res) => {
  const { name, ingrList, userId, visibility, isDefault } = req.body;
  Filter.create({ name, ingrList, userId, visibility, isDefault }).then(filter => res.json({ response: "Successfully added", payload: filter})).catch(err => res.status(400).json({response: "Something went wrong", message: err.message}));
});

router.route("/delete/:id").delete((req, res) => {
  Filter.findByIdAndDelete(req.params.id).then(() => res.json({ response: "Successfully deleted" })).catch(err => res.status(400).json({ response: "Something went wrong", message: err.message }));
});

router.route("/update/:id").put((req, res) => {
  Filter.findByIdAndUpdate(req.params.id, req.body).then(() => res.json({ response: "Successfully updated" })).catch(err => res.status(400).json({ response: "Something went wrong", message: err.message }));
});

router.route("/").get((req, res) => {
  const userId = req.query.userId;
  Filter.find({ userId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
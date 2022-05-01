const router = require("express").Router();
let Filter = require("../models/filter");

router.route("/add").post(async (req, res) => {
    const { name, ingrList, userId, visibility, defaultF } = req.body;
    try {
      const existingFilter = await Filter.findOne({ name });
      if (existingFilter) return res.status(400).json({ message: "A filter with this name already exists!" });
      await Filter.create({ name, ingrList, userId, visibility, defaultF });
      res.status(201).json({ message: "Successfully added" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  });

  router.route("/").get((req, res) => {
    const userId = req.query.userId;
    Filter.find().or([{ userId }, { default: true }])
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });

  module.exports = router;
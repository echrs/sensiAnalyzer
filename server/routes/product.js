const router = require("express").Router();
let Product = require("../models/product");

router.route("/add").post(async (req, res) => {
    const { name, ingrList, userId } = req.body;
    Product.create({ name, ingrList, userId }).then(product => res.json({ response: "Successfully added", payload: product})).catch(err => res.status(400).json({response: "Something went wrong", message: err.message}));
});

router.route("/delete/:id").delete((req, res) => {
    Product.findByIdAndDelete(req.params.id).then(() => res.json({ response: "Successfully deleted" })).catch(err => res.status(400).json({ response: "Something went wrong", message: err.message }));
});

router.route("/").get((req, res) => {
    const userId = req.query.userId;
    Product.find().or([{ userId }, { isDefault: true }])
    .then((data) => {
        res.json(data);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
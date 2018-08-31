const express = require("express");
const router = express.Router();


//Import model burger.js to use
let burger = require("../models/burger");

//Set up all routes
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        let hbsObject = {
            burger: data.filter(function (burger) { return burger.devoured }),
            eatenBurger: data.filter(function (burger) { return !burger.devoured })
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name"
    ], [
            req.body.burger_name
        ], function (result) {
            res.json({ id: result.insertId });
        });
});

router.put("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            //res.status(200).end();
            console.log("Still Hungry?")
            res.json(result);
        }
    });
});

module.exports = router;
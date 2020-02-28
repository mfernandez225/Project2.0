const burger = require("../models/stocks.js");
const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  burger.all(burgers => {
    res.render("", {
      burgers
    });
  });
});

module.exports = router;

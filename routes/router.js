const express = require("express");
const router = express.Router();
const { Server } = require("http");

const controller = require("../controllers/controller");

router.get("/articles", (req, res) => {
  const str = [
    {
      tiltle: "test",
      msg: "Lorenipsum patatitata",
      author: "maryse Condé",
    },
  ];
  res.end(JSON.stringify(str));
});

router.post("/addArticles", (req, res) => {
  res.end("NA");
});

module.exports = router;

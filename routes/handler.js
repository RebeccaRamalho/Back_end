const express = require("express");
const router = express.Router();

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

const model = require("../model/model");
const { request } = require("express");
require("dotenv").config();

exports.publishArticles = async (req, res) => {
  const { id } = req.admin;

  console.log("admin", id);

  const {
    title,
    img,
    tags,
    resume_article,
    content_article,
    author_article,
    video,
  } = req.body;

  const article = {
    title,
    img,
    tags,
    resume_article,
    content_article,
    author_article,
    video,
  };

  await model.createArticle(article, id, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

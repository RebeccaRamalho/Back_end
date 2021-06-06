const model = require("../model/model");
const { request } = require("express");
require("dotenv").config();

/*Admin i want to create an article*/
exports.publishArticles = (req, res) => {
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

  model.createArticle(article, id, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*admin i want to see all the articles */
exports.getArticles = (req, res) => {
  model.getAllArticle((error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*user i want to see the last 3 articles*/
exports.getLastArticles = (req, res) => {
  model.get3LastArticle((error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*user i want to see the details of an article*/
exports.articleDetails = (req, res) => {
  const { article_id } = req.params;

  model.getArticleDetails(article_id, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*admin i want to delete an article */
exports.deleteArticles = (req, res) => {
  const { article_id } = req.params;
  model.delete_an_article(article_id, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    console.log("article deleted");
  });
};

/*user i want to add a review */
exports.postReview = (req, res) => {
  const { last_name, first_name, opinion, role } = req.body;

  const review = {
    last_name,
    first_name,
    opinion,
    role,
  };
/*user i want to add a review */
  model.addAReview(review, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};
/*user i want to get all reviews */
exports.getReview = (req, res) => {
  console.log("CONTROLLER DONE");
  model.getAllReview((error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};
// /*user i want to get all reviews */

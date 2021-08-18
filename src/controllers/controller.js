const model = require("../model/model");
const { request } = require("express");
require("dotenv").config();
const ApiError = require("../error/ApiError");

/*READ*/

/*user i want to see all the articles */
exports.getArticles = (req, res) => {
  model.getllArticle((error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }
    res.status(200).json(result);
  });
};

/*user i want to see the last 3 articles*/
exports.getLastArticles = (req, res) => {
  model.get3LastArticle((error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }
    res.status(200).json(result);
  });
};

/*user i want to see the details of an article*/
exports.articleDetails = (req, res) => {
  const { article_id } = req.params;

  model.getArticleDetails(article_id, (error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }
    res.status(200).json(result);
  });
};

/*user i want to see the 3 Last review*/
exports.get3Reviews = (req, res) => {
  model.getLastReview((error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }
    res.status(200).json(result);
  });
};

/*user i want to see all article tag from a specifiq tag */
exports.getArticlesTag = (req, res) => {
  const { tags } = req.params;
  console.log("tags", tags);
  model.getArticlesTag(tags, (error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }
    res.status(200).json(result);
  });
};

/*UPTDATE*/

/*user i want to add a review */
exports.postReview = (req, res) => {
  const { last_name, first_name, opinion, role } = req.body;

  const review = {
    last_name,
    first_name,
    opinion,
    role,
  };

  model.addAReview(review, (error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }
    res.status(200).json(review);
  });
};

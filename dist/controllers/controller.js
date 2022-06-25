"use strict";

var model = require("../model/model");

var _require = require("express"),
    request = _require.request;

require("dotenv").config();

var ApiError = require("../error/ApiError");
/*READ*/

/*user i want to see all the articles */


exports.getArticles = function (req, res, next) {
  model.getllArticle(function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }

    res.status(200).json(result);
  });
};
/*user i want to see the last 3 articles*/


exports.getLastArticles = function (req, res, next) {
  model.get3LastArticle(function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }

    res.status(200).json(result);
  });
};
/*user i want to see the details of an article*/


exports.articleDetails = function (req, res, next) {
  var article_id = req.params.article_id;
  model.getArticleDetails(article_id, function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }

    res.status(200).json(result);
  });
};
/*user i want to see the 3 Last review*/


exports.get3Reviews = function (req, res, next) {
  model.getLastReview(function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }

    res.status(200).json(result);
  });
};
/*user i want to see all article tag from a specifiq tag */


exports.getArticlesTag = function (req, res, next) {
  var tags = req.params.tags;
  console.log("tags", tags);
  model.getArticlesTag(tags, function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }

    res.status(200).json(result);
  });
};
/*UPTDATE*/

/*user i want to add a review */


exports.postReview = function (req, res, next) {
  var _req$body = req.body,
      last_name = _req$body.last_name,
      first_name = _req$body.first_name,
      opinion = _req$body.opinion,
      role = _req$body.role;
  var review = {
    last_name: last_name,
    first_name: first_name,
    opinion: opinion,
    role: role
  };
  model.addAReview(review, function (error, result, next) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }

    res.status(200).json(review);
  });
};
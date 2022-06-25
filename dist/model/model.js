"use strict";

var db = require("../db");

var mysql = require("mysql2");
/*READ*/

/*user i want to see all the article*/


exports.getllArticle = function (callback) {
  db.execute("select * from article;", function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*user i want to see the last 3 articles article*/


exports.get3LastArticle = function (callback) {
  db.execute("select * from article order by article_id desc limit 3;", function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*user i want to see the details of an article*/


exports.getArticleDetails = function (article_id, callback) {
  db.execute("select * from article  where article_id=".concat(article_id, ";"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*user i want to get the last 3 review*/


exports.getLastReview = function (callback) {
  db.execute("SELECT * FROM reviewer order by id desc limit 3;", function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*user i want to get all article tag from a specifiq tag*/


exports.getArticlesTag = function (tags, callback) {
  db.execute("SELECT * from article where tags =\"".concat(tags, "\";"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*UPTDATE*/

/*user i want to add a review*/


exports.addAReview = function (review, callback) {
  db.execute("INSERT INTO reviewer (last_name, first_name, opinion, role) values (".concat(mysql.escape(review.last_name), ", ").concat(mysql.escape(review.first_name), ", ").concat(mysql.escape(review.opinion), ", ").concat(mysql.escape(review.role), ");"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
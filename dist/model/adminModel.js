"use strict";

var db = require("../db");

var mysql = require("mysql2");
/*CREATE*/

/*creation of the _'s account*/


exports.createAccount = function (admin, callback) {
  db.execute("INSERT INTO admins (user_name, email, password) VALUES (".concat(mysql.escape(admin.user_name), ",  ").concat(mysql.escape(admin.email), ", ").concat(mysql.escape(admin.password), ");"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*admin i want to create an article*/


exports.createArticle = function (article, admin_id, callback) {
  db.execute("INSERT INTO article(title, img, tags, resume_article, content_article, author_article, video, admin_id) VALUES (\n        ".concat(mysql.escape(article.title), ",\n        ").concat(mysql.escape(article.img), ",\n        ").concat(mysql.escape(article.tags), ",\n        ").concat(mysql.escape(article.resume_article), ",\n        ").concat(mysql.escape(article.content_article), ",\n        ").concat(mysql.escape(article.author_article), ",\n        ").concat(mysql.escape(article.video), ", \n        ").concat(mysql.escape(admin_id), ")"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*READ*/

/*admin i want to connect*/


exports.getAdmin = function (email, callback) {
  db.execute("SELECT * FROM admins WHERE email = ".concat(mysql.escape(email), ";"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*admin i want to see all articles*/


exports.getllArticle = function (callback) {
  db.execute("select * from article;", function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*admin i want to see the details of an article*/


exports.getArticleDetails = function (article_id, callback) {
  db.execute("select * from article  where article_id=".concat(article_id, ";"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*admin i want to get one review*/


exports.getAReview = function (id, callback) {
  db.execute("SELECT * FROM reviewer WHERE id=".concat(id, ";"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*admin i want to get all reviews*/


exports.getAllReview = function (callback) {
  db.execute("SELECT * FROM reviewer;", function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*bonus_admin i want to get all article tag from a specifiq tag*/


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

/*admin i want to update an article*/


exports.updateArticles = function (article_id, admin_id, article, callback) {
  db.execute("UPDATE article  SET title=\"".concat(article.title, "\", img=\"").concat(article.img, "\",tags=\"").concat(article.tags, "\", resume_article=\"").concat(article.resume_article, "\", content_article=\"").concat(article.content_article, "\", author_article=\"").concat(article.author_article, "\", video=\"").concat(article.video, "\" WHERE article_id = ").concat(article_id, " AND admin_id= ").concat(admin_id, " ;"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*DELETE*/

/*admin i want to delete an article*/


exports.delete_an_article = function (article_id, callback) {
  db.execute("DELETE FROM article WHERE article_id = ".concat(article_id, ";"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
/*admin i want to delete a review*/


exports.delete_an_review = function (id, callback) {
  db.execute("DELETE FROM reviewer WHERE id =".concat(id, ";"), function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};
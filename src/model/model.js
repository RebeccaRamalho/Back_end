const db = require("../db");
const mysql = require("mysql2");

                                   /*READ*/

/*user i want to see all the article*/

exports.getllArticle = (callback) => {
  db.query(`select * from article;`, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

/*user i want to see the last 3 articles article*/
exports.get3LastArticle = (callback) => {
  db.query(
    `select * from article order by article_id desc limit 3;`,
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
};
/*user i want to see the details of an article*/
exports.getArticleDetails = (article_id, callback) => {
  db.query(
    `select * from article  where article_id=${article_id};`,
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
};

/*user i want to get the last 3 review*/
exports.getLastReview = (callback) => {
  db.query(`SELECT * FROM reviewer order by id desc limit 3;`, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

/*user i want to get all article tag from a specifiq tag*/
exports.getArticlesTag = (tags, callback) => {
  db.query(`SELECT * from article where tags ="${tags}";`, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

                                     /*UPTDATE*/

/*user i want to add a review*/
exports.addAReview = (review, callback) => {
  db.query(
    `INSERT INTO reviewer (last_name, first_name, opinion, role) values (${mysql.escape(
      review.last_name
    )}, ${mysql.escape(review.first_name)}, ${mysql.escape(
      review.opinion
    )}, ${mysql.escape(review.role)});`,

    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
};

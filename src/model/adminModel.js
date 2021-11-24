const db = require("../db");
const mysql = require("mysql2");

/*CREATE*/
/*creation of the _'s account*/
exports.createAccount = (admin, callback) => {
  db.execute(
    `INSERT INTO admins (user_name, email, password) VALUES (${mysql.escape(
      admin.user_name
    )},  ${mysql.escape(admin.email)}, ${mysql.escape(admin.password)});`,
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
};

/*admin i want to create an article*/
exports.createArticle = (article, admin_id, callback) => {
  db.execute(
    `INSERT INTO article(title, img, tags, resume_article, content_article, author_article, video, admin_id) VALUES (
        ${mysql.escape(article.title)},
        ${mysql.escape(article.img)},
        ${mysql.escape(article.tags)},
        ${mysql.escape(article.resume_article)},
        ${mysql.escape(article.content_article)},
        ${mysql.escape(article.author_article)},
        ${mysql.escape(article.video)}, 
        ${mysql.escape(admin_id)})`,
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
};
/*READ*/

/*admin i want to connect*/
exports.getAdmin = (email, callback) => {
  db.execute(
    `SELECT * FROM admins WHERE email = ${mysql.escape(email)};`,
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
};

/*admin i want to see all articles*/
exports.getllArticle = (callback) => {
  db.execute(`select * from article;`, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

/*admin i want to see the details of an article*/
exports.getArticleDetails = (article_id, callback) => {
  db.execute(
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

/*admin i want to get one review*/
exports.getAReview = (id, callback) => {
  db.execute(`SELECT * FROM reviewer WHERE id=${id};`, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

/*admin i want to get all reviews*/
exports.getAllReview = (callback) => {
  db.execute(`SELECT * FROM reviewer;`, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

/*bonus_admin i want to get all article tag from a specifiq tag*/
exports.getArticlesTag = (tags, callback) => {
  db.execute(`SELECT * from article where tags ="${tags}";`, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

/*UPTDATE*/

/*admin i want to update an article*/
exports.updateArticles = (article_id, admin_id, article, callback) => {
  db.execute(
    `UPDATE article  SET title="${article.title}", img="${article.img}",tags="${article.tags}", resume_article="${article.resume_article}", content_article="${article.content_article}", author_article="${article.author_article}", video="${article.video}" WHERE article_id = ${article_id} AND admin_id= ${admin_id} ;`,

    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
};
/*DELETE*/

/*admin i want to delete an article*/
exports.delete_an_article = (article_id, callback) => {
  db.execute(
    `DELETE FROM article WHERE article_id = ${article_id};`,
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
};

/*admin i want to delete a review*/
exports.delete_an_review = (id, callback) => {
  db.execute(`DELETE FROM reviewer WHERE id =${id};`, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

const mysql = require("mysql2");
const db = require("../db");
const { request, response } = require("express");

/////////////////requete pour la database=db.js//////

// ///////CREER UN COMPTE ADMIN

//I_Admin i want to connect
/*1_checking if admin exist the db*/
exports.getAdmin = (email, callback) => {
  db.query(
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

/*2_creation of the admin's account*/
exports.createAccount = (admin, callback) => {
  db.query(
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
/*3_admin i want to create an article*/
exports.createArticle = (article, admin_id, callback) => {
  db.query(
    `INSERT INTO article(admin_id, title, img, tags, resume_article, content_article, author_article, video) VALUES ("${admin_id}","${article.title}","${article.img}","${article.tags}","${article.resume_article}","${article.content_article}","${article.author_article}","${article.video}")`,
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
};

/*4_Admin i want to see all articles (attention on n'a oublié la possibilité que l'utilisateur puisse avoir accès à tous les articles => à travailler plus tard quand l'asso aura plus de subtance au niveau des articles*/
exports.getallArticle = (callback) => {
  db.query(`select * from article;`, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};
/*5_user i want to see the last 3 articles article*/
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
/*6_user i want to see the details of an article*/
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
/*7_Admin i want to delete an article*/
exports.delete_an_article = (article_id, callback) => {
  db.query(
    `DELETE FROM article WHERE article_id = ${article_id};`,
    (err, response) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, response);
    }
  );
};
/*8_user i want to add a review*/
exports.addAReview = (review, callback) => {
  db.query(
    `INSERT INTO reviewer (last_name, first_name, opinion, role) values ("${review.last_name}", "${review.first_name}", "${review.opinion}", "${review.role}");`,
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    }
  );
};
/*9_user i want to get all review*/
exports.getAllReview = (callback) => {
  db.query(
    `SELECT * from reviewer order by id asc limit 3;`,
    (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log("RESPONSE "+ result);
      callback(null, result);
    }
  );
};

// ////model non async (donc avec callback) pour la modification d'un article
// exports.alter_a_article = (article_id, callback, admin_id, article) => {
//   db.query(
//     `UPDATE INTO article (title,img,tags, resume_article, content_article, author_article, video, admin_id) VALUES ("${admin_id}","${article.title}","${article.img}","${article.tags}","${article.resume_article}","${article.content_article}","${article.author_article}","${article.video}") WHERE article_id = ${article_id} and admin_id= ${admin_id} ;`,
//     (err, response) => {
//       if (err) {
//         callback(err, null);
//         return;
//       }
//       callback(null, response);
//     }
//   );
// };

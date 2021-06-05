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

/*2_*/
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
exports.createArticle = (article, admin_id, callback) =>
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

// signup
// exports.createAccount = async (admin) => await db.query(`INSERT INTO admins(email, password, user_name) VALUES(${mysql.escape(admin.email)}, ${mysql.escape(admin.password)}, ${mysql.escape(admin.user_name)});`)

// /////POUR QU'UN ADMIN SE CONNECT
// exports.loginAdmin = async (email) =>
//   await db.query(`SELECT * FROM admins WHERE email = ${mysql.escape(email)};`);

// exports.getAdmin = async (email) =>
//     await db.query(`SELECT * FROM admins WHERE email = ${mysql.escape(email)};`);

///model async (donc pas de calback) pour la creation d'un article

// ////model non async (donc avec callback) pour la supression d'un article
// exports.delete_a_article = (article_id, callback, admin_id) => {
//   db.query(
//     `DELETE FROM article WHERE article.id = ${article_id} AND admin_id = ${admin_id};`,
//     (err, response) => {
//       if (err) {
//         callback(err, null);
//         return;
//       }
//       callback(null, response);
//     }
//   );
// };

// ////model non async (donc avec callback) pour la supression d'un article
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

////model async pour la récupération de tout les articles
// exports.get_all_article = async ( callback) =>
//  await db.query (`SELECT * FROM article`);

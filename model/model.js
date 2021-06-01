const mysql = require("mysql2");
const db = require("../db");

function queryResponse(callback, err, status_ok) {
  if (err) {
    callback(err, null);
    return;
  }
  callback(null, status_ok);
}
/////////////////requete pour la database=db.js//////

///////CREER UN COMPTE ADMIN
exports.createAccount = async (admin) =>
  await db.query(
    `INSERT INTO admins (admin_id, user_name, email, password) VALUES (${mysql.escape(
      admin.email
    )}, ${mysql.escape(admin.password)}, ${mysql.escape(admin.user_name)});`
  );

/////POUR QU'UN ADMIN SE CONNECT
exports.loginAdmin = async (email) =>
  await db.query(`SELECT * FROM admins WHERE email = ${mysql.escape(email)};`);

exports.getAdmin = async (email) =>
    await db.query(`SELECT * FROM admins WHERE email = ${mysql.escape(email)};`);

///model async (donc pas de calback) pour la creation d'un article
exports.createArticle = async (article_id, article, admin_id) =>
  await db.query(
    `INSERT INTO article(article_id, admins_id, title, img, tags, resume_article, content_article, author_article, video) VALUES ("${article_id}","${admin_id}","${article.title}","${article.img}","${article.tags}","${article.resume_article}","${article.content_article}","${article.author_article}","${article.video}","${article}")`
  );

////model non async (donc avec callback) pour la supression d'un article
exports.delete_a_article = (article_id, callback, admin_id) => {
  db.query(
    `DELETE FROM article WHERE article.id = ${article_id} AND admin_id = ${admin_id};`,
    (err, response) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, response);
    }
  );
};

////model non async (donc avec callback) pour la supression d'un article
exports.alter_a_article = (article_id, callback, admin_id, article) => {
  db.query(
    `UPDATE INTO article (title,img,tags, resume_article, content_article, author_article, video, admin_id) VALUES ("${admin_id}","${article.title}","${article.img}","${article.tags}","${article.resume_article}","${article.content_article}","${article.author_article}","${article.video}") WHERE article_id = ${article_id} and admin_id= ${admin_id} ;`,
    (err, response) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, response);
    }
  );
};

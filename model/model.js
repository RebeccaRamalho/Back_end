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

exports.getAdmin = async (email) =>
  await db.query(`SELECT * FROM admins WHERE email = ${mysql.escape(email)};`);

exports.createAccount = async (admin) =>
  await db.query(
    `INSERT INTO admins (admin_id, user_name, email, password) VALUES (${mysql.escape(
      admin.email
    )}, ${mysql.escape(admin.password)}, ${mysql.escape(admin.user_name)});`
  );

///model async (donc pas de calback) pour la creation d'un article

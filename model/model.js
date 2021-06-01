const db = require ('../db');


function queryResponse (callback, err, statxus_ok){
    if(err){
        callback(err,null);
        return;

    }
    callback(null,status_ok)
}
                                                       /////////////////requete pour la db=db.js//////


///model async (donc pas de calback) pour la creation d'un article
exports.createArticle = async (article_id, article, admins_id) => db.query(`ÌNSERT INTO article(article_id, admins_id, title, img, tags, resume_article, content_article, author_article, video) VALUES ("${article_id}","${admins_id}","${article.title}","${article.img}","${article.tags}","${article.resume_article}","${article.content_article}","${article.author_article}","${article.video}","${article}")`);


////model non async (donc avec callback) pour la supression d'un article
exports.delete_a_article = (article_id, callback, admins_id) => {
    db.query(`DELETE FROM article WHERE article.id = ${article_id} AND admins_id = ${admins_id};`
    ,(err, response) => {
        if(err){
        callback(err, null);
        return;
        }
    callback(null,response);
    })
}
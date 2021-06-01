const model = require("../model/model");
const bcrypt = require("bcrypt");
const { request } = require("express");
require('dotenv').config();
const jwt = require ('jsonwebtoken');




// ajouter un article par un admin (control)
exports.addArticle = async (req, res) =>{
    const token = req.body.token;
    console.log(token);
    try{
        const admin = await jwt.verify(token, process.env.SECRET);
        console.log(admin.id);
        model.createArticle(admin.id, req.body, article_id);
        res.status(200).json({message:'article rajouté' });
        return;

    }catch(err){

        res.status(500).json({err})
    }
    
};

// supprimer un article par un admin (control)
exports.delete_a_article = async (req, res) =>{
    const {token, article_id } = req.body;
    console.log(token, article_id);
    try{

        model.delete_a_article(article_id, admin_id);
        console.log("article effacé");
        res.status(200).json({message : {message: "effacer avec succès"}});
    }catch (err){
    console.log(err);
}

};
// modifier un article par un admin (control)
exports.alter_a_article = async (req, res) =>{
    const {token, article_id, admin_id} = req.body;

    try{
        model.alter_a_article(article_id,admin_id);
        res.status(200).json({message : {message: "modifié avec succès"}});
    }catch (err){
    console.log(err)
    }
}
 



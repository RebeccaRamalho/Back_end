const model = require("../model/model");
const { request } = require("express");
require("dotenv").config();

/*Admin i want to create an article*/
exports.publishArticles = (req, res) => {


  try{
  const { id } = req.admin;

  const  {
    title,
    img,
    tags,
    resume_article,
    content_article,
    author_article,
    video,
  } = req.body;
// console.log('====================================');
// console.log(req.body.image);
// console.log('====================================');
  const article = {
    title,
    tags,
    resume_article,
    content_article,
    author_article,
    video,
    id,
  }

  model.createArticle(article, id, (error, result) => {
    if (error) {
      res.send(error.message);
      res.status(400).json({
        message: "Vous n'avez pas renseigné tout les champs",
      });
    }
    res.status(200).json(result);
  });
} catch(err){
console.log(err);

}
};

/*Admin i want to see all the articles */
exports.getArticles = (req, res) => {
  model.getallArticle((error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*Admin i want to update an article */
exports.updateArticles = (req, res) => {
  const { id } = req.admin;
  // const {article_id} = req.params;

  const { article_id } = req.params;
  const { title, 
          img, 
          tags, 
          resume_article, 
          content_article, 
          author_article, 
          video,
          
      } = req.body;
          
  const article = {
            title,
            img,
            tags,
            resume_article,
            content_article,
            author_article,
            video,
            id,         
  };        

  model.updateArticles(article_id, article, id, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*user i want to see the last 3 articles*/
exports.getLastArticles = (req, res) => {
  model.get3LastArticle((error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*user i want to see the details of an article*/
exports.articleDetails = (req, res) => {
  const { article_id } = req.params;
  
  
  model.getArticleDetails(article_id, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*Admin i want to delete an article */
exports.deleteArticles = (req, res) => {
  const { article_id } = req.body; // 
  model.delete_an_article(article_id, (error, result) => {
    if (error) {
      res.send(error.message);
    }  
  });
};

/*user i want to add a review */
exports.postReview = (req, res) => {
  const { last_name, first_name, opinion, role } = req.body;

  const review = {
    last_name,
    first_name,
    opinion,
    role,
  };
  model.addAReview(review, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    // const reviewDet = {
    //   last_name: result[0].last_name,
    //   first_name: result[0].first_name,
    //   opinion: result[0].opinion,
    //   role: result[0].role,
    // };
    

    res.status(200).json(
      result
      // revieuwDetails: {
      //   last_name: result[0].last_name,
      //   first_name: result[0].first_name,
      //   opinion: result[0].opinion,
      //   role: result[0].role,
      // },
    );
  });
};
/*user i want to get all reviews */
exports.getReview = (req, res) => {
  model.getAllReview((error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};
/*Admin i want to delete a review */
exports.deleteReview = (req, res) => {
  const { id } = req.admin;
  
  model.delete_an_review(id,(error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};
/*user i want to get all article tag from a specifiq tag */
exports.getArticlesTag = (req, res) => {
  const { tags } = req.params;
  model.getArticlesTag(tags,(error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

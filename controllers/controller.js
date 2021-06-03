const model = require("../model/model");
const bcrypt = require("bcrypt");
const { request } = require("express");
require('dotenv').config();
const jwt = require ('jsonwebtoken');
const cookie = require ('cookie-parser');


 ///////// signup///////
// exports.signUp = async (req, res) => {

//     const {user_name, email, password} = req.body;

   
//     // console.log();
//     // console.log(password)
//     // console.log(email);

//     // console.log("email",  email);
//     // console.log("username", user_name);
//     // console.log("password", password);
//     // const regEmail = /^([a-z A-Z 0-9](\.)?)+@\w+\.(\w){2,4}$/;
//     // const regName = "";
    
    
//       const admin = {
//             user_name,
//             email,
//             password,
//       };
      
//     try {
      
//           // const adminResponse = await model.createAccount(admin);
//           await model.createAccount(admin);
//           console.log("200 in da place");
          
//            res.status(200).json({ message: 'user registered' });
         
          

//           console.log(admin);

//         //      }
//         // );
        
//       //   if (regEmail.test(email) && regName.test(user_name)) {
//       //       console.log('Regex email' )
//       //       const hash = await bcrypt.hash(password, 10);
            
     
//       //   const admin = {
//       //     user_name,
//       //     email,
//       //     password: hash,
//       //   };
//       //   console.log(('email', email, 'password', password));
//       //   // const userAlreadyexistsArr = await model.getAdmin(email, user_name);


//       //   if (userAlreadyexistsArr[0].length === 0) {
//       //     await model.createAccount(admin);
//       //     res.status(200).json({ message: 'user registered' });
//       //     return;
//       //   }
//       //   res.status(403).json({ message: 'email already exists' });
//       // } else {
//       //   if (!regEmail.test(email)) {
//       //     res.status(403).json({ err: 'mauvais format Email' });
//       //     return;
//       //   }
//       //   res.status(400).json({ err: 'mauvais format nom' });
//       // }
  //   } catch (err) {
      
  //    console.log('500in da place');
  //     res.status(500).json({ error: err });
  //   }
  // };



exports.signUp = async (req, res) => {
    
    const {user_name, email, password} = req.body;
    
    try {
      const hash = await bcrypt.hash(password,10)
      const admin = {
                  user_name,
                  email,
                  password: hash,
                };
                  
      const adminResponse = await model.createAccount(admin);
      console.log(admin)
    
      
      res.status(200).json({ error:"grr"});
      console.log("catch")

        // data: { tour: newTour }
      });

      
          
      
  
      //   res.status(403).json({ message: 'email already exists' });
      // } else {
      //   if (!regEmail.test(email)) {
      //     res.status(403).json({ err: 'mauvais format Email' });
      //     return;
      //   }
      //   res.status(403).json({ err: 'name non correcte' });
      // }
    } catch (err) {
      res.status(500).json({ error:"grr"});
      console.log("catch");

    }
  };
  
      

        
// };
  

// exports.signUp = async(req,res)=>{

//     const{user_name, email, password} = req.body;

//     try{
//         ///hashage renouveller chaque fois pour le même mot de pass
//         const hash = await bcrypt.hash(password,10);
//         //on change la valuer du mot de pass par le hash
//         req.body.password = await hash;

//         //payload token
//         const user = {
//             user_name : username
//         }
//         ///crération du token
//         const SECRET_KEY = "azerty"
//         const token = jwt.sign(user, SECRET_KEY);
//         //stockage du token
//         const cookie = res.cookie('authentication', token, {expires: new Date(Date.now()/1000 + 3600 )}) ;
        

//         ////test si un utilisateur ale même pseudo///////////:
//         model.Login(username,async (err,IsUserExiste)=>{
//             if(err){
//                 res.send(err);
//                 return;
//             }
//             if(IsUserExiste.length > 0){
//                 await req.flash('userExist', "username already exists");
//                 res.redirect('/adminlogin');
//             }
//             else{
//                 model.createAccount(req.body,  (err,response)=>{
//                     if(err){
//                         res.send(err.message);
//                     }
//                     res.redirect('/');
//                   })
//             }
           
//           })
//     }
//     catch(err){
//         console.log(err.message);
//     }
// }


// ///checkpoint à la login page
// exports.login = (req, res, next) => {
//     const {username, password} = req.body;
    
//     // reponse de la requête
//     model.loginAdmin (username, async (error, response)=>{
        
//         if(error) {
//             res.send(error.message);
//         } 
//         if(response.length ===0) {
//             await req.flash("warning", "This user doesn't exist!");
//             res.redirect("/");
//         }  else {
//             const checkPassword = await bcrypt.compare(password, response[0].hash);
//             if(checkPassword) {
//                 next();
//                 return;
//             } 
            
//             await req.flash("warning", "Invalid Password")
//             res.redirect("/");
//             } 
//     })
// }


//login  
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const resp = await model.login(email);
    
    if (resp[0].length !== 0) {
      
      const checkPassword = await bcrypt.compare(password, resp[0][0].password);
      
      if (checkPassword) {
        next();
      } else {
        res.status(403).json({ message: 'invalid password' });
      }
      return;
    }
    res.status(404).json({ message: "user doesn't exist" });
  } catch (err) {
    res.status(200).json({ error: {email, password} });////
  }
};

/////// authentification
exports.authentification = async (req, res) =>{
    
    const { email } = req.body;
    
    try{
        const adminResponse = await model.getAdmin(email);

        const admin = {
           email,
           user_name: adminResponse[0][0].user_name,
           admin_id: adminResponse[0][0].admin_id,
        };
        
        const token = await jwt.sign(admin, process.env.SECRET);
        
        res.status(200).json({token: token});
        
    } catch (err){
        res.status(500).json({message: "mauvaise identification"})
    }
};

/////// login



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
}

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

// afficher tout les articles par l'action d'un admin (control)
// export.get_all_article = async(req, res) =>{
//      const {token} = req.body;

//      try{
//          model.get_all_article();
//          res.status(200).json({
//             article:[
//                 {
//                     "title": string, 
//                     "img": string,
//                     "tags": string, 
//                     "resume_article": string, 
//                     "content_article": string, 
//                     "author_article" : string, 
//                     "video": string
//                 }
//             ] 
//         });
//      }catch(err){
//         res.status(400).json({message : {message: "Aucun article publié.."}});
//      }
// }



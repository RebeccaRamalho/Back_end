CREATE DATABASE hand_of_hope;
USE hand_of_hope;
CREATE TABLE reviewer(
    id INT AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(45) NOT NULL, 
    first_name VARCHAR(45) NOT NULL, 
    opinion VARCHAR (400) NOT NULL,
    role VARCHAR (20)
);


CREATE TABLE article(
    article_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    img varbinary(max),
    tags VARCHAR (25), 
    resume_article VARCHAR (25),
    content_article VARCHAR (500)
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES admins (admin_id)
);

CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR (15),
	email VARCHAR (15),
	passWord VARCHAR (72),
    article_id INT AUTO_INCREMENT,
    FOREIGN KEY (article_id) REFERENCES article (article_id)
);

-- CREATE TABLE `images` (
--     `img_id` INT NOT NULL AUTO_INCREMENT ,
--     `img_nom` VARCHAR( 50 ) NOT NULL ,
--     `img_taille` VARCHAR( 25 ) NOT NULL ,
--     `img_type` VARCHAR( 25 ) NOT NULL ,
--     `img_desc` VARCHAR( 100 ) NOT NULL ,
--     `img_blob` BLOB NOT NULL ,
--     PRIMARY KEY ( `img_id` )
-- );
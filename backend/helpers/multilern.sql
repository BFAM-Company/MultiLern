
CREATE TABLE IF NOT EXISTS users(
	id int AUTO_INCREMENT PRIMARY KEY,
  	nickname varchar(100) not null UNIQUE,
	password varchar(100) not null,
  	name varchar(50) NOT NULL,
  	surname varchar(70) not NULL,
  	email varchar(100) not null UNIQUE
);

CREATE TABLE IF NOT EXISTS posts(
	id int AUTO_INCREMENT PRIMARY KEY,
  	title varchar(70) not null,
  	content varchar(250) NOT NULL,
  	date DATETIME not NULL,
  	parentPostId int,
  	postType varchar(50) not null,
  	FOREIGN KEY (parentPostId) REFERENCES posts(id)
);

CREATE TABLE IF NOT EXISTS users_posts(
	id int AUTO_INCREMENT PRIMARY KEY,
  	userId int not NULL,
  	postId int not null,
  	FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
);

CREATE TABLE IF NOT EXISTS images(
	id int AUTO_INCREMENT PRIMARY KEY,
  	img BLOB
);

CREATE TABLE IF NOT EXISTS posts_images(
	id int AUTO_INCREMENT PRIMARY KEY,
  	postId int not null,
  	imgId int not NULL,
  	FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (imgId) REFERENCES images(id)
);

CREATE TABLE IF NOT EXISTS tags(
    id int AUTO_INCREMENT PRIMARY KEY,
    title varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS tags_posts(
	id int AUTO_INCREMENT PRIMARY KEY,
  	tagsId int not NULL,
  	postId int not null,
  	FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (tagsId) REFERENCES tags(id)
);

CREATE TABLE IF NOT EXISTS reviews(
	id int AUTO_INCREMENT PRIMARY KEY,
  	rate int
);

CREATE TABLE IF NOT EXISTS posts_reviews(
	id int AUTO_INCREMENT PRIMARY KEY,
  	postId int not null,
  	reviewsId int not NULL,
  	FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (reviewsId) REFERENCES reviews(id)
);

CREATE TABLE IF NOT EXISTS fiches(
	id int AUTO_INCREMENT PRIMARY KEY,
  	title varchar(50)
);

CREATE TABLE IF NOT EXISTS users_fiches(
	id int AUTO_INCREMENT PRIMARY KEY,
  	userId int not NULL,
  	fichesId int not null,
  	FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (fichesId) REFERENCES fiches(id)
);

CREATE TABLE IF NOT EXISTS translations(
    id int AUTO_INCREMENT PRIMARY KEY,
    foreignTranslation varchar(250),
    polishTranslation varchar(250)
);

CREATE TABLE IF NOT EXISTS fiches_translations(
	id int AUTO_INCREMENT PRIMARY KEY,
  	fichesId int not NULL,
  	translationsId int not null,
  	FOREIGN KEY (fichesId) REFERENCES fiches(id),
    FOREIGN KEY (translationsId) REFERENCES translations(id)
);



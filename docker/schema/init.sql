CREATE DATABASE chatterio;
USE chatterio;

CREATE TABLE users (
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    userpassword varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE messages (
    message_id int NOT NULL AUTO_INCREMENT,
    message_from_user_id int NOT NULL,
    message_to_user_id int NOT NULL,
    message_text TEXT NOT NULL,
    PRIMARY KEY (message_id)
);

CREATE TABLE chatrooms (
    chatroom_id int NOT NULL AUTO_INCREMENT,
    private tinyint NOT NULL,
    PRIMARY KEY (chatroom_id)
);
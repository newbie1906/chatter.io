CREATE DATABASE chatterio;
USE chatterio;

CREATE TABLE users (
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

-- chatrooms 1:M users
CREATE TABLE chatrooms (
    chatroom_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    private tinyint NOT NULL,
    passcode varchar(255),
    PRIMARY KEY (chatroom_id)
);

-- message M:1 users
-- message M:1 chatrooms
CREATE TABLE messages (
    message_id int NOT NULL AUTO_INCREMENT,
    message_text TEXT NOT NULL,
    user_id int NOT NULL,
    chatroom_id int NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chatroom_id) REFERENCES chatrooms(chatroom_id)
);

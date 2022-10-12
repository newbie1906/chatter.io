import string
from tokenize import String
from xmlrpc.client import Boolean
from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, Boolean, String
from sqlalchemy.orm import declarative_base
from config.database import meta

# These is model from database this descibes database table

chatrooms = Table(
    'chatrooms', meta,
    Column('chatroom_id', Integer, primary_key=True, nullable=False),
    Column('name', String(255), nullable=False),
    Column('private', Boolean, nullable=False),
    Column('passcode', String(255))
)

# CREATE TABLE users (
#     user_id int NOT NULL AUTO_INCREMENT,
#     username varchar(255) NOT NULL,
#     password varchar(255) NOT NULL,
#     email varchar(255) NOT NULL,
#     PRIMARY KEY (user_id)
# );

users = Table(
    'users', meta,
    Column('user_id', Integer, primary_key=True, nullable=False),
    Column('username', String(255), nullable=False),
    Column('password', String(255), nullable=False),
    Column('email', String(255), nullable=False),
)
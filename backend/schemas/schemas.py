from tokenize import String
from pydantic import BaseModel, Field, EmailStr

# These are schemas use this to validate data sent to database and 
# restrict returned data np when asking for all chatroom we do not need 
# private passcodes sent to user

class Chatroom(BaseModel):
    name: str = Field(..., max_length=255)
    private: bool = ...
    passcode: str = Field(max_length=255)

class GetChatroom(BaseModel):
    chatroom_id: int
    name: str
    private: bool


class User(BaseModel):
    username: str = Field(..., max_length=255)
    password: str = Field(..., max_length=255)
    email: EmailStr

class GetUser(BaseModel):
    user_id: int
    username: str 
    email: EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str

class Message(BaseModel):
    message_text: str = Field(..., max_length=255)
    user_id: int = ...
    chatroom_id: int = ...

class GetMessage(BaseModel):
    message_id: int 
    message_text: str 
    user_id: int
    chatroom_id: int
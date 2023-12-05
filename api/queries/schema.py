from pydantic import BaseModel


class DuplicateUserError(ValueError):
    pass


class UserIn(BaseModel):
    email: str
    username: str
    password: str


class UserOut(BaseModel):
    userid: int
    username: str
    email: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class ChangePassword(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str


class EditProfile(BaseModel):
    first_name: str
    last_name: str
    height: str
    weight: str

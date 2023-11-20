from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
    Request,
    Response,
)
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from typing import Optional, Union
from queries.users import (
    UserOut,
    UserIn,
    UserQueries,
    DuplicateUserError,
    ChangePassword,
)
from datetime import date

class UserForm(BaseModel):
    username: str
    password: str

class UserToken(Token):
    user: UserOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/api/users/{user_id}/", response_model=UserOut)
async def get_user(
    user_id: int,
    repo: UserQueries = Depends(),
):
    return repo.get_user(user_id)

@router.post("/api/users/", response_model=UserToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = queries.create_user(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, queries)
    return UserToken(user=user, **token.dict())

@router.get("/token/", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: dict = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }

@router.patch("/api/users/change-password/")
async def change_password(
    change_password: ChangePassword,
    current_user_data: dict = Depends(authenticator.try_get_current_account_data),
    queries: UserQueries = Depends(),
):
    # Verify current password
    print(current_user_data)
    current_user_password = current_user_data["hashed_password"]
    valid = authenticator.verify_password(change_password.current_password, current_user_password)
    if not valid:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Current password is not match.")

    # Check new password and confirm password
    if change_password.new_password != change_password.confirm_password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Passwords don't match.")

    # Change password
    hashed_password = authenticator.hash_password(change_password.new_password)
    username = current_user_data["username"]
    queries.change_password(hashed_password, username)
    return {
        "status_code": status.HTTP_200_OK,
        "detail": "User's password successfully changed."
    }

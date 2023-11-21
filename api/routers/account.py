from fastapi import APIRouter, Depends
from typing import Optional, Union
from queries.account import (
    UserOut,
    UserIn,
    UserQueries
)

from datetime import date


router = APIRouter()





@router.get("/accounts/{user_id}/", response_model=list[UserOut])
async def get_account(
    user_id: int,
    repo: UserQueries = Depends(),
):
    return repo.get_all_accounts_for_user(user_id)



@router.post("/accounts/")
async def create_account():
    return "tbd"

import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserQueries
from queries.schema import UserOut, UserOutWithPassword
from passlib.context import CryptContext


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: UserQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: UserQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: UserOutWithPassword):
        if isinstance(account, UserOutWithPassword) and account.hashed_password is not None:
            return account.hashed_password
        return None


    def get_account_data_for_cookie(self, account):
    # Convert to Pydantic model if account is a dictionary
        if isinstance(account, dict):
            account = UserOutWithPassword(**account)

     # Now account is guaranteed to be a UserOutWithPassword object

        return account.username, account.dict()


    # Password verify
    def verify_password(self, plain_password, hashed_password):
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        return pwd_context.verify(plain_password, hashed_password)


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])

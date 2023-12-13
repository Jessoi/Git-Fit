from pydantic import BaseModel


class MuscleInfo(BaseModel):
    name: str
    description: str


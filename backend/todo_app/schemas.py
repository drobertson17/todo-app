from pydantic import BaseModel

from globals import DEFAULT_STATUS


class TaskInput(BaseModel):
    title: str = ""
    body: str = ""
    status: str = DEFAULT_STATUS

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm.exc import UnmappedInstanceError

from model.database import DBSession
from model import models
from schemas import TaskInput


app = FastAPI()


origins = [
	"http://localhost:5173" # or add your own front-end's domain name
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/tasks")
def read_tasks():
    db = DBSession()
    try:
        notes = db.query(models.Task).all()
    finally:
        db.close()
    return notes


@app.post("/task", response_model=None)
def add_task(task: TaskInput) -> models.Task:
    db = DBSession()
    try:
        if len(task.title) == 0 and len(task.body) == 0:
            raise HTTPException(
                status_code=400, detail={
                    "status": "Error 400 - Bad Request",
                    "msg": "Both 'title' and 'body' are empty. These are optional attributes but at least one must be provided."
                })
        new_task = models.Task(
            title=task.title, body=task.body, status=task.status
        )
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
    finally:
        db.close()
    return new_task


@app.put("/task/{task_id}")
def update_note(task_id: int, updated_task: TaskInput):
    if len(updated_task.title) == 0 and len(updated_task.body) == 0:
        raise HTTPException(status_code=400, detail={
            "status": "Error 400 - Bad Request",
            "msg": "The note's `title` and `body` can't be both empty"
        })
    db = DBSession()
    try:
        task = db.query(models.Task).filter(models.Task.id == task_id).first()
        task.title = updated_task.title
        task.body = updated_task.body
        db.commit()
        db.refresh(task)
    finally:
        db.close()
    return task


@app.delete("/task/{task_id}")
def delete_note(task_id: int):
    db = DBSession()
    try:
        task = db.query(models.Task).filter(models.Task.id == task_id).first()
        db.delete(task)
        db.commit()
    except UnmappedInstanceError:
        raise HTTPException(status_code=400, detail={
            "status": "Error 400 - Bad Request",
            "msg": f"Task with `id`: `{task_id}` doesn't exist."
        })
    finally:
        db.close()
    return {
        "status": "200",
        "msg": "Task deleted successfully"
    }


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
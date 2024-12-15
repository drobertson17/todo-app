from sqlalchemy import Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    body = Column(String)
    status = Column(String)

    def __repr__(self):
        return f'Task(id={self.id}, title={self.title}, body={self.body}, status={self.status})'
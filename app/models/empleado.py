from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from app.databases.database import Base
from sqlalchemy.orm import relationship

class Empleado(Base):
    __tablename__ = "empleado"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), index=True)
    edad = Column(Integer, index=True)
    correo = Column(String(50), index=True)
    rol =  Column(String(50), index=True)
    responsabilidad = Column(String(50), index=True)

    perfiles = relationship("PerfilEmpleado", back_populates="empleado", cascade="all, delete")
from fastapi import FastAPI
from reactpy import component, html
from reactpy.backend.fastapi import configure

from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated
from app.models.empleado import Empleado as empleado_model
from app.models.perfilEmpleado import PerfilEmpleado as perfilEmpleado_model
from app.databases.database import SessionLocal, engine, get_db
from sqlalchemy.orm import Session
from app.schemas.empleado import EmpleadoBase
from app.schemas.perfilEmpleado import PerfilEmpleadoBase
from starlette.websockets import WebSocket, WebSocketDisconnect
from app.databases.database import Base

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() # Crear la aplicación FastAPI

origin = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



Base.metadata.create_all(bind=engine) # Crear las tablas en la base de datos
db_dependency = Annotated[Session, Depends(get_db)]# Dependencia para obtener la sesión de la base de datos

@app.get("/")
async def root():
    return {"message": "Hello World"}



@app.post("/empleado/", status_code=status.HTTP_201_CREATED)
async def create_empleado(empleado: EmpleadoBase, db: db_dependency):
    db_empleado = empleado_model(**empleado.model_dump())
    db.add(db_empleado)
    db.commit()

@app.get("/empleado/{empleado_id}",status_code=status.HTTP_200_OK)
async def get_empleado(empleado_id: int, db: db_dependency):
    db_empleado = db.query(empleado_model).filter(empleado_model.id == empleado_id).first()
    if db_empleado is None:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return db_empleado


@app.get("/empleados/", status_code=status.HTTP_200_OK)
async def get_empleados(db: db_dependency, skip: int = 0):
    empleados = db.query(empleado_model).offset(skip).all()
    return empleados

@app.post("/empleado/{empleado_id}", status_code=status.HTTP_200_OK)
async def update_empleado(empleado_id: int, empleado: EmpleadoBase, db: db_dependency):
    db_empleado = db.query(empleado_model).filter(empleado_model.id == empleado_id).first()
    if db_empleado is None:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    db_empleado.nombre = empleado.nombre
    db_empleado.edad = empleado.edad
    db_empleado.correo = empleado.correo
    db_empleado.rol = empleado.rol
    db.commit()
    return db_empleado


@app.delete("/empleado/{empleado_id}", status_code=status.HTTP_200_OK)
async def delete_empleado(empleado_id: int, db: db_dependency):
    db_empleado = db.query(empleado_model).filter(empleado_model.id == empleado_id).first()
    if db_empleado is None:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    db.delete(db_empleado)
    db.commit()

@app.post("/nuevo_perfil/{empleado_id}", status_code=status.HTTP_201_CREATED)
async def create_perfil(empleado_id: int, perfil_empleado: PerfilEmpleadoBase, db: db_dependency):
    db_perfil = perfilEmpleado_model(**perfil_empleado.model_dump())
    db.add(db_perfil)
    db.commit()
    
@app.get("/perfil/{empleado_id}", status_code=status.HTTP_200_OK)
async def get_perfil(empleado_id: int, db: db_dependency):
    db_perfil = db.query(perfilEmpleado_model).filter(perfilEmpleado_model.empleado_id == empleado_id).first()
    if db_perfil is None:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return db_perfil

@app.get("/perfiles/", status_code=status.HTTP_200_OK)
async def get_perfiles(db: db_dependency, skip: int = 0):
    perfiles = db.query(perfilEmpleado_model).offset(skip).all()
    return perfiles

@app.post("/perfil/{empleado_id}", status_code=status.HTTP_200_OK)
async def update_perfil(empleado_id: int, perfil: PerfilEmpleadoBase, db: db_dependency):
    db_perfil = db.query(perfilEmpleado_model).filter(perfilEmpleado_model.empleado_id == empleado_id).first()
    if db_perfil is None:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    db_perfil.habilidad = perfil.habilidad
    db_perfil.años_experiencia = perfil.años_experiencia
    db_perfil.certificacion = perfil.certificacion
    db_perfil.tiempo_en_empresa = perfil.tiempo_en_empresa
    db_perfil.salario = perfil.salario
    db.commit()
    return db_perfil

@app.delete("/perfil/{empleado_id}", status_code=status.HTTP_200_OK)
async def delete_perfil(empleado_id: int, db: db_dependency):
    db_perfil = db.query(perfilEmpleado_model).filter(perfilEmpleado_model.empleado_id == empleado_id).first()
    if db_perfil is None:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    db.delete(db_perfil)
    db.commit()



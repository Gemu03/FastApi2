from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated
import models.models as models
from database.database import SessionLocal, engine, get_db
from sqlalchemy.orm import Session
from schemas.schemas import EmpleadoBase, PerfilBase


app = FastAPI()
models.Base.metadata.create_all(bind=engine)



db_dependency = Annotated[Session, Depends(get_db)]
    

@app.post("/empleado/", status_code=status.HTTP_201_CREATED)
async def create_empleado(empleado: EmpleadoBase, db: db_dependency):
    db_empleado = models.Empleado(**empleado.model_dump())
    db.add(db_empleado)
    db.commit()

@app.get("/empleado/{empleado_id}",status_code=status.HTTP_200_OK)
async def get_empleado(empleado_id: int, db: db_dependency):
    db_empleado = db.query(models.Empleado).filter(models.Empleado.id == empleado_id).first()
    if db_empleado is None:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return db_empleado


@app.get("/empleados/", status_code=status.HTTP_200_OK)
async def get_empleados(db: db_dependency, skip: int = 0):
    empleados = db.query(models.Empleado).offset(skip).all()
    return empleados

@app.post("/empleado/{empleado_id}", status_code=status.HTTP_200_OK)
async def update_empleado(empleado_id: int, empleado: EmpleadoBase, db: db_dependency):
    db_empleado = db.query(models.Empleado).filter(models.Empleado.id == empleado_id).first()
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
    db_empleado = db.query(models.Empleado).filter(models.Empleado.id == empleado_id).first()
    if db_empleado is None:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    db.delete(db_empleado)
    db.commit()

@app.post("/nuevo_perfil/{empleado_id}", status_code=status.HTTP_201_CREATED)
async def create_perfil(empleado_id: int, perfil_empleado: PerfilBase, db: db_dependency):
    db_perfil = models.PerfilEmpleado(**perfil_empleado.model_dump())
    db.add(db_perfil)
    db.commit()
    
@app.get("/perfil/{empleado_id}", status_code=status.HTTP_200_OK)
async def get_perfil(empleado_id: int, db: db_dependency):
    db_perfil = db.query(models.PerfilEmpleado).filter(models.PerfilEmpleado.empleado_id == empleado_id).first()
    if db_perfil is None:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return db_perfil

@app.get("/perfiles/", status_code=status.HTTP_200_OK)
async def get_perfiles(db: db_dependency, skip: int = 0):
    perfiles = db.query(models.PerfilEmpleado).offset(skip).all()
    return perfiles

@app.post("/perfil/{empleado_id}", status_code=status.HTTP_200_OK)
async def update_perfil(empleado_id: int, perfil: PerfilBase, db: db_dependency):
    db_perfil = db.query(models.PerfilEmpleado).filter(models.PerfilEmpleado.empleado_id == empleado_id).first()
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
    db_perfil = db.query(models.PerfilEmpleado).filter(models.PerfilEmpleado.empleado_id == empleado_id).first()
    if db_perfil is None:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    db.delete(db_perfil)
    db.commit()
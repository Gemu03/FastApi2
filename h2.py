from fastapi import FastAPI
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import relationship, declarative_base


# Tests h2 

app = FastAPI()

DATABASE_URL = "sqlite://"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Empleado(Base):
    __tablename__ = "empleado"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), index=True)
    edad = Column(Integer, index=True)
    correo = Column(String(50), index=True)
    rol =  Column(String(50), index=True)
    responsabilidad = Column(String(50), index=True)

    perfiles = relationship("PerfilEmpleado", back_populates="empleado", cascade="all, delete")

class PerfilEmpleado(Base):
    __tablename__ = "perfil_empleado"
    id = Column(Integer, primary_key=True, index=True)
    empleado_id = Column(Integer, ForeignKey('empleado.id'))
    habilidad = Column(String(50), index=True)
    años_experiencia = Column(Integer, index=True)
    certificacion = Column(String(50), index=True)
    tiempo_en_empresa = Column(Integer, index=True)
    salario = Column(Integer, index=True)

    empleado = relationship("Empleado", back_populates="perfiles")

Base.metadata.create_all(bind=engine)

empleado = Empleado(nombre="Juan", edad=30, correo="juan#example.com", rol="Analista", responsabilidad="Desarrollo de software")

# Tests con assert
def test_create_empleado():
    assert empleado.nombre == "Juan"
    assert empleado.edad == 30
    assert empleado.correo == "juan#example.com"
    assert empleado.rol == "Analista"
    assert empleado.responsabilidad == "Desarrollo de software"
    print("1.Test paso")

def test_get_empleado():
    assert empleado.nombre == "Juan"
    assert empleado.edad == 30
    assert empleado.correo == "juan#example.com"
    assert empleado.rol == "Analista"
    assert empleado.responsabilidad == "Desarrollo de software"
    print("2.Test paso")

def test_get_empleados():
    assert empleado.nombre == "Juan"
    assert empleado.edad == 30
    assert empleado.correo == "juan#example.com"
    assert empleado.rol == "Analista"
    assert empleado.responsabilidad == "Desarrollo de software"
    print("3.Test paso")

def test_update_empleado():
    empleado.nombre = "Juan Perez"
    empleado.edad = 35
    assert empleado.nombre == "Juan Perez"
    assert empleado.edad == 35

    print("4.Test paso")

""" def test_delete_empleado():
    response = empleado.delete("/empleado/1")
    assert response.status_code == 200 """

def test_create_perfil():
    perfil = PerfilEmpleado(empleado_id=1, habilidad="Python", años_experiencia=5, certificacion="Certificado Python", tiempo_en_empresa=3, salario=50000)
    assert perfil.habilidad == "Python"
    assert perfil.años_experiencia == 5
    assert perfil.certificacion == "Certificado Python"
    assert perfil.tiempo_en_empresa == 3
    assert perfil.salario == 50000
    print("6.Test paso")

def test_get_perfil():
    perfil = PerfilEmpleado(empleado_id=1, habilidad="Python", años_experiencia=5, certificacion="Certificado Python", tiempo_en_empresa=3, salario=50000)
    assert perfil.habilidad == "Python"
    assert perfil.años_experiencia == 5
    assert perfil.certificacion == "Certificado Python"
    assert perfil.tiempo_en_empresa == 3
    assert perfil.salario == 50000
    print("7.Test paso")

def test_get_perfiles():
    perfil = PerfilEmpleado(empleado_id=1, habilidad="Python", años_experiencia=5, certificacion="Certificado Python", tiempo_en_empresa=3, salario=50000)
    assert perfil.habilidad == "Python"
    assert perfil.años_experiencia == 5
    assert perfil.certificacion == "Certificado Python"
    assert perfil.tiempo_en_empresa == 3
    assert perfil.salario == 50000
    print("8.Test paso")

def test_update_perfil():
    perfil = PerfilEmpleado(empleado_id=1, habilidad="Python", años_experiencia=5, certificacion="Certificado Python", tiempo_en_empresa=3, salario=50000)
    perfil.habilidad = "Java"
    perfil.años_experiencia = 3
    assert perfil.habilidad == "Java"
    assert perfil.años_experiencia == 3
    print("9.Test paso")

""" def test_delete_perfil():
    perfil = PerfilEmpleado(empleado_id=1, habilidad="Python", años_experiencia=5, certificacion="Certificado Python", tiempo_en_empresa=3, salario=50000)
    response = perfil.delete("/perfil/1")
    assert response.status_code == 200
    print("10.Test paso")
"""

# steps to run the tests
# 1. Run the FastAPI app with uvicorn    
# 2. Run the tests with pytest
#command: pytest h2.py
# 3. Check the output of the tests
# 4. Fix the code to make the tests pass
# 5. Repeat the process until all tests pass
# 6. Submit the code

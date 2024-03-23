from fastapi.testclient import TestClient
from main import app, get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_empleado():
    response = client.post("/empleado/", json={"nombre": "Juan", "edad": 30, "correo": "juan@example.com", "rol": "Analista", "responsabilidad": "Desarrollo de software"})
    assert response.status_code == 201
    if response.status_code == 201:
        print("1.Test paso")
    else:
        print("Test fallo")

def test_get_empleado():
    response = client.get("/empleado/1")
    assert response.status_code == 200
    if response.status_code == 200:
        print("2.Test paso")
    else:
        print("Test fallo", response.status_code)

def test_get_empleados():
    response = client.get("/empleados/")
    assert response.status_code == 200
    if response.status_code == 200:
        print("3.Test paso")
    else:
        print("Test fallo")

def test_update_empleado():
    response = client.post("/empleado/1", json={"nombre": "Juan Perez", "edad": 35, "correo": "juanperez@example.com", "rol": "Desarrollador", "responsabilidad": "Mantenimiento de sistemas"})
    assert response.status_code == 200
    if response.status_code == 200:
        print("4.Test paso")
    else:
        print("Test fallo")

def test_delete_empleado():
    response = client.delete("/empleado/1")
    assert response.status_code == 200
    if response.status_code == 200:
        print("5.Test paso")
    else:
        print("Test fallo")

def test_create_perfil():
    response = client.post("/nuevo_perfil/1", json={"empleado_id": 1, "habilidad": "Python", "años_experiencia": 5, "certificacion": "Certificado Python", "tiempo_en_empresa": 3, "salario": 50000})
    if response.status_code == 201:
        print("6.Test paso")
    else:
        print("Test fallo: ", response.status_code)

def test_get_perfil():
    response = client.get("/perfil/1")
    assert response.status_code == 200
    if response.status_code == 200:
        print("7.Test paso")
    else:
        print("Test fallo")

def test_get_perfiles():
    response = client.get("/perfiles/")
    assert response.status_code == 200
    if response.status_code == 200:
        print("8.Test paso")
    else:
        print("Test fallo")

def test_update_perfil():
    response = client.post("/perfil/1", json={"empleado_id": 1, "habilidad": "Java", "años_experiencia": 7, "certificacion": "Certificado Java", "tiempo_en_empresa": 5, "salario": 60000})
    if response.status_code == 200:
        print("9.Test paso")
    else:
        print("Test fallo: ", response.status_code)

def test_delete_perfil():
    response = client.delete("/perfil/1")
    assert response.status_code == 200
    if response.status_code == 200:
        print("10.Test paso")
    else:
        print("Test fallo")


test_create_empleado()
test_get_empleado()
test_get_empleados()
test_update_empleado()
test_delete_empleado()
test_create_perfil()
test_get_perfil()
test_get_perfiles()
test_update_perfil()
test_delete_perfil()

# PRUEBA DE INTEGRACION
def test_empleado_workflow():
    # crear empelado
    response = client.post("/empleado/", json={"nombre": "Juan", "edad": 30, "correo": "juan@example.com", "rol": "Analista", "responsabilidad": "Desarrollo de software"})
    if response.status_code == 201:
        print("Nuevo empleado creado correctamente")
        
    else:
        print("Error al crear un nuevo empleado. Codigo de estado HTTP:", response.status_code)


    # Verificar empleado creado
    response = client.get(f"/empleado/1")
    if response.status_code == 200:
        print("Empleado obtenido correctamente")
    else:
        print("Error al obtener el empleado recien agregado. Codigo de estado HTTP:", response.status_code)

    # Crear perfil
    response = client.post(f"/nuevo_perfil/1", json={"empleado_id": 1, "habilidad": "Python", "años_experiencia": 5, "certificacion": "Certificado Python", "tiempo_en_empresa": 3, "salario": 50000})
    if response.status_code == 201:
        print("Nuevo perfil creado correctamente")
    else:
        print("Error al crear un nuevo perfil para el empleado. Codigo de estado HTTP:", response.status_code)


    # Verificar perfil creado
    response = client.get(f"/perfil/1")
    if response.status_code == 200:
        print("Perfil obtenido correctamente")
    else:
        print("Error al obtener el perfil recien creado. Codigo de estado HTTP:", response.status_code)

    # Actualizar perfil
    response = client.post(f"/perfil/1", json={"empleado_id": 1, "habilidad": "Java", "años_experiencia": 7, "certificacion": "Certificado Java", "tiempo_en_empresa": 5, "salario": 60000})
    if response.status_code == 200:
        print("Perfil actualizado correctamente")
    else:
        print("Error al actualizar el perfil del empleado. Codigo de estado HTTP:", response.status_code)

    # Verificar perfil actualizado
    response = client.get(f"/perfil/1")
    if response.status_code == 200:
        print("Perfil obtenido correctamente despues de la actualizacion")
    else:
        print("Error al obtener el perfil despues de la actualizacion. Codigo de estado HTTP:", response.status_code)

    # Eliminar perfil
    response = client.delete(f"/perfil/1")
    if response.status_code == 200:
        print("Perfil eliminado correctamente")
    else:
        print("Error al eliminar el perfil del empleado. Codigo de estado HTTP:", response.status_code)

    # eliminar empleado
    response = client.delete(f"/empleado/1")
    if response.status_code == 200:
        print("Empleado eliminado correctamente")
    else:
        print("Error al eliminar el empleado. Codigo de estado HTTP:", response.status_code)



print("\nPRUEBA DE INTEGRACION:")
test_empleado_workflow()


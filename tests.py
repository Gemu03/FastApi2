from fastapi.testclient import TestClient
import main

client = TestClient(main.app)

def test_create_empleado():
    empleado = {"nombre": "Juan", "edad": 30, "correo": "juan@example.com", "rol": "empleado"}
    response = client.post("/empleado/", json=empleado)
    assert response.status_code == 201
    assert response.json()["nombre"] == "Juan"

def test_get_empleado():
    response = client.get("/empleado/1")
    assert response.status_code == 200
    assert response.json()["nombre"] == "Juan"

def test_get_empleados():
    response = client.get("/empleados/")
    assert response.status_code == 200
    assert len(response.json()) >= 1

def test_update_empleado():
    empleado = {"nombre": "Pedro", "edad": 35, "correo": "pedro@example.com", "rol": "empleado"}
    response = client.post("/empleado/1", json=empleado)
    assert response.status_code == 200
    assert response.json()["nombre"] == "Pedro"

def test_delete_empleado():
    response = client.delete("/empleado/1")
    assert response.status_code == 200

def test_create_perfil():
    perfil = {"habilidad": "Python", "años_experiencia": 5, "certificacion": True, "tiempo_en_empresa": 2, "salario": 50000}
    response = client.post("/perfil/1", json=perfil)
    assert response.status_code == 201
    assert response.json()["habilidad"] == "Python"

def test_get_perfil():
    response = client.get("/perfil/1")
    assert response.status_code == 200
    assert response.json()["habilidad"] == "Python"

def test_get_perfiles():
    response = client.get("/perfiles/")
    assert response.status_code == 200
    assert len(response.json()) >= 1

def test_update_perfil():
    perfil = {"habilidad": "Java", "años_experiencia": 7, "certificacion": True, "tiempo_en_empresa": 3, "salario": 60000}
    response = client.post("/perfil/1", json=perfil)
    assert response.status_code == 200
    assert response.json()["habilidad"] == "Java"

def test_delete_perfil():
    response = client.delete("/perfil/1")
    assert response.status_code == 200

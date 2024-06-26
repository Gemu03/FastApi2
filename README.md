# FastAPI - Sistemas gestion de empleados y sus perfiles

## Integrantes:

- Nicolás Castañeda
- Giovanni Esteban Moreno
- Mariana Chacon

# Pasos para correr el proyecto

1. Abrir el proyecto desde Visual Studio Code.

2. Venv

- windows
  - `python -m venv venv`  Crear entorno virtual
  - `.\env\Scripts\activate.bat`  CMD
  - `.\venv\Scripts\Activate.ps1`  PowerShell

- mac
  - `source env/bin/activate`

3. Instalar dependencias
- `pip install -r requirements.txt`

4. Correr el proyecto
- `python -m uvicorn app.main:app --reload` Corre en el puerto 8000
- `cd frontend`
- `npm start` Corre en el puerto 3000

# Para ejecutar las pruebas 
- `cd app` cambiar a la carpeta app
- Para ejecutar las pruebas se debe tener pytest y ejecutar h2.py en terminal así:
 `pytest h2.py` 
- Ejecutar con normalidad el archivo _tests.py
- Si alguna de las pruebas falla, eliminar el archivo test.db y volver a intentar.

# Comprobar cobertura y fuerza

- pytest --cov=.
- mutmut run --paths-to-mutate . --tests-dir
- mutmut results
pytest h2

# Imagen de Docker
- https://hub.docker.com/repository/docker/nicolascasol/fastapi-docker/general

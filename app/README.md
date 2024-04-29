# FastAPI - Sistemas gestion de empleados y sus perfiles

## Integrantes:

- Nicolás Castañeda
- Giovanni Esteban Moreno
- Mariana Chacon

# Pasos para correr el proyecto

1. Abrir el proyecto desde Visual Studio Code

2. Venv

- windows

  - `.\env\Scripts\activate.bat`  CMD
  - `.\env\Scripts\Activate.ps1`  PowerShell

- mac
  - `source env/bin/activate`

3. Instalar dependencias

- `pip install -r requirements.txt`

4. Correr el proyecto

- `python -m uvicorn app.main:app --reload`
- Al iniciar va a mostrar una IP, al darle click irá al navegador y agregar '/docs'

# Para ejecutar las pruebas 
- `cd app` cambiar a la carpeta app
- Para ejecutar las pruebas se debe tener pytest y ejecutar h2.py en terminal así:
 `pytest h2.py` 
- Ejecutar con normalidad el archivo _tests.py
- Si alguna de las pruebas falla, eliminar el archivo test.db y volver a intentar

# Comprobar cobertura y fuerza

- pip install pytest pytest-cov mutmut
- pip install httpx
- pytest --cov=.
- mutmut run --paths-to-mutate . --tests-dir
- mutmut results
pytest h2

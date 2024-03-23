# FastAPI - Sistemas gestion de empleados y sus perfiles

## Integrantes:

- Nicolás Castañeda
- Giovanni Esteban Moreno
- Mariana Chacon

# Pasos para correr el proyecto

1. Abrir el proyecto desde Visual Studio Code

2. Venv

- windows

  - `.\env\Scripts\activate.bat`

- mac
  - `source env/bin/activate`

3. Instalar dependencias

- `pip install -r requirements.txt`

4. Correr el proyecto

- `python -m uvicorn main:app --reload`
- Al iniciar va a mostrar una IP, al darle click irá al navegador y agregar '/docs'

# Para ejecutar las pruebas 
- Ejecutar con normalidad el archivo tests.py
- Si alguna de las pruebas falla, eliminar el archivo test.db y volver a intentar



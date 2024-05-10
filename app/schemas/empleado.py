from pydantic import BaseModel

class EmpleadoBase(BaseModel):
    nombre: str
    edad: int
    correo: str
    rol: str
    responsabilidad: str


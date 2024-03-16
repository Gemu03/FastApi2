from pydantic import BaseModel

class EmpleadoBase(BaseModel):
    nombre: str
    edad: int
    correo: str
    rol: str
    responsabilidad: str

class PerfilBase(BaseModel):
    empleado_id: int
    habilidad: str
    años_experiencia: int
    certificacion: str
    tiempo_en_empresa: int
    salario: int

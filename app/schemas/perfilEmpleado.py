from pydantic import BaseModel

class PerfilEmpleadoBase(BaseModel):
    empleado_id: int
    habilidad: str
    años_experiencia: int
    certificacion: str
    tiempo_en_empresa: int
    salario: int

from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from app.databases.database import Base
from sqlalchemy.orm import relationship

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

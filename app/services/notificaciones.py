from sqlalchemy.orm import Session
from app.models.empleado import Empleado
from app.models.perfilEmpleado import PerfilEmpleado
from app.utils.observer import GestorNotificaciones, EmpleadoSuscriptor

class ClienteNotificaciones:
    def __init__(self, db: Session):
        self.gestor_notificaciones = GestorNotificaciones()
        self.db = db

    def cargar_suscriptores(self):
        perfiles_suscritos = self.db.query(PerfilEmpleado).filter(PerfilEmpleado.suscripcion_notificaciones == True).all()
        for perfil in perfiles_suscritos:
            empleado = self.db.query(Empleado).filter(Empleado.id == perfil.empleado_id).first()
            suscriptor = EmpleadoSuscriptor(empleado)
            self.gestor_notificaciones.agregar_suscriptor(suscriptor)

    def enviar_notificacion(self, mensaje):
        self.gestor_notificaciones.notificar_suscriptores(mensaje)

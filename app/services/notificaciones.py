from sqlalchemy.orm import Session
from app.models.empleado import Empleado
from app.models.perfilEmpleado import PerfilEmpleado
from app.utils.observer import GestorNotificaciones, EmpleadoSuscriptor

class ClienteNotificaciones:
    def __init__(self):
        self.gestor_notificaciones = GestorNotificaciones()

    def cargar_suscriptores(self, db: Session):
        perfiles_suscritos = db.query(PerfilEmpleado).filter(PerfilEmpleado.suscripcion_notificaciones == True).all()
        for perfil in perfiles_suscritos:
            empleado = db.query(Empleado).filter(Empleado.id == perfil.empleado_id).first()
            suscriptor = EmpleadoSuscriptor(empleado)
            self.gestor_notificaciones.agregar_suscriptor(suscriptor)


    def enviar_notificacion(self, db: Session, mensaje):
        self.gestor_notificaciones.limpiar_suscriptores()
        self.cargar_suscriptores(db)
        self.gestor_notificaciones.notificar_suscriptores(mensaje)

from abc import ABC, abstractmethod

# Interfaz Suscriptora
class IEmpleadoSuscriptor(ABC):
    @abstractmethod
    def actualizar(self, mensaje):
        pass

# Suscriptor Concreto
class EmpleadoSuscriptor(IEmpleadoSuscriptor):
    def __init__(self, empleado):
        self.empleado = empleado

    def actualizar(self, mensaje):
        print(f"Empleado {self.empleado.nombre} ha recibido el mensaje: {mensaje}")

# Interfaz Notificador
class INotificador(ABC):
    @abstractmethod
    def agregar_suscriptor(self, suscriptor):
        pass

    @abstractmethod
    def eliminar_suscriptor(self, suscriptor):
        pass

    @abstractmethod
    def notificar_suscriptores(self, mensaje):
        pass

# Notificador Concreto
class GestorNotificaciones(INotificador):
    def __init__(self):
        self._suscriptores = []

    def agregar_suscriptor(self, suscriptor):
        self._suscriptores.append(suscriptor)

    def eliminar_suscriptor(self, suscriptor):
        self._suscriptores.remove(suscriptor)

    def notificar_suscriptores(self, mensaje):
        for suscriptor in self._suscriptores:
            suscriptor.actualizar(mensaje)

    def limpiar_suscriptores(self):
        self._suscriptores = []

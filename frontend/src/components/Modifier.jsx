import React, { useState } from 'react';



function Modifier( props ) {
    const [isEditing, setIsEditing] = useState(false);
    const toogleEditar = (event) => {
        event.preventDefault();
        setIsEditing(!isEditing);
    }

    const [setEmpleado] = useState(null);
    const createEmpleado = () => {
    fetch('http://localhost:8000/empleado/', {
        method: 'POST',
        headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        nombre: document.getElementById('nombre').value,
        edad: document.getElementById('edad').value,
        correo: document.getElementById('correo').value,
        rol: document.getElementById('rol').value,
        responsabilidad: document.getElementById('responsabilidad').value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
        console.log(data);
        setEmpleado(data); 
        })
        .catch((error) => {
        console.error('Error fetching empleados:', error);
        });
    };



    return (
    <form>
        {isEditing ? 
            <section className='isEditing'>
                <h2>Modo Edición</h2>
                <label ref={contNombre} htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Juan" />

                <label id='editingRol' htmlFor="rol">Rol</label>
                <input  type="text" id="rol" placeholder="Director" />

                <label id='editingEdad' htmlFor="edad">Edad</label>
                <input type="number" id="edad" placeholder="34" />

                <label id='editingCorreo' htmlFor="correo">Correo</label>
                <input type="email" id="correo" placeholder="juan@gmail.com" />

                <label id='editingResponsabilidad' htmlFor="responsabilidad">Responsabilidad</label>
                <input  type="text" id="responsabilidad" placeholder="Desarrollar" />

                <div className="botones">
                    <button onClick={createEmpleado}>Confirmar</button>
                    <button onClick={toogleEditar}>Cancelar</button>
                </div>
            </section>
            : 
            <section className='isNotEditing'>
                <h2>Modo Registro</h2> 
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Juan" />

                <label htmlFor="rol">Rol</label>
                <input type="text" id="rol" placeholder="Director" />

                <label htmlFor="edad">Edad</label>
                <input type="number" id="edad" placeholder="34" />

                <label htmlFor="correo">Correo</label>
                <input type="email" id="correo" placeholder="juan@gmail.com" />

                <label htmlFor="responsabilidad">Responsabilidad</label>
                <input type="text" id="responsabilidad" placeholder="Desarrollar" />

                <div className="botones">
                    <button onClick={createEmpleado}>Agregar empleado</button>
                    <button onClick={toogleEditar}>Cambiar Modo</button>
                </div>
            </section>
            }

    </form>
    )
}

export default Modifier;
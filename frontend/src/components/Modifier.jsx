import React, { useState } from 'react';



function Modifier(){
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
            <button onClick={toogleEditar}>Editar empleado</button>
        </div>

        {isEditing ? <h2>Estás editando</h2> : <h2>No estás editando</h2>}

    </form>
    )
}

export default Modifier;
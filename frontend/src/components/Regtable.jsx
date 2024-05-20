import React, { useState, useRef } from 'react';


function Regtable(data){

    const [setEmpleado] = useState(null);
    const deleteEmpleado = (id) => {
        id = data.id;
        console.log(id);

        fetch(`http://localhost:8000/empleado/${id}`, {
            method: 'DELETE',
            headers: {
            'accept': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
            console.log(data)
            setEmpleado(data); 
            }
            )
            .catch((error) => {
            console.error('Error fetching empleados:', error);
            }
            );
}

    const viewEmpleado = (id) => {
        id = data.id;
        console.log(id);

        fetch(`http://localhost:8000/empleado/${id}`, {
            method: 'GET',
            headers: {
            'accept': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
/*             alert("ID: " + data.id + "\nNombre: " + data.nombre + "\nRol: " + data.rol + "\nEdad: " + data.edad + "\nCorreo: " + data.correo + "\nResponsabilidad: " + data.responsabilidad); */
        }
            )
            .catch((error) => {
            console.error('Error fetching empleados:', error);
            }
            );
            ponerEmpleado(data);
        }

        const ponerEmpleado = (data) => {
            const contNombre = useRef( data.nombre)
            
            alert("ID: " + data.id + "\nNombre: " + data.nombre + "\nRol: " + data.rol + "\nEdad: " + data.edad + "\nCorreo: " + data.correo + "\nResponsabilidad: " + data.responsabilidad);

            console.log(contNombre.current);
        }


    
    return(
        <tr>
            <td>{data.id}</td>
            <td>{data.nombre}</td>
            <td>{data.rol}</td>
            <td>{data.edad}</td>
            <td>{data.correo}</td>
            <td>{data.responsabilidad}</td>
            <td>
                <button onClick={() => viewEmpleado(data.id)}>Editar</button>
                <button onClick={() => deleteEmpleado(data.id)}>Eliminar</button>
            </td>
        </tr>
    )
}

export default Regtable;
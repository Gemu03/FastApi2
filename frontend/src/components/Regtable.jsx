import React, { useState } from 'react';


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


    
    return(
        <tr>
            <td>{data.nombre}</td>
            <td>{data.rol}</td>
            <td>{data.edad}</td>
            <td>{data.correo}</td>
            <td>{data.responsabilidad}</td>
            <td>
                <button>Editar</button>
                <button onClick={() => deleteEmpleado(data.id)}>Eliminar</button>
            </td>
        </tr>
    )
}

export default Regtable;
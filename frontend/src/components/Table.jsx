import Regtable from "./Regtable";
import React, { useState } from 'react';


function Table() {
  const [empleados, setEmpleados] = useState([]);
  
  const getEmpleados = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/empleados/?skip=0', {
      method: 'GET',
      headers: {'Accept': 'application/json',},
    })
    .then((res) => res.json())
    .then((data) => {
      setEmpleados(data);
    })
    .catch((error) => {console.error('Error fetching empleados:',error);
  });
};
/* getEmpleados();*/
  return (
  <table>
        <thead>
          <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Edad</th>
              <th>Correo</th>
              <th>Responsabilidad</th>
              <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado, index) => (
              <Regtable
                  key={index}
                  nombre={empleado.nombre}
                  rol={empleado.rol}
                  edad={empleado.edad}
                  correo={empleado.correo}
                  responsabilidad={empleado.responsabilidad}
                  id={empleado.id}
              />))}
        </tbody>
        <button onClick={getEmpleados}>Obtener empleados</button>
      </table>
)}


export default Table;
import React, { useEffect, useState } from 'react';
import './index';
import Table from './components/Table';
import Modifier from './components/Modifier';

/* function App() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);a

  const getEmpleados = () => {
    fetch('http://localhost:8000/empleados/?skip=0', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpleados(data);
      })
      .catch((error) => {
        console.error('Error fetching empleados:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React App</h1>
        <button onClick={getEmpleados}>Obtener empleados</button>
        <div id="usuarios">
          {empleados.map((empleado, index) => (
            <Userbox
              key={index}
              nombre={empleado.nombre}
              rol={empleado.rol}
              edad={empleado.edad}
              correo={empleado.correo}
              responsabilidad={empleado.responsabilidad}
            />
          ))}
        </div>
      </header>
    </div>
  );
} */



function App() {
  return (
    <div className="App">
        <h1>Gestión de empleados</h1>
        <p>
          Proyecto creado con FastAPI, React y MySQL para hacer un CRUD de empleados.
        </p>
        <main>
          <Modifier />
          <Table />
        </main>
    </div>
  );
}




export default App;

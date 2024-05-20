import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeeProfile from './EmployeeProfile';

function App() {
  const [empleados, setEmpleados] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    edad: '',
    correo: '',
    rol: '',
    responsabilidad: ''
  });

  const getEmpleados = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/empleados/?skip=0', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpleados(data);
      })
      .catch((error) => {
        console.error('Error fetching empleados:', error);
      });
  };

  const deleteEmpleado = (id) => {
    fetch(`http://localhost:8000/empleado/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpleados((prevEmpleados) => prevEmpleados.filter((emp) => emp.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting empleado:', error);
      });
  };

  const viewEmpleado = (id) => {
    fetch(`http://localhost:8000/empleado/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          id: data.id,
          nombre: data.nombre,
          edad: data.edad,
          correo: data.correo,
          rol: data.rol,
          responsabilidad: data.responsabilidad
        });
        setIsEditing(true);
      })
      .catch((error) => {
        console.error('Error fetching empleado:', error);
      });
  };

  const createOrUpdateEmpleado = (event) => {
    event.preventDefault();
    const method = formData.id ? 'POST' : 'POST';
    const url = formData.id
      ? `http://localhost:8000/empleado/${formData.id}`
      : 'http://localhost:8000/empleado/';
    
    fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (method === 'POST') {
          setEmpleados((prevEmpleados) => [...prevEmpleados, data]);
        } else {
          setEmpleados((prevEmpleados) =>
            prevEmpleados.map((emp) => (emp.id === data.id ? data : emp))
          );
        }
        setFormData({
          id: '',
          nombre: '',
          edad: '',
          correo: '',
          rol: '',
          responsabilidad: ''
        });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error creating/updating empleado:', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const toggleEditar = (event) => {
    event.preventDefault();
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({
        id: '',
        nombre: '',
        edad: '',
        correo: '',
        rol: '',
        responsabilidad: ''
      });
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Gestión de empleados</h1>
        <p>Proyecto creado con FastAPI, React y MySQL para hacer un CRUD de empleados.</p>
        <main>
          <form onSubmit={createOrUpdateEmpleado}>
            {isEditing ? (
              <section className="isEditing">
                <h2>Modo Edición</h2>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Juan" />

                <label htmlFor="rol">Rol</label>
                <input type="text" id="rol" name="rol" value={formData.rol} onChange={handleChange} placeholder="Director" />

                <label htmlFor="edad">Edad</label>
                <input type="number" id="edad" name="edad" value={formData.edad} onChange={handleChange} placeholder="34" />

                <label htmlFor="correo">Correo</label>
                <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} placeholder="juan@gmail.com" />

                <label htmlFor="responsabilidad">Responsabilidad</label>
                <input type="text" id="responsabilidad" name="responsabilidad" value={formData.responsabilidad} onChange={handleChange} placeholder="Desarrollar" />

                <div className="botones">
                  <button type="submit">Confirmar</button>
                  <button onClick={toggleEditar}>Cancelar</button>
                </div>
              </section>
            ) : (
              <section className="isNotEditing">
                <h2>Modo Registro</h2>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Juan" />

                <label htmlFor="rol">Rol</label>
                <input type="text" id="rol" name="rol" value={formData.rol} onChange={handleChange} placeholder="Director" />

                <label htmlFor="edad">Edad</label>
                <input type="number" id="edad" name="edad" value={formData.edad} onChange={handleChange} placeholder="34" />

                <label htmlFor="correo">Correo</label>
                <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} placeholder="juan@gmail.com" />

                <label htmlFor="responsabilidad">Responsabilidad</label>
                <input type="text" id="responsabilidad" name="responsabilidad" value={formData.responsabilidad} onChange={handleChange} placeholder="Desarrollar" />

                <div className="botones">
                  <button type="submit">Agregar empleado</button>
                  <button onClick={toggleEditar}>Cambiar Modo</button>
                </div>
              </section>
            )}
          </form>

          <button onClick={getEmpleados}>Obtener empleados</button>
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
              {empleados.filter(emp => emp).map((empleado, index) => (
                <tr key={empleado.id || index}>
                  <td>{empleado.id}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.rol}</td>
                  <td>{empleado.edad}</td>
                  <td>{empleado.correo}</td>
                  <td>{empleado.responsabilidad}</td>
                  <td>
                    <button onClick={() => viewEmpleado(empleado.id)}>Editar</button>
                    <button onClick={() => deleteEmpleado(empleado.id)}>Eliminar</button>
                    <Link to={`/perfil/${empleado.id}`}>
                      <button>Ver Perfiles</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <Routes>
        <Route path="/perfil/:empleadoId" element={<EmployeeProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

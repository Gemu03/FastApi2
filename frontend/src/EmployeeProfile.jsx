import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EmployeeProfile = () => {
  const [perfiles, setPerfiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    empleado_id: '',
    habilidad: '',
    años_experiencia: '',
    certificacion: '',
    tiempo_en_empresa: '',
    salario: '',
    suscripcion_notificaciones: false,
  });

  const { empleadoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      empleado_id: empleadoId,
    }));
    
    fetch(`http://localhost:8000/perfiles/?empleado_id=${empleadoId}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setPerfiles(data);
      })
      .catch((error) => {
        console.error('Error fetching perfiles:', error);
      });
  }, [empleadoId]);

  const deletePerfil = (id) => {
    fetch(`http://localhost:8000/perfil/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    })
      .then((res) => {
        if (res.status === 200) {
          setPerfiles((prevPerfiles) => prevPerfiles.filter((perfil) => perfil.id !== id));
        }
      })
      .catch((error) => {
        console.error('Error deleting perfil:', error);
      });
  };

  const viewPerfil = (id) => {
    fetch(`http://localhost:8000/perfil/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setIsEditing(true);
      })
      .catch((error) => {
        console.error('Error fetching perfil:', error);
      });
  };

  const savePerfil = (event) => {
    event.preventDefault();

    // Reemplaza los campos vacíos con 0 o null
    const formDataWithDefaults = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === '' ? 0 : value])
    );

    console.log('formData:', formDataWithDefaults); // Log formData

    const method = 'POST';
    const url = isEditing
      ? `http://localhost:8000/perfil/${formDataWithDefaults.empleado_id}`
      : `http://localhost:8000/nuevo_perfil/${formDataWithDefaults.empleado_id}`;

    fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataWithDefaults),
    })
      .then((res) => {
        res.text().then((text) => console.log('Response text:', text)); // Log response
        return res.json();
      })
      .then((data) => {
        console.log('Data:', JSON.stringify(data, null, 2)); // Log data
        if (!isEditing) {
          setPerfiles((prevPerfiles) => [...prevPerfiles, data]);
        } else {
          setPerfiles((prevPerfiles) =>
            prevPerfiles.map((perfil) => (perfil.empleado_id === data.empleado_id ? data : perfil))
          );
        }
        setFormData({
          id: '',
          empleado_id: empleadoId,
          habilidad: '',
          años_experiencia: '',
          certificacion: '',
          tiempo_en_empresa: '',
          salario: '',
          suscripcion_notificaciones: false,
        });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error saving perfil:', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='App'>
      <h2>Perfil de Empleado, ID: {empleadoId}</h2>
      <div className='perfilContainer'>

      <form onSubmit={savePerfil}>
        <div className="formPerfil">
          <label htmlFor="habilidad">Habilidad</label>
          <input
            type="text"
            id="habilidad"
            name="habilidad"
            value={formData.habilidad}
            onChange={handleChange}
            placeholder="Python"
          />
        </div>

        <div className="formPerfil">
          <label htmlFor="años_experiencia">Años de Experiencia</label>
          <input
            type="number"
            id="años_experiencia"
            name="años_experiencia"
            value={formData.años_experiencia}
            onChange={handleChange}
            placeholder="5"
          />
        </div>

        <div className="formPerfil">
          <label htmlFor="certificacion">Certificación</label>
          <input
            type="text"
            id="certificacion"
            name="certificacion"
            value={formData.certificacion}
            onChange={handleChange}
            placeholder="Certificado Python"
          />
        </div>

        <div className="formPerfil">
          <label htmlFor="tiempo_en_empresa">Tiempo en la Empresa</label>
          <input
            type="number"
            id="tiempo_en_empresa"
            name="tiempo_en_empresa"
            value={formData.tiempo_en_empresa}
            onChange={handleChange}
            placeholder="2"
          />
        </div>


        <div className="formPerfil">
          <label htmlFor="salario">Salario</label>
          <input
            type="number"
            id="salario"
            name="salario"
            value={formData.salario}
            onChange={handleChange}
            placeholder="50000"
          />
        </div>

        <div className="formPerfil">
          <div>
            <label htmlFor="suscripcion_notificaciones">Suscripción a Notificaciones</label>
            <input
              type="checkbox"
              id="suscripcion_notificaciones"
              name="suscripcion_notificaciones"
              checked={formData.suscripcion_notificaciones}
              onChange={(event) =>
                setFormData((prevData) => ({
                  ...prevData,
                  suscripcion_notificaciones: event.target.checked,
                }))
              }
            />
          </div>
        </div>

        <div className="botones">
          <button className='outerButton' type="submit">{isEditing ? 'Actualizar Perfil' : 'Agregar Perfil'}</button>
          {isEditing && <button onClick={() => setIsEditing(false)}>Cancelar</button>}
        </div>
      </form>

<div>
              <Link to="/">
                <button className='outerButton ' >Volver</button>
              </Link>
  <table>
        <thead>
          <tr>
            <th>ID Empleado</th>
            <th>Habilidad</th>
            <th>Años de Experiencia</th>
            <th>Certificación</th>
            <th>Tiempo en Empresa</th>
            <th>Salario</th>
            <th>Suscripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
       
        <tbody>
          {perfiles.map((perfil) => (
            <tr key={perfil.id}>
              <td>{perfil.empleado_id}</td>
              <td>{perfil.habilidad}</td>
              <td>{perfil.años_experiencia}</td>
              <td>{perfil.certificacion}</td>
              <td>{perfil.tiempo_en_empresa}</td>
              <td>{perfil.salario}</td>
              <td>{perfil.suscripcion_notificaciones ? 'Sí' : 'No'}</td>
              <td className='botonesTabla'>
                <button onClick={() => viewPerfil(perfil.empleado_id)}>Editar</button>
                <button onClick={() => deletePerfil(perfil.empleado_id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>

      </div>
      
      
    </div>
  );
};

export default EmployeeProfile;

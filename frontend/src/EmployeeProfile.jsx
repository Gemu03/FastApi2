import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';



function EmployeeProfile() {

  const { empleadoId } = useParams();

  const [perfiles, setPerfiles] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({

    perfil_id: '',

    habilidad: '',

    años_experiencia: '',

    certificacion: '',

    tiempo_en_empresa: '',

    salario: '',

    suscripcion_notificaciones: false

  });



  useEffect(() => {

    fetch(`http://localhost:8000/perfil/${empleadoId}`)

      .then((res) => res.json())

      .then((data) => {

        // Verificación asegurando que `data` es un array

        if (Array.isArray(data)) {

          setPerfiles(data);

        } else {

          console.error('Data received is not an array:', data);

        }

      })

      .catch((error) => console.error('Error fetching perfiles:', error));

  }, [empleadoId]);



  const handleChange = (event) => {

    const { name, value, type, checked } = event.target;

    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

  };



  const handleEdit = (perfil) => {

    setFormData(perfil);

    setIsEditing(true);

  };



  const handleCancel = () => {

    setIsEditing(false);

    setFormData({

      perfil_id: '',

      habilidad: '',

      años_experiencia: '',

      certificacion: '',

      tiempo_en_empresa: '',

      salario: '',

      suscripcion_notificaciones: false

    });

  };



  const handleSubmit = (event) => {

    event.preventDefault();

    const method = formData.perfil_id ? 'POST' : 'POST';

    const url = formData.perfil_id

      ? `http://localhost:8000/perfil/${formData.perfil_id}`

      : `http://localhost:8000/perfil/${empleadoId}`;

    fetch(url, {

      method: method,

      headers: {

        'Accept': 'application/json',

        'Content-Type': 'application/json'

      },

      body: JSON.stringify(formData)

    })

      .then((res) => res.json())

      .then((data) => {

        if (method === 'POST') {

          setPerfiles((prevPerfiles) =>

            prevPerfiles.map((perfil) =>

              perfil.perfil_id === data.perfil_id ? data : perfil

            )

          );

        } else {

          setPerfiles((prevPerfiles) => [...prevPerfiles, data]);

        }

        handleCancel();

      })

      .catch((error) => console.error('Error creating/updating perfil:', error));

  };



  return (

    <div>

      <h2>Perfiles del Empleado</h2>

      <Link to="/">Volver</Link>

      <form onSubmit={handleSubmit}>

        <div>

          <label>Habilidad:</label>

          <input

            type="text"

            name="habilidad"

            value={formData.habilidad}

            onChange={handleChange}

          />

        </div>

        <div>

          <label>Años de Experiencia:</label>

          <input

            type="number"

            name="años_experiencia"

            value={formData.años_experiencia}

            onChange={handleChange}

          />

        </div>

        <div>

          <label>Certificación:</label>

          <input

            type="text"

            name="certificacion"

            value={formData.certificacion}

            onChange={handleChange}

          />

        </div>

        <div>

          <label>Tiempo en Empresa:</label>

          <input

            type="number"

            name="tiempo_en_empresa"

            value={formData.tiempo_en_empresa}

            onChange={handleChange}

          />

        </div>

        <div>

          <label>Salario:</label>

          <input

            type="number"

            name="salario"

            value={formData.salario}

            onChange={handleChange}

          />

        </div>

        <div>

          <label>Suscripción a Notificaciones:</label>

          <input

            type="checkbox"

            name="suscripcion_notificaciones"

            checked={formData.suscripcion_notificaciones}

            onChange={handleChange}

          />

        </div>

        <button type="submit">{isEditing ? 'Actualizar Perfil' : 'Agregar Perfil'}</button>

        {isEditing && <button type="button" onClick={handleCancel}>Cancelar</button>}

      </form>

      <table>

        <thead>

          <tr>

            <th>Habilidad</th>

            <th>Años de Experiencia</th>

            <th>Certificación</th>

            <th>Tiempo en Empresa</th>

            <th>Salario</th>

            <th>Suscripción a Notificaciones</th>

            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {perfiles.map((perfil) => (

            <tr key={perfil.perfil_id}>

              <td>{perfil.habilidad}</td>

              <td>{perfil.años_experiencia}</td>

              <td>{perfil.certificacion}</td>

              <td>{perfil.tiempo_en_empresa}</td>

              <td>{perfil.salario}</td>

              <td>{perfil.suscripcion_notificaciones ? 'Sí' : 'No'}</td>

              <td>

                <button type="button" onClick={() => handleEdit(perfil)}>Editar</button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}



export default EmployeeProfile;
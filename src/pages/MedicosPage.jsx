import React, { useState, useEffect } from 'react';

function MedicosPage() {
    const [medicos, setMedicos] = useState([]);
    const [editingMedicoId, setEditingMedicoId] = useState(null); // ID del doctor que se está editando
    const [editedMedicoData, setEditedMedicoData] = useState({}); // Datos del médico editado

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/medicos');
                if (response.ok) {
                    const data = await response.json();
                    if (data && Array.isArray(data)) {
                        setMedicos(data);
                    } else if (data && data.medicos && Array.isArray(data.medicos)) {
                        setMedicos(data.medicos);
                    } else {
                        console.error('Invalid data structure received:', data);
                    }
                } else {
                    console.error('Failed to load data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
    fetchData();
  }, []);

  const handleEdit = (medicoId) => {
      const medicoToEdit = medicos.find((medico) => medico.id === medicoId);
      setEditingMedicoId(medicoId);
      setEditedMedicoData({...medicoToEdit});  
  };
    
  const handleCancelEdit = () => {
    setEditingMedicoId(null);
    setEditedMedicoData({});
  };


  const handleInputChange = (e) => {
    setEditedMedicoData({
      ...editedMedicoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = async () => {
    try {
        const response = await fetch(`http://localhost:3001/medicos/${editingMedicoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMedicoData),
      });

      if (response.ok) {
        const updatedMedicos = medicos.map((medico) =>
          medico.id === editingMedicoId ? editedMedicoData : medico
        );
        setMedicos(updatedMedicos);
        setEditingMedicoId(null);
        setEditedMedicoData({});
      } else {
        console.error('Failed to update doctor:', response.status);
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

    return (
        <div>
            <h2>Lista de Médicos</h2>
             {medicos.map((medico) => (
                 <div key={medico.id}>
                     {editingMedicoId === medico.id ? (
                        <div>
                        <input
                          type="text"
                          name="nombre"
                          value={editedMedicoData.nombre}
                          onChange={handleInputChange}
                          />
                          <input
                          type="text"
                          name="apellido"
                          value={editedMedicoData.apellido}
                          onChange={handleInputChange}
                          />
                               <input
                          type="text"
                          name="experiencia"
                          value={editedMedicoData.experiencia}
                          onChange={handleInputChange}
                          />
                        <input
                           type="text"
                           name="especializacion"
                           value={editedMedicoData.especializacion}
                           onChange={handleInputChange}
                           />
                           <button onClick={handleSaveEdit}>Guardar</button>
                           <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      ) : (
                        <>
                            <p><strong>Nombre:</strong> {medico.nombre}</p>
                            <p><strong>Apellido:</strong> {medico.apellido}</p>
                            <p><strong>Experiencia:</strong> {medico.experiencia}</p>
                            <p><strong>Especialidad:</strong> {medico.especializacion}</p>
                            <button onClick={() => handleEdit(medico.id)}>Editar</button>
                        </>
                      )}
                        <hr />
                   </div>
               ))}
        </div>
    );
}

export default MedicosPage;
import React from 'react';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';

const EstudiantesList = () => {
  const estudiantes = useFirestoreCollection('estudiantes');

  return (
    <div>
      <h1>Lista de Estudiantes</h1>
      <ul>
        {estudiantes.map(estudiante => (
          <li key={estudiante.id}>{estudiante.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EstudiantesList;

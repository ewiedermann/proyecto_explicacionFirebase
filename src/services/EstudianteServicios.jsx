import {db} from '../utils/firebase';

// Agregar un nuevo estudiante
export const addEstudiante = student => {
  return db.collection('estudiantes').add(student);
};

// Actualizar la información de un estudiante
export const updateEstudiante = (id, updatedInfo) => {
  return db.collection('estudiantes').doc(id).update(updatedInfo);
};

// Eliminar a un estudiante
export const deleteEstudiante = id => {
  return db.collection('estudiantes').doc(id).delete();
};

// Obtener un estudiante por su ID
export const getEstudiante = id => {
  return db.collection('estudiantes').doc(id).get();
};

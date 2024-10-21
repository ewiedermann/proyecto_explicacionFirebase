import {db} from '../utils/firebase';

// Agregar un nuevo profesor
export const addProfesor = profesor => {
  return db.collection('profesores').add(profesor);
};

// Actualizar la información de un profesor
export const updateProfesor = (id, updatedInfo) => {
  return db.collection('profesores').doc(id).update(updatedInfo);
};

// Eliminar a un profesor
export const deleteProfesor = id => {
  return db.collection('profesores').doc(id).delete();
};

// Obtener un profesor por su ID
export const getProfesor = id => {
  return db.collection('profesores').doc(id).get();
};

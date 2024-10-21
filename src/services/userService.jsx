import {db} from '../utils/firebase';
import auth from '@react-native-firebase/auth';

// Crear usuario con un rol específico (Administrador, Profesor o Alumno)
export const registerUser = async (email, password, role) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    // Guardar el rol del usuario en Firestore
    await db.collection('usuarios').doc(user.uid).set({
      email: email,
      role: role, // Rol del usuario: 'admin', 'profesor', 'alumno'
    });

    return user;
  } catch (error) {
    console.error('Error registrando usuario:', error);
    throw error;
  }
};

// Obtener el rol de un usuario
export const getUserRole = async userId => {
  try {
    const userDoc = await db.collection('usuarios').doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data().role;
    } else {
      throw new Error('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error obteniendo rol del usuario:', error);
    throw error;
  }
};

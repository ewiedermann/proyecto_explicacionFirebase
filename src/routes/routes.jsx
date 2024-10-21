import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getUserRole} from '../services/userService';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ProfesorDashboard from '../pages/Profesor/ProfesorDashboard';
import AlumnoDashboard from '../pages/Alumno/AlumnoDashboard';
import LoginScreen from '../pages/Auth/LoginScreen';

const Stack = createStackNavigator();

const Routes = ({userId}) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Obtener el rol del usuario
    const fetchUserRole = async () => {
      try {
        const userRole = await getUserRole(userId);
        setRole(userRole);
      } catch (error) {
        console.error('Error obteniendo rol del usuario:', error);
      }
    };

    if (userId) {
      fetchUserRole();
    }
  }, [userId]);

  if (!role) {
    return <LoginScreen />; // Mostrar login mientras se obtiene el rol
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Rutas específicas según el rol */}
        {role === 'admin' && (
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        )}
        {role === 'profesor' && (
          <Stack.Screen
            name="ProfesorDashboard"
            component={ProfesorDashboard}
          />
        )}
        {role === 'alumno' && (
          <Stack.Screen name="AlumnoDashboard" component={AlumnoDashboard} />
        )}
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

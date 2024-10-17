import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard/Dashboard';
import EstudianteList from '../pages/Estudiante/EstudianteList';
import EstudiantePerfil from '../components/estudiante/EstudiantePerfil';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        {/* Pantalla principal */}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{title: 'Panel Principal'}}
        />

        {/* Pantalla de lista de estudiantes */}
        <Stack.Screen
          name="StudentsList"
          component={EstudianteList}
          options={{title: 'Lista de Estudiantes'}}
        />

        {/* Pantalla de perfil de estudiante */}
        <Stack.Screen
          name="StudentProfile"
          component={EstudiantePerfil}
          options={{title: 'Perfil del Estudiante'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

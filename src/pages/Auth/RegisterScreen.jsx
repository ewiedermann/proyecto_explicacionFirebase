import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {registerUser} from '../../services/userService';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('alumno'); // Rol por defecto como 'alumno'

  const handleRegister = async () => {
    try {
      await registerUser(email, password, role);
      Alert.alert('Registro exitoso', 'Ahora, inicie sesión.');
      navigation.navigate('Login'); // Redirigir al login tras el registro
    } catch (error) {
      Alert.alert('Error en el registro', error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{borderWidth: 1, padding: 8, marginBottom: 10}}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderWidth: 1, padding: 8, marginBottom: 10}}
      />
      <TextInput
        placeholder="Rol (admin, profesor, alumno)"
        value={role}
        onChangeText={setRole}
        style={{borderWidth: 1, padding: 8, marginBottom: 10}}
      />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;

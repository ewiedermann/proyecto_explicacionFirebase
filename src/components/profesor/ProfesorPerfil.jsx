import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {getProfesor, updateProfesor} from '../../services/ProfesorServicio';

const ProfesorProfile = ({route, navigation}) => {
  const {profesorId} = route.params; // ID del profesor pasado a través de la navegación
  const [profesor, setProfesor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');

  // Obtener la información del profesor
  useEffect(() => {
    const fetchProfesor = async () => {
      try {
        const profesorDoc = await getProfesor(profesorId);
        if (profesorDoc.exists) {
          const data = profesorDoc.data();
          setProfesor(data);
          setName(data.name || '');
          setEmail(data.email || '');
          setGrade(data.grade || '');
        } else {
          Alert.alert('Profesor no encontrado');
        }
      } catch (error) {
        Alert.alert('Error al cargar la información del profesor');
      } finally {
        setLoading(false);
      }
    };

    fetchProfesor();
  }, [profesorId]);

  // Guardar los cambios del perfil
  const handleSave = async () => {
    if (name === '' || email === '' || grade === '') {
      Alert.alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await updateProfesor(profesorId, {
        name,
        email,
        grade,
      });
      Alert.alert('Información actualizada con éxito');
      navigation.goBack(); // Volver a la pantalla anterior después de guardar
    } catch (error) {
      Alert.alert('Error al actualizar la información');
    }
  };

  if (loading) {
    return (
      <View>
        <Text>Cargando perfil del profesor...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Perfil del Profesor</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={{borderWidth: 1, padding: 8, marginBottom: 10}}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{borderWidth: 1, padding: 8, marginBottom: 10}}
      />
      <TextInput
        placeholder="Nota"
        value={grade}
        onChangeText={setGrade}
        keyboardType="numeric"
        style={{borderWidth: 1, padding: 8, marginBottom: 10}}
      />
      <Button title="Guardar Cambios" onPress={handleSave} />
    </View>
  );
};

export default ProfesorProfile;

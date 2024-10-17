import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {getEstudiante, updateEstudiante} from '../../services/studentService';

const EstudiantePerfil = ({route, navigation}) => {
  const {estudianteId} = route.params; // ID del estudiante pasado a través de la navegación
  const [estudiante, setEstudiante] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');

  // Obtener la información del estudiante
  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const estudiannteDoc = await getEstudiante(estudianteId);
        if (estudiannteDoc.exists) {
          const data = estudiannteDoc.data();
          setEstudiante(data);
          setName(data.name || '');
          setEmail(data.email || '');
          setGrade(data.grade || '');
        } else {
          Alert.alert('Estudiante no encontrado');
        }
      } catch (error) {
        Alert.alert('Error al cargar la información del estudiante');
      } finally {
        setLoading(false);
      }
    };

    fetchEstudiante();
  }, [estudianteId]);

  // Guardar los cambios del perfil
  const handleSave = async () => {
    if (name === '' || email === '' || grade === '') {
      Alert.alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await updateEstudiante(estudianteId, {
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
        <Text>Cargando perfil del estudiante...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Perfil del Estudiante</Text>
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

export default EstudiantePerfil;

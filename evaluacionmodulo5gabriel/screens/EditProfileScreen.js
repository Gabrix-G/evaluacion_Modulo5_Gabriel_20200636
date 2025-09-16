// screens/EditProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const EditProfileScreen = ({ navigation, route, setUserData }) => {
  const { userData } = route.params;
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age.toString());
  const [specialty, setSpecialty] = useState(userData.specialty);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name || !age || !specialty) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
        age: parseInt(age),
        specialty,
        updatedAt: new Date(),
      });

      // Actualizar el estado global
      if (setUserData) {
        setUserData(prev => ({
          ...prev,
          name,
          age: parseInt(age),
          specialty
        }));
      }

      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Especialidad"
        value={specialty}
        onChangeText={setSpecialty}
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Actualizando...' : 'Actualizar Perfil'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
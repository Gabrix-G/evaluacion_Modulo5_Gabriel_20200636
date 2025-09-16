// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const HomeScreen = ({ navigation, userData, setUserData }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserData(null); // Limpiar datos al cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Mostrar indicador de carga si userData es null
  if (!userData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando información del usuario...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>{userData?.name}</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Email: {userData?.email}</Text>
        <Text style={styles.infoText}>Edad: {userData?.age}</Text>
        <Text style={styles.infoText}>Especialidad: {userData?.specialty}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile', { userData })}
      >
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
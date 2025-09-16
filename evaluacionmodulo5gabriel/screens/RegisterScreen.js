// screens/RegisterScreen.js (versión mejorada)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log("Intentando registrar usuario...");
    
    // Validar todos los campos obligatorios
    if (!name || !email || !password || !age || !specialty) {
      console.log("Faltan campos obligatorios");
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password.length < 6) {
      console.log("Contraseña demasiado corta");
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (isNaN(age) || parseInt(age) <= 0) {
      console.log("Edad inválida");
      Alert.alert('Error', 'Por favor ingresa una edad válida');
      return;
    }

    setLoading(true);
    try {
      console.log("Creando usuario en Firebase Auth...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario creado en Auth:", user.uid);

      console.log("Guardando datos en Firestore...");
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        age: parseInt(age),
        specialty,
        createdAt: new Date(),
      });
      console.log("Datos guardados en Firestore");

      Alert.alert('Éxito', 'Usuario registrado correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Código de error:", error.code);
      console.error("Mensaje de error:", error.message);
      
      // Manejar errores específicos
      let errorMessage = "Error al registrar usuario";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo electrónico ya está en uso';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'El correo electrónico no es válido';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es demasiado débil';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre completo *"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico *"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña (mínimo 6 caracteres) *"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Edad *"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Especialidad *"
        value={specialty}
        onChangeText={setSpecialty}
      />
      
      <Text style={styles.required}>* Campos obligatorios</Text>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  required: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default RegisterScreen;
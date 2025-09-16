// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Importar pantallas
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import EditProfileScreen from './screens/EditProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuario ha iniciado sesión
        setUser(user);
        
        // Obtener datos adicionales del usuario desde Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No se encontraron datos adicionales del usuario");
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      } else {
        // Usuario ha cerrado sesión
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Usuario autenticado
          <>
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} userData={userData} setUserData={setUserData} />}
            </Stack.Screen>
            <Stack.Screen name="EditProfile">
              {props => <EditProfileScreen {...props} userData={userData} setUserData={setUserData} />}
            </Stack.Screen>
          </>
        ) : (
          // Usuario no autenticado
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 
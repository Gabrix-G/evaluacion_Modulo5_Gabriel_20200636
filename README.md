Aplicación de Autenticación con Expo y Firebase
Información del Estudiante
Nombre: Gabriel Alexander Garcia Quintana

Carnet: 20200636

Video Demostrativo (Link: )

Dependencias Utilizadas:

Dependencias Principales
json
"dependencies": {
  "expo": "~48.0.0",
  "react": "18.2.0",
  "react-native": "0.71.0",
  "firebase": "^10.0.0"
}

Dependencias de Navegación
json
"dependencies": {
  "@react-navigation/native": "^6.1.0",
  "@react-navigation/stack": "^6.3.0",
  "react-native-screens": "~3.20.0",
  "react-native-safe-area-context": "4.5.0"
}

Dependencias de Desarrollo
json
"devDependencies": {
  "@babel/core": "^7.20.0"
}
Instalación
Clonar o descargar el proyecto

Ejecutar npm install para instalar las dependencias

Ejecutar npx expo start para iniciar la aplicación

Funcionalidades

Splash Screen inicial

Registro de usuarios con Firebase Authentication

Inicio de sesión con autenticación por correo electrónico

Pantalla principal con información del usuario

Edición de perfil de usuario

Almacenamiento de datos en Firestore

Estructura de Datos
Los usuarios se almacenan en Firestore con la siguiente información:

Nombre completo

Correo electrónico

Contraseña (hash)

Edad

Especialidad

Fecha de creación

Fecha de actualización

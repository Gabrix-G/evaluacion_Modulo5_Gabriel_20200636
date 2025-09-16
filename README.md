Aplicación de Autenticación con Expo y Firebase
📋 Información del Estudiante
Campo	Valor
Nombre	Gabriel Alexander Garcia Quintana
Carnet	20200636

🎥 Video Demostrativo
[Aun no se ha realizado]

Nota: El video debe ser accesible sin necesidad de solicitar permisos especiales

🚀 Características Principales
✨ Splash Screen al iniciar la aplicación

👥 Registro de usuarios con Firebase Authentication

🔐 Inicio de sesión con autenticación por correo electrónico

🏠 Pantalla principal con información del usuario

✏️ Edición de perfil de usuario

💾 Almacenamiento de datos en Firestore

🛠️ Tecnologías Utilizadas
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
📦 Instalación y Uso
Clonar o descargar el proyecto

Instalar dependencias:

bash
npm install
Configurar Firebase:

Crear proyecto en Firebase Console

Habilitar Authentication con proveedor Email/Password

Crear base de datos Firestore

Configurar las credenciales en firebase.js

Ejecutar la aplicación:

bash
npx expo start
Escanear el código QR con la app Expo Go en dispositivo móvil

🗃️ Estructura de Datos
Los usuarios se almacenan en Firestore con la siguiente estructura:

Campo	Tipo	Descripción
name	string	Nombre completo del usuario
email	string	Correo electrónico
password	string	Contraseña (hash)
age	number	Edad del usuario
specialty	string	Especialidad del usuario
createdAt	timestamp	Fecha de creación
updatedAt	timestamp	Fecha de actualización
📁 Estructura del Proyecto
text
evaluacionmodulo5gabriel/
├── assets/
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── screens/
│   ├── SplashScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   └── EditProfileScreen.js
├── firebase.js
├── App.js
├── app.json
└── package.json
🔧 Configuración de Firebase
Habilitar Authentication con proveedor Email/Password

Configurar Firestore Database con las siguientes reglas iniciales:

javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
Reemplazar la configuración en firebase.js con las credenciales del proyecto


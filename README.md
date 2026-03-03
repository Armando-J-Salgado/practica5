# Documentación del Proyecto - Task Manager App

## 📋 Nombre del Proyecto
**Task Manager App** - Aplicación de Gestión de Tareas con Autenticación

## 📝 Descripción
Aplicación web moderna para gestionar tareas de forma eficiente. Permite a los usuarios crear, filtrar, editar y eliminar tareas con sistema de autenticación seguro basado en Firebase. Incluye estadísticas de tareas, filtros avanzados y notificaciones interactivas.

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── components/
│   ├── common/
│   │   ├── ConfirmToast.jsx
│   │   └── LoadingSpinner.jsx
│   ├── layout/
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   └── tasks/
│       ├── TaskCard.jsx
│       ├── TaskFilters.jsx
│       ├── TaskForm.jsx
│       ├── TaskList.jsx
│       └── TaskStats.jsx
├── hooks/
│   └── useTasks.js
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── dashboard/
│       ├── Dashboard.jsx
│       └── TaskDetails.jsx
├── routes/
│   ├── AppRouter.jsx
│   └── ProtectedRoute.jsx
├── services/
│   ├── authService.js
│   ├── firebase.js
│   └── taskService.js
├── store/
│   ├── authStore.js
│   ├── taskStore.js
│   └── uiStore.js
├── utils/
│   ├── constants.js
│   └── dateHelpers.js
├── App.jsx
├── index.css
└── main.jsx
```

## 🚀 Instalación y Configuración Local

### Requisitos Previos
- Node.js (v18 o superior)
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/task-manager-app.git
cd task-manager-app
```

2. **Instalar dependencias**
```bash
npm install
```
O si usas yarn:
```bash
yarn install
```

3. **Configurar variables de entorno**
Crea un archivo `.env.local` en la raíz del proyecto con tus credenciales de Firebase:
```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en ``
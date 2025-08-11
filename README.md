# Real Plaza - Sistema de Gestión de Productos

Una aplicación web moderna para la gestión de productos de Real Plaza, construida con React, TypeScript, Tailwind CSS y TanStack Query.

## 🚀 Características

- **Autenticación de usuarios** - Login y registro con validación
- **Gestión de productos** - CRUD completo de productos
- **Filtros avanzados** - Búsqueda por nombre, categoría, precio y estado
- **Paginación** - Navegación eficiente de grandes catálogos
- **Dashboard interactivo** - Estadísticas y acciones rápidas
- **Diseño responsivo** - Optimizado para desktop y móvil
- **Notificaciones** - Feedback visual con toast notifications

## 🛠️ Tecnologías

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **TanStack Query** - Gestión de estado del servidor
- **React Router** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para APIs
- **React Hot Toast** - Notificaciones elegantes
- **Vite** - Herramienta de construcción rápida

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd front
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   ```
   http://localhost:3000
   ```

## 🎯 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta el linter de código

## 🔐 Credenciales de Demo

Para probar la aplicación, puedes usar estas credenciales:

**Usuario Admin:**
- Email: `admin@realplaza.com`
- Contraseña: `admin123`

**Usuario Regular:**
- Email: `user@realplaza.com`
- Contraseña: `user123`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes comunes (Button, Input, Modal, etc.)
│   └── layout/         # Componentes de layout (Header, Layout, etc.)
├── features/           # Características por dominio
│   ├── auth/          # Autenticación
│   └── products/      # Gestión de productos
├── hooks/             # Custom hooks de React
├── lib/               # Configuraciones y utilidades
├── pages/             # Páginas de la aplicación
├── routes/            # Configuración de rutas
├── services/          # Servicios de API
└── types/             # Definiciones de TypeScript
```

## 🎨 Características de UI/UX

- **Diseño moderno** - Interfaz limpia y profesional
- **Tema personalizado** - Colores de marca de Real Plaza
- **Componentes reutilizables** - Sistema de diseño consistente
- **Feedback visual** - Estados de carga, errores y éxito
- **Navegación intuitiva** - Rutas protegidas y navegación clara

## 🔧 Configuración

La aplicación utiliza datos simulados (mock data) para demostración. En un entorno de producción, estos servicios se conectarían a una API real.

### Configuración de Tailwind

El proyecto incluye una configuración personalizada de Tailwind con:
- Colores de marca personalizados
- Fuente Inter de Google Fonts
- Clases utilitarias extendidas

### Configuración de TanStack Query

- Cache de 5 minutos para consultas
- Reintentos automáticos limitados
- DevTools habilitadas en desarrollo

## 📱 Funcionalidades

### Dashboard
- Estadísticas de productos
- Acciones rápidas
- Vista de productos recientes

### Gestión de Productos
- Lista con filtros avanzados
- Formulario de creación/edición
- Eliminación con confirmación
- Búsqueda en tiempo real
- Paginación

### Autenticación
- Login con validación
- Registro de nuevos usuarios
- Rutas protegidas
- Gestión de sesión

## 🚀 Próximas Mejoras

- Integración con API real
- Subida de imágenes
- Exportación de datos
- Reportes avanzados
- Notificaciones push
- Modo oscuro

## 📄 Licencia

© 2024 Real Plaza. Todos los derechos reservados.
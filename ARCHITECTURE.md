# 📐 Diagrama de Arquitectura del Proyecto

Basándome en la estructura del proyecto, aquí tienes un análisis completo de la arquitectura y comunicación entre módulos:

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  📱 Pages          │  🧩 Components     │  🎯 Features      │
│  - LoginPage       │  - Layout          │  - Auth           │
│  - ProductsPage    │  - Common          │  - Products       │
│  - DashboardPage   │                    │                   │
│  - RegisterPage    │                    │                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                     │
├─────────────────────────────────────────────────────────────┤
│  🪝 Hooks          │  🔄 Services       │  📋 Types         │
│  - useAuth         │  - auth.service    │  - auth.types     │
│  - useProducts     │  - product.service │  - product.types  │
│                    │                    │  - api.types      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  🌐 API Client     │  📊 Mock Data      │  🛣️ Routes        │
│  - api.ts          │  - mockData.ts     │  - AppRoutes      │
└─────────────────────────────────────────────────────────────┘



## 🔍 Descripción Detallada de Capas

### 🎨 **Presentation Layer (Capa de Presentación)**

#### 📱 **Pages** (`/src/pages/`)
- **Propósito**: Componentes de nivel superior que representan rutas completas
- **Responsabilidades**:
  - Orquestar componentes y features
  - Manejar el estado de la página
  - Integrar múltiples features

#### 🧩 **Components** (`/src/components/`)
- **Common**: Componentes reutilizables (botones, inputs, modales)
- **Layout**: Estructura de la aplicación (header, sidebar, footer)
- **Responsabilidades**:
  - UI pura y reutilizable
  - Recibir props y emitir eventos
  - No contener lógica de negocio

#### 🎯 **Features** (`/src/features/`)
- **Auth**: Autenticación y autorización
- **Products**: Gestión de productos
- **Responsabilidades**:
  - Encapsular funcionalidades específicas
  - Componentes especializados por dominio
  - Integrar hooks y servicios

### 🧠 **Business Logic Layer (Capa de Lógica de Negocio)**

#### 🪝 **Hooks** (`/src/hooks/`)
- **useAuth.ts**: Manejo de autenticación
- **useProducts.ts**: Operaciones CRUD de productos
- **Responsabilidades**:
  - Encapsular lógica de estado
  - Integrar React Query para cache
  - Proporcionar API consistente a componentes

#### 🔄 **Services** (`/src/services/`)
- **auth.service.ts**: Servicios de autenticación
- **product.service.ts**: Servicios de productos
- **Responsabilidades**:
  - Comunicación con APIs
  - Transformación de datos
  - Manejo de errores

#### 📋 **Types** (`/src/types/`)
- **auth.types.ts**: Tipos de autenticación
- **product.types.ts**: Tipos de productos
- **api.types.ts**: Tipos de API
- **Responsabilidades**:
  - Definir contratos de datos
  - Garantizar type safety
  - Documentar estructuras

### 💾 **Data Access Layer (Capa de Acceso a Datos)**

#### 🌐 **API Client** (`/src/lib/api.ts`)
- **Responsabilidades**:
  - Configuración de Axios
  - Interceptors para auth
  - Manejo centralizado de errores

#### 📊 **Mock Data** (`/src/lib/mockData.ts`)
- **Responsabilidades**:
  - Datos de prueba
  - Fallback durante desarrollo
  - Testing

#### 🛣️ **Routes** (`/src/routes/`)
- **Responsabilidades**:
  - Definir navegación
  - Protección de rutas
  - Lazy loading

## 🔄 Patrones de Comunicación

### 1. **Top-Down Data Flow**
```
Pages → Components → Features → Hooks → Services → API
```

### 2. **Event Bubbling**
```
User Action → Component Event → Hook Handler → Service Call
```

### 3. **State Management**
```
React Query Cache ← Hooks ← Components
```

## 🎯 Beneficios de esta Arquitectura

✅ **Separación de responsabilidades**
✅ **Reutilización de código**
✅ **Fácil testing**
✅ **Escalabilidad**
✅ **Mantenibilidad**
✅ **Type safety con TypeScript**

## 🔧 Tecnologías Clave

- **React + TypeScript**: UI y type safety
- **React Query**: Cache y sincronización
- **Axios**: Cliente HTTP
- **Tailwind CSS**: Estilos
- **Vite**: Build tool
- **Vitest**: Testing

## 📁 Estructura de Archivos Detallada

```
src/
├── App.tsx                 # Componente principal
├── main.tsx               # Punto de entrada
├── index.css              # Estilos globales
│
├── components/            # Componentes reutilizables
│   ├── common/           # Componentes básicos
│   └── layout/           # Componentes de layout
│
├── features/             # Funcionalidades por dominio
│   ├── auth/            # Autenticación
│   ├── products/        # Gestión de productos
│   └── index.ts         # Exportaciones
│
├── hooks/               # Custom hooks
│   ├── useAuth.ts       # Hook de autenticación
│   ├── useProducts.ts   # Hook de productos
│   └── index.ts         # Exportaciones
│
├── lib/                 # Utilidades y configuración
│   ├── api.ts           # Cliente HTTP
│   └── mockData.ts      # Datos de prueba
│
├── pages/               # Páginas de la aplicación
│   ├── LoginPage.tsx    # Página de login
│   ├── ProductsPage.tsx # Página de productos
│   ├── DashboardPage.tsx# Dashboard
│   ├── RegisterPage.tsx # Registro
│   └── index.ts         # Exportaciones
│
├── routes/              # Configuración de rutas
│   ├── AppRoutes.tsx    # Definición de rutas
│   └── index.ts         # Exportaciones
│
├── services/            # Servicios de API
│   ├── auth.service.ts  # Servicios de auth
│   ├── product.service.ts# Servicios de productos
│   └── index.ts         # Exportaciones
│
├── test/                # Configuración de testing
│   └── setup.ts         # Setup de Vitest
│
└── types/               # Definiciones de tipos
    ├── auth.types.ts    # Tipos de autenticación
    ├── product.types.ts # Tipos de productos
    ├── api.types.ts     # Tipos de API
    └── index.ts         # Exportaciones
```

## 🚀 Flujo de Desarrollo

1. **Definir tipos** en `/types/`
2. **Crear servicios** en `/services/`
3. **Implementar hooks** en `/hooks/`
4. **Desarrollar componentes** en `/features/`
5. **Crear páginas** en `/pages/`
6. **Configurar rutas** en `/routes/`
7. **Escribir tests** para cada capa

## 📋 Convenciones de Código

### Nomenclatura
- **Archivos**: PascalCase para componentes (`ProductList.tsx`)
- **Carpetas**: camelCase (`productList/`)
- **Variables**: camelCase (`productData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Interfaces**: PascalCase con prefijo I (`IProduct`)
- **Types**: PascalCase (`ProductType`)

### Estructura de Componentes
```typescript
// 1. Imports externos
import React from 'react';
import { useState } from 'react';

// 2. Imports internos
import { useProducts } from '@/hooks';
import { Product } from '@/types';

// 3. Interfaces/Types locales
interface ProductListProps {
  filters?: ProductFilters;
}

// 4. Componente
export const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  // Estados
  const [loading, setLoading] = useState(false);
  
  // Hooks
  const { data, isLoading } = useProducts(filters);
  
  // Handlers
  const handleProductClick = (product: Product) => {
    // lógica
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ProductList;
```

### Testing
- **Unit Tests**: Para hooks y servicios
- **Component Tests**: Para componentes individuales
- **Integration Tests**: Para flujos completos
- **E2E Tests**: Para casos de uso críticos

## 🔒 Seguridad

- **Autenticación**: JWT tokens
- **Autorización**: Role-based access control
- **Validación**: Zod para validación de esquemas
- **Sanitización**: DOMPurify para contenido HTML
- **HTTPS**: Todas las comunicaciones encriptadas

## 🚀 Deployment

### Desarrollo
```bash
npm run dev
```

### Testing
```bash
npm run test
npm run test:coverage
```

### Build
```bash
npm run build
npm run preview
```

### Producción
- **Hosting**: Vercel/Netlify
- **CDN**: Para assets estáticos
- **Monitoring**: Error tracking y analytics

Esta arquitectura sigue principios de **Clean Architecture** y **Feature-Driven Development**, proporcionando una base sólida para el crecimiento del proyecto.
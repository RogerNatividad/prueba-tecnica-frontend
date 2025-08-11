# 📜 Historia de Usuario – Frontend

**Como** 👤 *usuario registrado*,  
**quiero** acceder a una **interfaz web intuitiva** donde pueda **iniciar sesión** y **gestionar** (➕ crear, 👀 visualizar, ✏️ actualizar y 🗑 eliminar) registros de la entidad definida,  
**para** administrar mi información de forma **rápida** ⚡ y **segura** 🔒.

---

## ✅ Criterios de aceptación (Frontend)

### 🔐 Inicio de sesión
- El usuario puede ingresar **email** y **contraseña** en un formulario.
- Si las credenciales son correctas ✅ → se redirige a la **pantalla principal**.
- Si son incorrectas ❌ → se muestra un **mensaje de error** claro.

---

### 📋 CRUD de la entidad
- 📄 **Listar** registros obtenidos desde la API en una tabla o lista.
- ➕ **Crear** un nuevo registro mediante un formulario.
- ✏️ **Editar** registros existentes y actualizar cambios.
- 🗑 **Eliminar** registros con confirmación antes de borrarlos.

---

### 🛡 Validaciones en la UI
- 🚫 No permitir campos vacíos en formularios.
- 💬 Mostrar mensajes claros de validación para guiar al usuario.

---

### 🌐 Consumo de API
- Todas las operaciones CRUD se realizan a través de **endpoints protegidos con JWT** 🔑.
- El **token** se almacena en `localStorage` para mantener la sesión activa.

---

### 🎨 Diseño y experiencia de usuario
- 📱 **Interfaz responsive** y amigable.
- 🔄 **Retroalimentación visual** (loading ⏳, éxito ✅, error ❌) en cada acción.

---

## 🗂 Diagrama de flujo (ASCII)

[👤 Usuario]
|
v
[Frontend React] -- (Formulario Login) --> [API Auth 🔑] --> [DB Usuarios 🗄]
|
+-- (CRUD Entidad) --> [API CRUD 📦] --> [DB Entidad 🗄]
|
+-- (Token JWT) --> [Protege Endpoints 🔒]
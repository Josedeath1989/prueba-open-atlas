### prueba-open-atlas
Esta es la prueba generada en el filtro de seleccion para la vacante de desarrollador fullstack para la empresa  OpenAtlas, 

# 💼 Task Management Pro

> **Plataforma Integral de Gestión de Tareas, Usuarios y Proyectos**

> ⚠️ **Trabajo de Autoría Original** — Desarrollado por *José Luis Sierra Ramírez* bajo responsabilidad personal para la prueba técnica solicitada.

---

## 👤 Información del Autor

| Campo | Valor |
|-------|-------|
| **Nombre** | José Luis Sierra Ramírez |
| **Teléfono/WhatsApp** | +57 314 349 4973 |
| **Email Principal** | josedeath1989@gmail.com |
| **Email Institucional** | jlsierrara@unadvirtual.edu.co |
| **Autoría** | 100% Responsabilidad Personal |

---

## 📜 Declaración de Autoría

Este proyecto ha sido **desarrollado íntegramente por mí, José Luis Sierra Ramírez**, con total conocimiento y autoridad sobre cada línea de código, decisión arquitectónica y componente implementado. Todo el trabajo ha sido realizado **a conciencia** para cumplir con los requisitos técnicos de la prueba solicitada.

> *"Declaro que soy el único responsable del diseño, desarrollo, implementación y funcionamiento de esta aplicación web. Cada componente, endpoint, función y stylesheet ha sido creado por mí siguiendo mejores prácticas de la industria."*

---

## 🎯 Descripción de la Solución

**Task Management Pro** es una plataforma profesional de gestión de tareas que integra una **API REST robusta** con un **interfaz web moderna y reactiva**. El sistema permite gestionar usuarios, proyectos, tareas y tarifas diferenciadas, proporcionando análisis, reportería y filtrados avanzados en tiempo real.

### Casos de Uso Principales

✅ Gestionar múltiples usuarios asignados a proyectos diversos  
✅ Establecer tarifas diferenciadas por usuario y proyecto  
✅ Registrar tareas con seguimiento de horas invertidas  
✅ Visualizar información con gráficas interactivas  
✅ Exportar datos en formato CSV para análisis externo  
✅ Cambiar tema visual (claro/oscuro) según preferencia  
✅ Acceder desde dispositivos móviles, tablets y desktop  

---

## 🏗️ Arquitectura y Tecnologías

### Backend: PHP Nativo + PDO

El backend ha sido construido **íntegramente en PHP nativo** sin dependencias externas (excepto la base de datos). Se utiliza **PDO (PHP Data Objects)** como modelo de acceso a datos, garantizando:

- ✅ **Seguridad**: Prepared Statements contra SQL Injection
- ✅ **Flexibilidad**: Compatible con múltiples gestores de BD
- ✅ **Performance**: Queries optimizadas sin ORMs pesados
- ✅ **Control Total**: Código legible y mantenible

**Patrón Implementado:** MVC (Model-View-Controller)

```
Backend (api/)
├── Controllers/ : Manejo de rutas y lógica de negocio
├── Models/      : Acceso a datos e queries PDO
├── Core/        : Enrutador REST personalizado
└── Config/      : Conexión PDO a MySQL
```

### Frontend: React Moderno

La interfaz ha sido construida con **React 18** utilizando las últimas tendencias en desarrollo web:

- ✅ **Componentes Funcionales**: Hooks (useState, useEffect, useMemo, useContext)
- ✅ **Context API**: Manejo de estado global (Tema oscuro/claro)
- ✅ **Vite**: Bundler ultrarrápido con HMR instantáneo
- ✅ **Recharts**: Gráficas interactivas basadas en SVG
- ✅ **lucide-react**: Iconografía moderna y consistente
- ✅ **CSS 3**: Variables, Grid, Flexbox, Media Queries

**Patrón Implementado:** Componentes Funcionales + Hooks + Context

```
Frontend (frontend/)
├── components/     : Componentes reutilizables (TaskList, Dashboard, Forms)
├── ThemeContext.jsx: Gestión de tema oscuro/claro
├── App.jsx         : Componente raíz con orquestación
└── styles.css      : Estilos globales responsive
```

### Base de Datos: MySQL 5.7+

Diseño relacional con 4 tablas, restricciones de integridad y datos iniciales.

```
users ←──┐
         ├──→ user_project_rates ←──→ projects
         │                           ↑
         └───────────────────→ tasks ─┘
```

---

## 🚀 Guía de Instalación

### Requisitos Previos

Verifica que tengas instalado:

```bash
# PHP 7.4 o superior
php -v

# MySQL 5.7 o superior
mysql -V

# Node.js 16+ con npm
node -v && npm -v
```

**Descargas:**
- [PHP](https://www.php.net/downloads)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- [Node.js LTS](https://nodejs.org/)

---

## 💻 Instalación Paso a Paso

### Paso 1: Descargar/Clonar el Proyecto

```bash
# Si es un repositorio Git
git clone <repository-url>
cd prueba

# O descargar el archivo ZIP y extraer
unzip prueba.zip
cd prueba
```

### Paso 2: Crear la Base de Datos

```bash
# Ejecutar el script SQL
mysql -u root < api/sql/schema.sql
```

**Nota:** Si MySQL tiene contraseña:
```bash
mysql -u root -p < api/sql/schema.sql
```

Verifica:
```bash
mysql -u root -e "SHOW DATABASES;" | grep gestion_proyectos
```

### Paso 3: Configurar la Conexión BD (Opcional)

Si tus credenciales MySQL son diferentes, edita:

```bash
nano api/config/database.xml
```

Contenido esperado:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<database>
    <host>localhost</host>
    <dbname>gestion_proyectos</dbname>
    <username>root</username>
    <password></password>
</database>
```

### Paso 4: Instalar Dependencias Frontend

```bash
cd frontend
npm install
```

Esto instala:
- React 18
- Vite 5
- Recharts 2.10
- lucide-react
- Y otros paquetes

### Paso 5: Iniciar los Servidores

Abre **2 terminales separadas**:

#### Terminal 1: API PHP

```bash
cd api
php -S localhost:8080
```

**Salida esperada:**
```
Listening on http://localhost:8080
```

#### Terminal 2: Frontend React

```bash
cd frontend
npm run dev
```

**Salida esperada:**
```
VITE v5.4.21 ready in 416 ms
Local: http://localhost:3000/
```

### Paso 6: Acceder a la Aplicación

Abre tu navegador en:

```
http://localhost:3000
```

✅ Deberías ver:
- Navbar con logo "💼 Task Management Pro"
- Sidebar con opciones
- Tabla de tareas cargada
- Sin errores en consola (F12 → Consola)  

---

## 📖 Guía de Uso

### Panel Principal

**1. Seleccionar Usuario**
```
Sidebar → Dropdown "👤 Usuario Activo"
Selecciona: Ana Pérez o Luis Gómez
```

**2. Visualizar Tareas**
```
Tab "📋 Tareas" → Se cargan automáticamente
Tabla muestra: ID, Descripción, Horas, Proyecto, Tarifa, Valor Total
```

**3. Filtrar y Buscar**
```
Filtros disponibles:
• 🔍 Búsqueda por descripción (tiempo real)
• 🔽 Filtro por proyecto
• 📏 Rango de horas (mín-máx)
• 📈 Ordenamiento múltiple
```

**4. Exportar Datos**
```
Botón "📥 Exportar CSV" → Descarga archivo
Formato: Excel, Google Sheets compatibles
```

**5. Ver Reportería**
```
Tab "📊 Reportería" → Gráficas en tiempo real
• 3 tarjetas de estadística
• Pie chart: distribución por proyecto
• Bar chart: horas vs valor
```

**6. Cambiar Tema**
```
Navbar → Botón 🌙 (esquina superior derecha)
Cambia entre tema claro y oscuro
(Se guarda automáticamente)
```

**7. Crear Nuevos Registros**
```
Sidebar → Botones:
• 👥 Nuevo Usuario
• ✅ Nueva Tarea
• 💰 Nueva Tarifa

Se abren modales con validación
```

---

## 🔌 API REST — Endpoints Disponibles

### Documentación de Endpoints

#### Tareas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **GET** | `/index.php?url=task/byUser/{userId}` | Obtener tareas de un usuario |
| **POST** | `/index.php?url=task/create` | Crear nueva tarea |

**Ejemplo GET:**
```bash
curl http://localhost:8080/index.php?url=task/byUser/1
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "description": "Diseño de arquitectura",
    "hours": "5.50",
    "project": "Proyecto Alpha",
    "rate": "35.00",
    "total_value": "192.5000"
  }
]
```

**Ejemplo POST:**
```bash
curl -X POST http://localhost:8080/index.php?url=task/create \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "project_id": 1,
    "description": "Implementar login",
    "hours": 8
  }'
```

#### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **GET** | `/index.php?url=user/list` | Listar todos los usuarios |
| **POST** | `/index.php?url=user/create` | Crear nuevo usuario |

#### Proyectos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **GET** | `/index.php?url=project/list` | Listar todos los proyectos |
| **POST** | `/index.php?url=project/create` | Crear nuevo proyecto |

#### Tarifas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **GET** | `/index.php?url=rate/list` | Listar todas las tarifas |
| **POST** | `/index.php?url=rate/create` | Crear/actualizar tarifa |

---

## 🔧 Troubleshooting — Solución de Problemas

### Problema: "Connection refused :8080"

**Causa:** PHP no está corriendo

**Solución:**
```bash
cd api
php -S localhost:8080
```

---

### Problema: "Cannot GET /"

**Causa:** Vite no está corriendo

**Solución:**
```bash
cd frontend
npm run dev
```

---

### Problema: "Base de datos no encontrada"

**Causa:** Script SQL no se ejecutó

**Solución:**
```bash
mysql -u root < api/sql/schema.sql

# Verificar
mysql -u root -e "USE gestion_proyectos; SHOW TABLES;"
```

---

### Problema: "módulo no encontrado" (npm error)

**Causa:** Dependencias no instaladas

**Solución:**
```bash
cd frontend
npm install
# Si persiste:
rm -rf node_modules package-lock.json
npm install
```

---

### Problema: Tabla vacía en frontend

**Causa:** API no está respondiendo

**Solución:**
```bash
# Verificar API
curl http://localhost:8080/index.php?url=task/byUser/1

# Si falla, reinicia PHP
cd api
php -S localhost:8080
```

---

### Problema: Puerto 3000 ya está en uso

**Solución:**
```bash
cd frontend
npm run dev -- --port 4000
```

---

## 📊 Base de Datos — Esquema

### Tablas

#### usuarios (users)
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### proyectos (projects)
```sql
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### tarifas_usuario_proyecto (user_project_rates)
```sql
CREATE TABLE user_project_rates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  project_id INT NOT NULL,
  rate DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY ux_user_project (user_id, project_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
```

#### tareas (tasks)
```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  project_id INT NOT NULL,
  description VARCHAR(500) NOT NULL,
  hours DECIMAL(6,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
```

---

## 📁 Estructura del Proyecto

```
prueba/
├── api/
│   ├── controllers/
│   │   ├── TaskController.php          # Lógica de tareas
│   │   ├── UserController.php          # Lógica de usuarios
│   │   ├── ProjectController.php       # Lógica de proyectos
│   │   └── RateController.php          # Lógica de tarifas
│   ├── models/
│   │   ├── Task.php
│   │   ├── User.php
│   │   ├── Project.php
│   │   └── Rate.php
│   ├── config/
│   │   ├── database.php                # Clase conexión PDO
│   │   └── database.xml                # Credenciales
│   ├── core/
│   │   └── Router.php                  # Enrutador REST
│   ├── sql/
│   │   └── schema.sql                  # Esquema + datos
│   └── index.php                       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UserForm.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── RateForm.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
└── 
```

---

## 🎨 Stack Técnico Detallado

| Componente | Tecnología | Versión | Propósito |
|-----------|-----------|---------|----------|
| **Backend** | PHP Nativo + PDO | 7.4+ | API REST sin frameworks |
| **Base de Datos** | MySQL | 5.7+ | Almacenamiento relacional |
| **Frontend** | React | 18.x | UI reactiva |
| **Build Tool** | Vite | 5.x | Bundling y dev server |
| **Gráficas** | Recharts | 2.10.0 | Visualización datos |
| **Iconos** | lucide-react | 0.263.1 | Librería de iconos |
| **Estilos** | CSS 3 | - | Diseño responsive |
| **HTTP Client** | Fetch API | - | Comunicación frontend-backend |
| **Package Manager** | npm | 8+ | Gestor de dependencias |

---

## 🔐 Seguridad Implementada

✅ **SQL Injection Prevention:** Prepared Statements (PDO)  
✅ **CORS Headers:** Configurados en index.php  
✅ **Input Validation:** Validación en formularios React  
✅ **Error Handling:** Try-catch en todos los controllers  
✅ **Type Safety:** Validación de tipos JavaScript  
✅ **Credenciales:** Separadas en database.xml (no en código)  

---

## 📈 Estadísticas del Proyecto

| Métrica | Cantidad |
|---------|----------|
| **Archivos PHP** | 8 |
| **Componentes React** | 6 |
| **Endpoints API** | 8 |
| **Tablas Database** | 4 |
| **Líneas CSS** | 1000+ |
| **Documentos** | 7 |

---

## 🚀 Mejoras Futuras (Roadmap)

- [ ] Autenticación con JWT
- [ ] Roles y permisos
- [ ] Editar/eliminar registros
- [ ] Paginación
- [ ] Tests (Jest, PHPUnit)
- [ ] CI/CD
- [ ] Deploy a producción

---

## 📞 Contacto

| Canal | Información |
|-------|-------------|
| **WhatsApp/Teléfono** | +57 314 349 4973 |
| **Email 1** | josedeath1989@gmail.com |
| **Email 2** | jlsierrara@unadvirtual.edu.co |

---

## 📄 Licencia

Este proyecto es **trabajo de autoría original** de José Luis Sierra Ramírez para fines de evaluación técnica.

**Prohibiciones:** No redistribuir, no reclamar como propio  
**Permisos:** Fork para aprendizaje, citar como referencia  

---

<div align="center">

## 💡 "Código limpio, documentación clara, resultados excepcionales."

**Desarrollado por:** José Luis Sierra Ramírez  
**Fecha Completación:** 20 de Febrero de 2026  
**Estado:** ✅ Completo y Funcional  

</div>

# 🏨 HotelTrack — Sistema de Gestión Hotelera

HotelTrack es una aplicación web para la gestión de un hotel. Permite administrar habitaciones, registrar huéspedes, controlar check-ins y check-outs, y gestionar los usuarios del sistema.

**Stack tecnológico:**

- **Frontend:** React 19 + Vite
- **Backend:** PHP (API REST)
- **Base de datos:** MySQL

---

## 📁 Estructura del Proyecto

```
hotelR/
├── backend/
│   ├── config/
│   │   └── db.php               # Conexión a la base de datos
│   ├── controllers/
│   │   ├── HabitacionesController.php
│   │   ├── HuespedController.php
│   │   ├── HuespedesActivosController.php
│   │   ├── checkOutController.php
│   │   ├── LoginController.php
│   │   └── UsuariosController.php
│   ├── helpers/
│   │   └── Respond.php          # Helper para respuestas JSON
│   └── index.php                # Punto de entrada (router)
├── src/
│   ├── pages/                   # Vistas de React
│   ├── components/              # Componentes reutilizables
│   └── styles/                  # Estilos CSS
├── index.html
├── vite.config.js
└── package.json
```

---

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar la base de datos en backend/config/db.php

# 3. Correr el proyecto
npm run dev                        # Frontend → http://localhost:5173
php -S localhost:8000 backend/     # Backend  → http://localhost:8000
```

---

## Endpoints

| Método | Ruta                | Descripción         |
| ------ | ------------------- | ------------------- |
| POST   | `/usuarios`         | Registrar usuario   |
| POST   | `/login`            | Iniciar sesión      |
| GET    | `/habitaciones`     | Listar habitaciones |
| POST   | `/habitaciones`     | Crear habitación    |
| PUT    | `/habitaciones`     | Editar habitación   |
| DELETE | `/habitaciones`     | Eliminar habitación |
| POST   | `/registroH`        | Registrar huésped   |
| GET    | `/huespedesActivos` | Listar huéspedes    |
| PUT    | `/checkOut?id={id}` | Hacer check-out     |

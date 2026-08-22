# Project Demos Suite (Odoo ERP MVP Demos) 🚀

Repositorio con demostraciones comerciales interactivas tipo Odoo ERP empaquetadas en Docker:

---

## 📁 Proyectos Incluidos

| Proyecto | Descripción | Puerto Docker | Directorio |
| :--- | :--- | :---: | :--- |
| 📦 **`demo_productos`** | MVP Catálogo Comercial B2B e Inventario de Productos & CRM Clientes estilo Odoo. | `3005:3000` | [`./demo_productos`](./demo_productos) |
| 🎫 **`demo_turnos`** | MVP Sistema de Gestión de Turnos, Filas, Consola de Ventanillas & TV Display en vivo. | `3006:3000` | [`./demo_turnos`](./demo_turnos) |

---

## 🐳 Despliegue Rápido con Docker Compose

Puedes levantar ambos proyectos simultáneamente usando el orquestador principal:

### 1. Levantar Ambos Servicios:
```bash
docker compose up --build -d
```

### 2. Acceder a las Aplicaciones:
- 📦 **Demo Productos:** 👉 **[http://localhost:3005](http://localhost:3005)**
- 🎫 **Demo Turnos:** 👉 **[http://localhost:3006](http://localhost:3006)**

---

### 3. Levantar Solo Un Proyecto Individual:

- **Para levantar solo Demo Productos (Puerto 3005):**
  ```bash
  docker compose up --build -d demo_productos
  ```
  *o ingresa a `./demo_productos` y ejecuta `docker compose up -d`.*

- **Para levantar solo Demo Turnos (Puerto 3006):**
  ```bash
  docker compose up --build -d demo_turnos
  ```
  *o ingresa a `./demo_turnos` y ejecuta `docker compose up -d`.*

---

## 🛑 Detener los Contenedores:

```bash
docker compose down
```

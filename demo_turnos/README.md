# Odoo ERP Queue & Turn Management MVP Demo 🎫

Un panel de administración y consola de llamado de turnos interactivo de alto impacto estético, desarrollado para demostraciones comerciales de gestión de filas, ventanillas y atención al cliente. Está inspirado visual y funcionalmente en el **ERP de Odoo**, construido sobre **Next.js (App Router)**, **Tailwind CSS**, **Lucide Icons** y empaquetado para despliegue inmediato con **Docker**.

---

## 🌟 Características Principales

- **Diseño Estilo Odoo ERP:**
  - Header morado Odoo (`#714B67`) con App Switcher, breadcrumbs de navegación, switcher de modo claro/oscuro e indicador de estado de base de datos.
  - **Odoo Control Panel:** Buscador inteligente **Omnibar** en tiempo real por código de turno (`ATC-001`), DNI o cliente, selector de categoría de servicio, selector de prioridades (*Urgente*, *Preferencial*, *Normal*) y alternador de vista dual **Kanban** vs **Lista**.
- **Consola de Operador & Kiosco de Emisión:**
  - **Modal Tótem / Kiosco:** Permite emitir nuevos turnos ingresando DNI y seleccionando el área de servicio (*Atención al Cliente*, *Caja*, *Soporte Técnico*, *Reclamos*, *Consultoría ERP*).
  - **Consola de Llamado a Ventanillas:** Los operadores pueden llamar al siguiente turno en fila o a un turno específico asignándolo a su ventanilla (Ventanilla 1 a 4).
- **Pantalla TV Display (Llamador en Vivo):**
  - Vista en pantalla completa tipo aeropuerto/banco para salas de espera, con animación en vivo, indicación gigante del turno y sonido acústico (*chime chime*) generado nativamente con Web Audio API.
- **Arquitectura de Datos Híbrida:**
  - **Modo Demo (LocalStorage):** Funciona al 100% desde el segundo 0 sin necesidad de base de datos externa. Precargado con 12 turnos Semilla en distintos estados.
  - **Conexión Supabase (PostgreSQL):** Opción de conectar con credenciales en la nube. Incluye modal interactivo con el script SQL listo para ejecutar.
- **Despliegue Aislado en Docker (Puerto 3006):**
  - `Dockerfile` multi-stage optimizado y `docker-compose.yml` listos para correr en puerto 3006 sin interferir con otros servicios.

---

## 🐳 Despliegue Rápido con Docker

### Requisitos Previos
- Tienes instalado **Docker** y **Docker Compose**.

### Pasos de Ejecución Local

1. **Navegar a la carpeta `demo_turnos`:**
   ```bash
   cd /home/gustavo/soft-tdf/project_demo/demo_turnos
   ```

2. **Levantar la aplicación con Docker Compose:**
   ```bash
   docker compose up --build -d
   ```

3. **Abrir en tu navegador:**
   👉 **[http://localhost:3006](http://localhost:3006)**

Para detener la aplicación:
```bash
docker compose down
```

---

## ⚡ Conexión a Supabase (Opcional)

1. En la aplicación web, haz clic en el botón **`Modo Mock (Local)`** o **`Ajustes`** en la barra superior.
2. Copia el script SQL provisto e ingrésalo en el SQL Editor de Supabase:

```sql
-- 1. Tabla de Turnos (Tickets)
CREATE TABLE IF NOT EXISTS public.tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_dni TEXT NOT NULL,
    service_category TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'normal',
    counter_id TEXT,
    counter_name TEXT,
    operator_name TEXT,
    status TEXT NOT NULL DEFAULT 'waiting',
    estimated_time_minutes INTEGER DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    called_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 2. Tabla de Ventanillas (Counters)
CREATE TABLE IF NOT EXISTS public.counters (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    operator_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    current_ticket_code TEXT
);

-- Habilitar RLS
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura anonima turnos" ON public.tickets FOR SELECT USING (true);
CREATE POLICY "Permitir escritura anonima turnos" ON public.tickets FOR ALL USING (true);
```

---

## 📁 Estructura del Proyecto

```text
demo_turnos/
├── Dockerfile                  # Multi-stage Docker build para Next.js
├── docker-compose.yml          # Mapeo de puertos (3006:3000)
├── next.config.mjs             # Standalone mode para Docker
├── package.json                # Dependencias (Next.js 14, React 18, Tailwind, Lucide)
├── tailwind.config.js          # Configuración de colores oficiales Odoo (#714B67)
├── src/
│   ├── app/
│   │   ├── globals.css         # Estilos globales y animación pulse-ring
│   │   ├── layout.tsx          # Root Layout con ThemeProvider y AuthProvider
│   │   └── page.tsx            # App principal de gestión de turnos
│   ├── components/
│   │   ├── layout/             # Header Odoo & Control Panel Omnibar
│   │   ├── turnos/             # TicketKanban, TicketList, Modales Kiosco, Llamada y TV
│   │   └── supabase/           # Modal de configuración SQL Supabase
│   ├── context/                # ThemeContext & AuthContext
│   ├── lib/                    # Supabase helper
│   ├── services/               # DataService unificado con datos semilla
│   └── types/                  # Definiciones TypeScript (Ticket, Counter, etc.)
└── README.md
```
